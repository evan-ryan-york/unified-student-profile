'use client';

import { Box, Typography, Button } from '@mui/material';
import { Calendar } from 'lucide-react';
import { SectionCard, EmptyState } from '@/components/shared';
import { MeetingCard } from './MeetingCard';
import { formatRelativeTime } from '@/lib/dateUtils';
import type { Meeting } from '@/types/student';

interface LastMeeting {
  date: string;
  conductedBy: string;
}

interface UpcomingMeetingsSectionProps {
  meetings: Meeting[];
  onMeetingClick?: (meeting: Meeting) => void;
  lastMeeting?: LastMeeting | null;
  onScheduleMeeting?: () => void;
}

export function UpcomingMeetingsSection({
  meetings,
  onMeetingClick,
  lastMeeting,
  onScheduleMeeting,
}: UpcomingMeetingsSectionProps) {
  const headerAction = (
    <Button
      variant="outlined"
      size="small"
      startIcon={<Calendar size={16} />}
      onClick={onScheduleMeeting}
      className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
      sx={{ textTransform: 'none' }}
    >
      Schedule meeting
    </Button>
  );

  const lastMeetingInfo = (
    <Box className="flex items-center gap-2 text-sm">
      <Typography component="span" className="text-neutral-500">
        Last meeting:
      </Typography>
      {lastMeeting ? (
        <>
          <Typography component="span" className="text-neutral-700">
            {formatRelativeTime(lastMeeting.date)}
          </Typography>
          <Typography component="span" className="text-neutral-500">
            with {lastMeeting.conductedBy}
          </Typography>
        </>
      ) : (
        <Typography component="span" className="text-neutral-400">
          None
        </Typography>
      )}
    </Box>
  );

  if (meetings.length === 0) {
    return (
      <SectionCard title="Upcoming meetings" action={headerAction}>
        <Box className="flex flex-col gap-4">
          {lastMeetingInfo}
          <Box className="py-4 text-center">
            <Typography className="text-sm text-neutral-500">
              No upcoming meetings scheduled
            </Typography>
          </Box>
        </Box>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Upcoming meetings" action={headerAction}>
      <Box className="flex flex-col gap-3">
        {lastMeetingInfo}
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            variant="upcoming"
            onClick={() => onMeetingClick?.(meeting)}
          />
        ))}
      </Box>
    </SectionCard>
  );
}

export default UpcomingMeetingsSection;
