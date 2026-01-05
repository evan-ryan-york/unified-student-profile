'use client';

import { Box } from '@mui/material';
import { ScheduleMeetingSection } from './ScheduleMeetingSection';
import { ActivityHistorySection } from './ActivityHistorySection';
import { NotesSection } from './NotesSection';
import type { ActivityItem } from '@/types/student';

interface MeetingsTabProps {
  activities: ActivityItem[];
}

export function MeetingsTab({ activities }: MeetingsTabProps) {
  const handleScheduleMeeting = () => {
    console.log('Schedule meeting clicked');
  };

  return (
    <Box>
      <Box sx={{ py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Schedule Meeting */}
        <ScheduleMeetingSection onScheduleMeeting={handleScheduleMeeting} />

        {/* Activity History */}
        <ActivityHistorySection activities={activities} />

        {/* Notes */}
        <NotesSection />
      </Box>
    </Box>
  );
}

export default MeetingsTab;
