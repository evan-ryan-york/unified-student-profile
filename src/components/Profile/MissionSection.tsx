'use client';

import { Typography } from '@mui/material';
import { SectionCard } from '@/components/shared';

interface MissionSectionProps {
  mission: string;
}

export function MissionSection({ mission }: MissionSectionProps) {
  return (
    <SectionCard title="Mission statement">
      {mission ? (
        <Typography className="text-neutral-600 italic leading-relaxed">
          &ldquo;{mission}&rdquo;
        </Typography>
      ) : (
        <Typography className="text-neutral-500 text-sm">
          No mission statement added yet.
        </Typography>
      )}
    </SectionCard>
  );
}

export default MissionSection;
