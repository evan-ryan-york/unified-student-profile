'use client';

import { Box, Typography } from '@mui/material';

interface StatusIndicatorProps {
  status: 'done' | 'not_done' | 'open' | 'completed';
  label?: string;
  progressLabel?: string;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  progressLabel,
  className = '',
}: StatusIndicatorProps) {
  const isDone = status === 'done' || status === 'completed';
  const dotColor = isDone ? '#22C55E' : '#EF4444';
  const textColor = isDone ? '#15803D' : '#B91C1C';
  const defaultLabel = isDone ? 'Done' : 'Not done';

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: dotColor,
        }}
      />
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: 500,
          color: textColor,
        }}
      >
        {label ?? defaultLabel}
        {progressLabel && !isDone && (
          <Box component="span" sx={{ color: '#6B7280', ml: 0.5 }}>
            ({progressLabel})
          </Box>
        )}
      </Typography>
    </Box>
  );
}

export default StatusIndicator;
