'use client';

import { Box, Typography, LinearProgress } from '@mui/material';
import { Sparkles, Pen } from 'lucide-react';
import type { Milestone } from '@/types/student';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick?: () => void;
}

function TypeBadge({ type }: { type: 'willow_generated' | 'custom' }) {
  const isWillow = type === 'willow_generated';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        color: isWillow ? '#039855' : '#D97706',
        fontSize: '12px',
      }}
    >
      {isWillow ? <Sparkles size={12} /> : <Pen size={12} />}
      <Typography sx={{ fontSize: '12px' }}>
        {isWillow ? 'Willow-generated' : 'Custom'}
      </Typography>
    </Box>
  );
}

function StatusIndicator({ status, progressLabel }: { status: string; progressLabel?: string }) {
  const isDone = status === 'done';
  const color = isDone ? '#22C55E' : '#EF4444';
  const label = isDone ? 'Done' : progressLabel ? `Not done (${progressLabel})` : 'Not done';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      <Typography
        sx={{
          fontSize: '12px',
          color: isDone ? '#15803D' : '#B91C1C',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function MilestoneCard({ milestone, onClick }: MilestoneCardProps) {
  const showProgress = milestone.status === 'not_done' && milestone.progress > 0;

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: 260,
        flexShrink: 0,
        scrollSnapAlign: 'start',
        '&:hover': {
          borderColor: '#D5D7DA',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        },
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 500,
          color: '#181D27',
          fontSize: '14px',
          lineHeight: 1.4,
        }}
      >
        {milestone.title}
      </Typography>

      {/* Badge and Status row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TypeBadge type={milestone.type} />
        <StatusIndicator status={milestone.status} progressLabel={milestone.progressLabel} />
      </Box>

      {/* Progress bar if in progress */}
      {showProgress && (
        <LinearProgress
          variant="determinate"
          value={milestone.progress}
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#22C55E',
              borderRadius: 2,
            },
          }}
        />
      )}
    </Box>
  );
}

export default MilestoneCard;
