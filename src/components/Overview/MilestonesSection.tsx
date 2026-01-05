'use client';

import { Box, Typography, LinearProgress } from '@mui/material';
import { MilestoneCard } from './MilestoneCard';
import { EmptyState } from '@/components/shared';
import { getMilestoneCompletionRate } from '@/lib/onTrackCalculation';
import type { Milestone } from '@/types/student';

interface MilestonesSectionProps {
  milestones: Milestone[];
  onMilestoneClick?: (milestone: Milestone) => void;
}

export function MilestonesSection({ milestones, onMilestoneClick }: MilestonesSectionProps) {
  const { completed, total, percentage } = getMilestoneCompletionRate(milestones);

  if (milestones.length === 0) {
    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#181D27',
            }}
          >
            Milestones
          </Typography>
        </Box>
        <EmptyState type="no_milestones" />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with title and progress */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#181D27',
          }}
        >
          Milestones
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#535862',
            }}
          >
            {completed}/{total}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              width: 80,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#E5E7EB',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#22C55E',
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </Box>

      {/* Milestone grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
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
    </Box>
  );
}

export default MilestonesSection;
