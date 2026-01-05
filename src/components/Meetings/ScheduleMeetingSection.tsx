'use client';

import { Box, Typography, Button } from '@mui/material';
import { Calendar } from 'lucide-react';
import { SectionCard } from '@/components/shared';

interface ScheduleMeetingSectionProps {
  onScheduleMeeting?: () => void;
}

export function ScheduleMeetingSection({ onScheduleMeeting }: ScheduleMeetingSectionProps) {
  return (
    <SectionCard title="Schedule meeting">
      <Box className="flex items-center justify-between">
        <Typography className="text-neutral-500 text-sm">
          Schedule a meeting with this student to discuss their progress and goals.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Calendar size={18} />}
          onClick={onScheduleMeeting}
          className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
          sx={{ textTransform: 'none' }}
        >
          Schedule meeting
        </Button>
      </Box>
    </SectionCard>
  );
}

export default ScheduleMeetingSection;
