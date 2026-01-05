'use client';

import { Box, Skeleton } from '@mui/material';

interface LoadingSectionProps {
  variant?: 'card' | 'list' | 'grid' | 'table' | 'text';
  rows?: number;
  className?: string;
}

export function LoadingSection({
  variant = 'card',
  rows = 3,
  className = '',
}: LoadingSectionProps) {
  if (variant === 'card') {
    return (
      <Box className={`bg-white rounded-xl border border-neutral-200 p-6 ${className}`}>
        <Skeleton variant="text" width="40%" height={28} className="mb-4" />
        <Skeleton variant="rectangular" height={100} className="rounded-lg mb-4" />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  }

  if (variant === 'list') {
    return (
      <Box className={`space-y-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <Box key={i} className="flex items-center gap-3">
            <Skeleton variant="circular" width={24} height={24} />
            <Box className="flex-1">
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="40%" height={16} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'grid') {
    return (
      <Box className={`grid grid-cols-2 gap-4 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <Box key={i} className="bg-white rounded-xl border border-neutral-200 p-4">
            <Skeleton variant="text" width="60%" height={20} className="mb-2" />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'table') {
    return (
      <Box className={`space-y-2 ${className}`}>
        <Skeleton variant="rectangular" height={40} className="rounded-lg" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={48} className="rounded-lg" />
        ))}
      </Box>
    );
  }

  // text variant
  return (
    <Box className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === rows - 1 ? '60%' : '100%'}
          height={20}
        />
      ))}
    </Box>
  );
}

export default LoadingSection;
