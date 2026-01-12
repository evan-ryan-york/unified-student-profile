# Implementation Plan: Product Meeting Feedback (Jan 7, 2025)

## Summary

This plan addresses 5 changes from the product meeting. Items 4, 6, and 8 from the original list are being skipped per discussion.

| # | Change | Complexity | Files Affected |
|---|--------|------------|----------------|
| 1 | Milestones horizontal scroll | Medium | 2 files |
| 2 | Remove duplicate GPA from Profile | Low | 1 file |
| 3 | Alma greeting personalization | Low | 1 file |
| 5 | Simplify meeting scheduling flow | High | 4+ files |
| 7 | Remove readiness scores | Low | 1 file |

---

## 1. Milestones Section - Horizontal Scroll

**Goal:** Replace the 2-3 column grid with a single horizontal scrolling row to reduce vertical space.

### Files to Modify

**`src/components/Overview/MilestonesSection.tsx`**
- Replace the grid layout (`display: 'grid'`, `gridTemplateColumns`) with a horizontal scroll container
- Add `display: 'flex'`, `overflowX: 'auto'`, `gap: 2`
- Add scroll snap for better UX: `scrollSnapType: 'x mandatory'`
- Style scrollbar for desktop visibility

**`src/components/Overview/MilestoneCard.tsx`**
- Add `flex-shrink: 0` to prevent cards from compressing
- Set a fixed or min-width (e.g., `minWidth: 280px`) to ensure consistent card sizing

### Implementation Details

```tsx
// MilestonesSection.tsx - Replace grid with horizontal scroll
<Box
  sx={{
    display: 'flex',
    overflowX: 'auto',
    gap: 2,
    pb: 1, // padding for scrollbar
    scrollSnapType: 'x mandatory',
    '&::-webkit-scrollbar': {
      height: 6,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#F3F4F6',
      borderRadius: 3,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D1D5DB',
      borderRadius: 3,
    },
  }}
>
  {milestones.map((milestone) => (
    <MilestoneCard
      key={milestone.id}
      milestone={milestone}
      onClick={() => onMilestoneClick?.(milestone)}
    />
  ))}
</Box>
```

---

## 2. Remove Duplicate GPA from Profile Tab

**Goal:** Remove GPA display from Academic Achievements section since it already appears in the header.

### Files to Modify

**`src/components/Profile/AcademicAchievementsSection.tsx`**
- Remove the GPA `StatCard` (lines 134-138)
- Change grid from 4 columns to 3 columns (`repeat(3, 1fr)`)
- Keep ACT, SAT, and Class Rank

### Implementation Details

```tsx
// Before: 4 stat cards
<Box sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
  <StatCard label="GPA" ... />  // REMOVE
  <StatCard label="ACT" ... />
  <StatCard label="SAT" ... />
  <StatCard label="Class Rank" ... />
</Box>

// After: 3 stat cards
<Box sx={{ gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' } }}>
  <StatCard label="ACT" ... />
  <StatCard label="SAT" ... />
  <StatCard label="Class Rank" ... />
</Box>
```

---

## 3. Alma AI Greeting Personalization

**Goal:** Change greeting from addressing the student to addressing the counselor about the student.

### Files to Modify

**`src/components/AlmaChatPanel/AlmaChatPanel.tsx`**
- Update the welcome message (line 430)
- Hardcode counselor name as "Sarah" for this prototype

### Implementation Details

```tsx
// Before (line 430):
Hi {studentFirstName}! How can I help you today?

// After:
Hey Sarah, how can I help you support {studentFirstName} today?
```

---

## 4. Simplify Meeting Scheduling Flow (2 Steps)

**Goal:** Reduce from 4 steps to 2 steps by merging Topics + Agenda and removing Confirm.

### Current Flow (4 steps)
1. Date & Duration
2. Select Topics
3. Review Agenda
4. Confirm

### New Flow (2 steps)
1. **Date & Duration** - unchanged
2. **Topics & Agenda** - combined view with inline agenda editing, plus "Schedule Meeting" button

### Files to Modify

**`src/components/ScheduleMeetingFlow/ScheduleMeetingPage.tsx`**
- Update `STEPS` array: `['duration', 'topics-agenda']`
- Update `STEP_TITLES` and `STEP_DESCRIPTIONS`
- Remove 'agenda' and 'confirm' step handling
- Add direct "Schedule Meeting" button on step 2
- When on step 2, call `handleSchedule` instead of `handleNext`

**`src/components/ScheduleMeetingFlow/StepTopicsAgenda.tsx`** (NEW FILE)
- Combine functionality from `StepTopics.tsx` and `StepAgenda.tsx`
- Two-column layout:
  - Left: Topic selection with checkboxes + custom topic input
  - Right: Live agenda preview that updates as topics are selected
- Allow inline editing of agenda items (duration, reorder)
- Meeting title input at top
- "Schedule Meeting" primary button replaces "Next"

### UI Layout for Combined Step

```
+--------------------------------------------------+
| Meeting Title: [________________________]        |
+--------------------------------------------------+
|                    |                             |
| RECOMMENDED TOPICS |  YOUR AGENDA                |
| ☑ Topic 1         |  1. Topic 1 (10 min) [edit] |
| ☑ Topic 2         |  2. Topic 2 (10 min) [edit] |
| ☐ Topic 3         |  3. Wrap-up (5 min)  [edit] |
| ☐ Topic 4         |                             |
|                    |  Total: 25 min              |
| + Add custom topic |                             |
|                    |                             |
+--------------------------------------------------+
|        [Back]              [Schedule Meeting]    |
+--------------------------------------------------+
```

### Files Affected

| File | Action |
|------|--------|
| `src/components/ScheduleMeetingFlow/ScheduleMeetingPage.tsx` | Modify - update steps array and flow logic |
| `src/components/ScheduleMeetingFlow/StepTopicsAgenda.tsx` | Create - new combined component |
| `src/components/ScheduleMeetingFlow/StepTopics.tsx` | Keep (code reused in new component) |
| `src/components/ScheduleMeetingFlow/StepAgenda.tsx` | Keep (code reused in new component) |
| `src/components/ScheduleMeetingFlow/StepConfirm.tsx` | Keep (no longer used but can remain) |

---

## 5. Remove Readiness Scores

**Goal:** Remove the readiness score feature entirely from the UI.

### Files to Modify

**`src/components/StudentHeader/StudentHeader.tsx`**
- Remove readiness score display (lines 205-209)
- Remove the preceding dot separator
- Keep GPA, SAT, ACT, and Class Rank in the stats row

### Implementation Details

Remove these lines (203-209):
```tsx
<Typography sx={{ fontSize: '14px', color: '#D5D7DA' }}>·</Typography>

<Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#181D27' }}>
  {student.readinessScore}%
</Typography>
<Typography sx={{ fontSize: '14px', color: '#717680' }}>Readiness score</Typography>
<Info size={14} style={{ color: '#A4A7AE', cursor: 'help' }} />
```

**Note:** The "On track / Off track" pill remains (it's separate from readiness score and based on different logic in `onTrackCalculation.ts`).

---

## Implementation Order

Recommended order based on dependencies and complexity:

1. **Remove readiness scores** (~5 min) - Quick win, no dependencies
2. **Remove duplicate GPA** (~5 min) - Quick win, no dependencies
3. **Alma greeting change** (~5 min) - Quick win, no dependencies
4. **Milestones horizontal scroll** (~30 min) - Medium complexity, isolated change
5. **Meeting scheduling simplification** (~1-2 hrs) - Most complex, create new combined component

---

## Testing Checklist

After implementation, verify:

- [ ] Milestones scroll horizontally on Overview tab
- [ ] Milestones scroll works on mobile/touch
- [ ] All milestone cards visible when scrolling
- [ ] GPA no longer appears in Profile > Academic Achievements
- [ ] GPA still appears in header stats row
- [ ] Alma greeting says "Hey Sarah, how can I help you support [Name] today?"
- [ ] Meeting scheduling has only 2 steps
- [ ] Topics and agenda are visible together in step 2
- [ ] Meeting can be scheduled directly from step 2
- [ ] Readiness score no longer appears in header
- [ ] On track/Off track pill still displays correctly
- [ ] All 5 mock students render correctly with changes

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/Overview/MilestonesSection.tsx` | Modify |
| `src/components/Overview/MilestoneCard.tsx` | Modify |
| `src/components/Profile/AcademicAchievementsSection.tsx` | Modify |
| `src/components/AlmaChatPanel/AlmaChatPanel.tsx` | Modify |
| `src/components/StudentHeader/StudentHeader.tsx` | Modify |
| `src/components/ScheduleMeetingFlow/ScheduleMeetingPage.tsx` | Modify |
| `src/components/ScheduleMeetingFlow/StepTopicsAgenda.tsx` | Create |
