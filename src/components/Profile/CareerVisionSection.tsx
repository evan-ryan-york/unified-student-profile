'use client';

import { Typography } from '@mui/material';
import { SectionCard } from '@/components/shared';

interface CareerVisionSectionProps {
  careerVision: string;
}

export function CareerVisionSection({ careerVision }: CareerVisionSectionProps) {
  return (
    <SectionCard title="Career vision">
      {careerVision ? (
        <Typography className="text-neutral-600 italic leading-relaxed">
          &ldquo;{careerVision}&rdquo;
        </Typography>
      ) : (
        <Typography className="text-neutral-500 text-sm">
          No career vision statement added yet.
        </Typography>
      )}
    </SectionCard>
  );
}

export default CareerVisionSection;
