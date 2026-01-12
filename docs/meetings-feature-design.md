# Meetings Feature Design

## Overview

A comprehensive meeting workflow that enables counselors to:
1. Schedule meetings with AI-recommended agenda topics
2. View/edit meeting agendas
3. Record and transcribe meetings
4. Generate summaries and action items

---

## Data Models

### Meeting (replaces simple UpcomingMeeting)

```typescript
interface Meeting {
  id: string;
  studentId: string;
  counselorId: string;
  counselorName: string;

  // Scheduling
  scheduledDate: string;
  duration: number; // minutes (15, 30, 45, 60)
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

  // Agenda
  agenda: AgendaItem[];

  // Recording & Transcript (post-meeting)
  recordingUrl?: string;
  transcript?: string;

  // AI-generated content
  summary?: MeetingSummary;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

interface AgendaItem {
  id: string;
  topic: string;
  description?: string;
  source: 'ai_recommended' | 'counselor_added';
  sourceReason?: string; // "Based on upcoming FAFSA deadline"
  sourceReference?: {
    type: 'milestone' | 'task' | 'reflection' | 'bookmark' | 'grade_level';
    id?: string;
  };
  duration?: number; // estimated minutes
  covered: boolean; // marked during/after meeting
  notes?: string; // counselor notes for this item
}

interface MeetingSummary {
  overview: string; // 2-3 sentence summary
  keyPoints: string[]; // bullet points
  studentSentiment?: 'positive' | 'neutral' | 'concerned';
  recommendedActions: RecommendedAction[];
  generatedAt: string;
}

interface RecommendedAction {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'converted_to_task' | 'dismissed';
  convertedTaskId?: string;
}
```

### Topic Recommendation (for scheduling flow)

```typescript
interface TopicRecommendation {
  id: string;
  topic: string;
  category: 'grade_level' | 'milestone' | 'deadline' | 'reflection' | 'bookmark' | 'goal' | 'follow_up';
  reason: string;
  priority: 'high' | 'medium' | 'low';
  sourceReference?: {
    type: string;
    id: string;
    title: string;
  };
}
```

---

## Page Structure

### New Routes

```
/students/[studentId]/meetings/[meetingId]  → Meeting detail page
```

### Updated Components

```
MeetingsTab/
├── MeetingsTab.tsx                    # Main container
├── MeetingStatusSection.tsx           # Last/next meeting + schedule button (renamed from ScheduleMeetingSection)
├── UpcomingMeetingsSection.tsx        # NEW: List of scheduled meetings
├── PastMeetingsSection.tsx            # NEW: List of completed meetings with summaries
├── ActivityHistorySection.tsx         # Keep for notes, snapshots, milestone completions (not meetings)
├── NotesSection.tsx                   # Keep as-is
└── index.ts

MeetingDetail/                         # NEW: Full page component
├── MeetingDetailPage.tsx              # Main page layout
├── MeetingHeader.tsx                  # Date, time, status, counselor
├── AgendaSection.tsx                  # Editable agenda list
├── AgendaItemCard.tsx                 # Individual agenda item
├── TranscriptSection.tsx              # Full transcript view
├── SummarySection.tsx                 # AI summary + key points
├── RecommendedActionsSection.tsx      # Actions from this meeting
└── index.ts

ScheduleMeetingFlow/                   # NEW: Right panel wizard
├── ScheduleMeetingPanel.tsx           # Container that replaces AlmaChatPanel
├── StepDuration.tsx                   # Step 1: Select duration
├── StepTopics.tsx                     # Step 2: Review/select recommended topics
├── StepAgenda.tsx                     # Step 3: Review/edit generated agenda
├── StepConfirm.tsx                    # Step 4: Confirm & schedule
├── TopicRecommendationCard.tsx        # Individual topic recommendation
└── index.ts

MeetingRecorder/                       # NEW: Recording UI (shown during meeting)
├── RecordingControls.tsx              # Start/stop/pause recording
├── LiveTranscriptView.tsx             # Real-time transcript display
└── index.ts
```

---

## UX Flows

### Flow 1: Schedule Meeting

```
┌─────────────────────────────────────────────────────────────────────┐
│  TRIGGER: Click "Schedule meeting" button                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  RIGHT PANEL: ScheduleMeetingPanel replaces AlmaChatPanel           │
│                                                                     │
│  Step 1: Duration & Time                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  How long will this meeting be?                              │   │
│  │                                                              │   │
│  │  [15 min] [30 min] [45 min] [60 min]                        │   │
│  │                                                              │   │
│  │  Date: [Jan 15, 2025    ▼]                                  │   │
│  │  Time: [10:00 AM        ▼]                                  │   │
│  │                                                              │   │
│  │                                    [Cancel] [Next →]         │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Step 2: Topics                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Recommended topics for Jessica                              │   │
│  │                                                              │   │
│  │  ⚡ HIGH PRIORITY                                            │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ☑ FAFSA Completion                                  │    │   │
│  │  │   Deadline in 9 days • Based on milestone progress  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  📋 SUGGESTED                                                │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ☑ College Application Status                        │    │   │
│  │  │   3 applications pending • Based on goals           │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ☐ Healthcare Shadowing Experience                   │    │   │
│  │  │   From AI reflection on Dec 15 • Career interest    │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  [+ Add custom topic]                                       │   │
│  │                                                              │   │
│  │                                    [← Back] [Next →]         │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Step 3: Review Agenda                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Generated Agenda                            [✨ Regenerate] │   │
│  │                                                              │   │
│  │  1. FAFSA Completion (10 min)                    [Edit] [✕] │   │
│  │     Review remaining steps, discuss blockers                │   │
│  │                                                              │   │
│  │  2. College Application Status (15 min)          [Edit] [✕] │   │
│  │     Check progress on Texas A&M, Baylor, UH apps            │   │
│  │                                                              │   │
│  │  3. Wrap-up & Next Steps (5 min)                 [Edit] [✕] │   │
│  │     Summarize action items, set follow-up                   │   │
│  │                                                              │   │
│  │  [+ Add agenda item]                                        │   │
│  │                                                              │   │
│  │                                    [← Back] [Schedule →]     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Meeting scheduled! Returns to AlmaChatPanel with confirmation      │
└─────────────────────────────────────────────────────────────────────┘
```

### Flow 2: Meeting Detail Page

```
┌─────────────────────────────────────────────────────────────────────┐
│  /students/jessica-santiago/meetings/meeting-123                    │
│                                                                     │
│  ← Back to Jessica Santiago                                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  FAFSA Review Meeting                                        │   │
│  │  Jan 15, 2025 • 10:00 AM • 30 min • with Mr. Rodriguez      │   │
│  │                                                              │   │
│  │  Status: [● Completed]            [Edit Meeting] [Delete]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  📋 Agenda                                          [Edit]   │   │
│  │                                                              │   │
│  │  ✓ 1. FAFSA Completion (10 min)                             │   │
│  │      Review remaining steps, discuss blockers               │   │
│  │      Notes: Completed parent info, needs tax docs           │   │
│  │                                                              │   │
│  │  ✓ 2. College Application Status (15 min)                   │   │
│  │      Check progress on Texas A&M, Baylor, UH apps           │   │
│  │      Notes: Texas A&M submitted, others in progress         │   │
│  │                                                              │   │
│  │  ✓ 3. Wrap-up & Next Steps (5 min)                          │   │
│  │      Summarize action items, set follow-up                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ✨ AI Summary                              [Regenerate]     │   │
│  │                                                              │   │
│  │  Jessica made good progress on her FAFSA application and    │   │
│  │  submitted her Texas A&M application. She's feeling         │   │
│  │  confident about her timeline but needs to gather tax       │   │
│  │  documents for FAFSA completion.                            │   │
│  │                                                              │   │
│  │  Key Points:                                                 │   │
│  │  • FAFSA 2/3 complete, needs tax documents                  │   │
│  │  • Texas A&M application submitted                          │   │
│  │  • Baylor and UH applications in progress                   │   │
│  │  • Plans to finish all apps by Jan 20                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  📝 Recommended Actions                                      │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ● Gather tax documents for FAFSA        [Add to Tasks]│    │   │
│  │  │   High priority • Due: Jan 12                        │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ● Complete Baylor application           [Add to Tasks]│    │   │
│  │  │   Medium priority • Due: Jan 18                      │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ✓ Added: Schedule parent meeting for FAFSA          │    │   │
│  │  │   Converted to task                                  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🎙️ Transcript                              [Expand/Collapse]│   │
│  │                                                              │   │
│  │  [00:00] Mr. Rodriguez: Hi Jessica, thanks for coming...    │   │
│  │  [00:15] Jessica: Hi! I'm excited to talk about FAFSA...    │   │
│  │  [00:32] Mr. Rodriguez: Great, let's start with where...    │   │
│  │  ...                                                         │   │
│  │                                    [View Full Transcript]    │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Flow 3: During Meeting (Recording)

```
┌─────────────────────────────────────────────────────────────────────┐
│  When meeting time arrives, show recording controls in:             │
│  - Meeting detail page header                                       │
│  - Or floating widget on main student view                          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔴 Recording in progress • 12:34                           │   │
│  │                                                              │   │
│  │  [⏸ Pause]  [⏹ End Meeting]                                 │   │
│  │                                                              │   │
│  │  Live transcript:                                            │   │
│  │  "...and I think the Baylor application is almost done..."  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  After clicking "End Meeting":                                      │
│  - Processing transcript...                                         │
│  - Generating summary...                                            │
│  - Extracting action items...                                       │
│  - Meeting completed! [View Summary]                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Meetings Tab Layout (Updated)

```
┌─────────────────────────────────────────────────────────────────────┐
│  MEETINGS TAB                                                       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Meetings                                                    │   │
│  │                                                              │   │
│  │  Last Meeting              Next Meeting                      │   │
│  │  1 week ago                Jan 15, 2025 at 10:00 AM         │   │
│  │  with Mr. Rodriguez        FAFSA Review                      │   │
│  │                                                              │   │
│  │  ─────────────────────────────────────────────────────────  │   │
│  │  Schedule a meeting...                    [Schedule meeting] │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Upcoming Meetings                                           │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ 📅 FAFSA Review                                      │    │   │
│  │  │    Jan 15, 2025 • 10:00 AM • 30 min                 │    │   │
│  │  │    with Mr. Rodriguez                          [→]  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Past Meetings                                               │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ✓ College Planning Check-in                         │    │   │
│  │  │   Dec 28, 2024 • 32 min • with Mr. Rodriguez       │    │   │
│  │  │   "Reviewed application progress, discussed..."     │    │   │
│  │  │   3 action items generated                     [→]  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ ✓ Senior Year Kickoff Meeting                       │    │   │
│  │  │   Sep 5, 2024 • 45 min • with Mr. Rodriguez        │    │   │
│  │  │   "Reviewed senior year goals, college list..."     │    │   │
│  │  │   5 action items generated                     [→]  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │                                    [View all past meetings]  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Activity & History (non-meeting items)                      │   │
│  │  ...notes, snapshots, milestone completions...               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ▸ Notes                                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Topic Recommendation Logic

The system generates recommended topics based on:

| Source | Priority | Example Topic |
|--------|----------|---------------|
| Overdue milestones | High | "FAFSA deadline passed 3 days ago" |
| Upcoming deadlines (< 14 days) | High | "College app deadline in 5 days" |
| Off-track status | High | "GPA dropped below 2.5" |
| Incomplete tasks | Medium | "3 open tasks need attention" |
| Recent AI reflections | Medium | "Follow up on career interest from Dec 15 reflection" |
| Bookmarked items without progress | Medium | "Discuss bookmarked Nurse Practitioner career" |
| Active goals | Medium | "Review progress on SAT improvement goal" |
| Grade-level checklist | Low | "Senior year: scholarship applications" |
| Previous meeting follow-ups | Low | "Check on job shadowing from last meeting" |

---

## Implementation Phases

### Phase 1: Data Foundation
- Update `Meeting` type to full schema
- Migrate `UpcomingMeeting` → `Meeting[]`
- Update mock data with sample meetings (past + upcoming)
- Update `StudentData` interface

### Phase 2: Meetings Tab Restructure
- Create `UpcomingMeetingsSection`
- Create `PastMeetingsSection`
- Update `ActivityHistorySection` to filter out meetings
- Create meeting card components

### Phase 3: Meeting Detail Page
- Create `/students/[studentId]/meetings/[meetingId]` route
- Build `MeetingDetailPage` layout
- Build `AgendaSection` (view mode)
- Build `SummarySection`
- Build `TranscriptSection`

### Phase 4: Schedule Meeting Flow
- Create `ScheduleMeetingPanel` (right panel)
- Build step components (duration, topics, agenda, confirm)
- Implement topic recommendation logic
- Integrate with `AppLayout` to swap panels

### Phase 5: Agenda Editing
- Add inline editing to `AgendaSection`
- Add AI regeneration for agenda
- Add "Edit with AI" feature

### Phase 6: Recording & Transcription
- Build `RecordingControls` component
- Integrate transcription service (mock for prototype)
- Build `LiveTranscriptView`
- Post-meeting processing flow

### Phase 7: Summary & Actions
- AI summary generation (mock for prototype)
- Action item extraction
- Integration with Tasks panel
- Activity history integration

---

## Open Questions

1. **Recording service**: For prototype, should we mock the transcript or integrate a real service like Otter/Deepgram?

2. **AI features**: Should agenda generation and summary use real AI calls or be fully mocked?

3. **Calendar integration**: Should "Schedule meeting" integrate with external calendars (Google/Outlook) or be internal only?

4. **Multi-counselor**: Can meetings be conducted by different counselors, or is it always the assigned counselor?

5. **Student visibility**: Does the student see any of this (meeting agenda, summary) in their own view?
