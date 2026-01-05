'use client';

import { Typography } from '@mui/material';
import { SectionCard } from '@/components/shared';

interface ValuesSectionProps {
  values: string;
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <SectionCard title="Values">
      {values ? (
        <Typography className="text-neutral-600 italic leading-relaxed">
          &ldquo;{values}&rdquo;
        </Typography>
      ) : (
        <Typography className="text-neutral-500 text-sm">
          No values statement added yet.
        </Typography>
      )}
    </SectionCard>
  );
}

export default ValuesSection;
