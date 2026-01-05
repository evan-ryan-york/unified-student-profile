'use client';

import { Box, Typography, Button } from '@mui/material';
import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react';
import type { ErrorStateType } from '@/types/student';
import type { ReactNode } from 'react';

interface ErrorStateConfig {
  icon: ReactNode;
  message: string;
}

const errorStateConfigs: Record<ErrorStateType, ErrorStateConfig> = {
  load_failed: {
    icon: <AlertTriangle size={40} className="text-red-400" />,
    message: 'Unable to load student information. Please try again.',
  },
  snapshot_failed: {
    icon: <AlertTriangle size={40} className="text-amber-400" />,
    message: "Couldn't generate snapshot right now. Try again in a moment.",
  },
  network_timeout: {
    icon: <Wifi size={40} className="text-red-400" />,
    message: 'Connection timed out. Please check your connection.',
  },
};

interface ErrorStateProps {
  type: ErrorStateType;
  onRetry: () => void;
  message?: string;
  className?: string;
}

export function ErrorState({ type, onRetry, message, className = '' }: ErrorStateProps) {
  const config = errorStateConfigs[type];

  return (
    <Box
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <Box className="mb-4">{config.icon}</Box>
      <Typography className="text-neutral-600 text-sm mb-4 max-w-xs">
        {message || config.message}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={onRetry}
        startIcon={<RefreshCw size={16} />}
        className="text-sm"
      >
        Try again
      </Button>
    </Box>
  );
}

export default ErrorState;
