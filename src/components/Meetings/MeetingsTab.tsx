'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { UpcomingMeetingsSection } from './UpcomingMeetingsSection';
import { PastMeetingsSection } from './PastMeetingsSection';
import { ActivityHistorySection } from './ActivityHistorySection';
import type { ActivityItem, Meeting } from '@/types/student';

interface MeetingsTabProps {
  activities: ActivityItem[];
  meetings: Meeting[];
  studentId: string;
}

export function MeetingsTab({ activities, meetings, studentId }: MeetingsTabProps) {
  const router = useRouter();

  const handleScheduleMeeting = () => {
    router.push(`/students/${studentId}/meetings/schedule`);
  };

  // Separate meetings by status
  const { upcomingMeetings, pastMeetings } = useMemo(() => {
    const upcoming = meetings.filter((m) => m.status === 'scheduled' || m.status === 'in_progress');
    const past = meetings.filter((m) => m.status === 'completed');
    return {
      upcomingMeetings: upcoming.sort(
        (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
      ),
      pastMeetings: past.sort(
        (a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
      ),
    };
  }, [meetings]);

  // Get last completed meeting
  const lastMeeting = useMemo(() => {
    if (pastMeetings.length === 0) return null;
    const mostRecent = pastMeetings[0];
    return {
      date: mostRecent.scheduledDate,
      conductedBy: mostRecent.counselorName,
    };
  }, [pastMeetings]);

  const handleMeetingClick = (meeting: Meeting) => {
    // Navigate to meeting detail page
    router.push(`/students/${meeting.studentId}/meetings/${meeting.id}`);
  };

  return (
    <Box>
      <Box sx={{ py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Upcoming Meetings */}
        <UpcomingMeetingsSection
          meetings={upcomingMeetings}
          onMeetingClick={handleMeetingClick}
          lastMeeting={lastMeeting}
          onScheduleMeeting={handleScheduleMeeting}
        />

        {/* Past Meetings */}
        <PastMeetingsSection
          meetings={pastMeetings}
          onMeetingClick={handleMeetingClick}
        />

        {/* Activity History (non-meeting items) */}
        <ActivityHistorySection activities={activities} />
      </Box>
    </Box>
  );
}

export default MeetingsTab;
