'use client';

import { Box, Typography } from '@mui/material';
import { Sparkles } from 'lucide-react';
import { SectionCard } from '@/components/shared';
import type { DurableSkillsResult } from '@/types/student';

interface DurableSkillsSectionProps {
  durableSkills: DurableSkillsResult;
}

export function DurableSkillsSection({ durableSkills }: DurableSkillsSectionProps) {
  return (
    <SectionCard
      title="Durable Skills results"
      icon={<Sparkles size={20} className="text-amber-500" />}
    >
      {durableSkills.summary ? (
        <Typography className="text-neutral-600 leading-relaxed">
          {durableSkills.summary}
        </Typography>
      ) : (
        <Typography className="text-neutral-500 text-sm">
          No durable skills assessment completed yet.
        </Typography>
      )}
    </SectionCard>
  );
}

export default DurableSkillsSection;
