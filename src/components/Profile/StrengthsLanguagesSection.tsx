'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SectionCard, SubTabNavigation } from '@/components/shared';

interface StrengthsLanguagesSectionProps {
  strengths: string[];
  languages: string[];
}

export function StrengthsLanguagesSection({
  strengths,
  languages,
}: StrengthsLanguagesSectionProps) {
  const [activeTab, setActiveTab] = useState<'strengths' | 'languages'>('strengths');

  const items = activeTab === 'strengths' ? strengths : languages;
  const emptyText = activeTab === 'strengths'
    ? 'No strengths identified yet'
    : 'No languages added yet';

  return (
    <SectionCard
      title="Strengths & languages"
      action={
        <SubTabNavigation
          options={[
            { value: 'strengths', label: 'Strengths' },
            { value: 'languages', label: 'Languages' },
          ]}
          value={activeTab}
          onChange={(v) => setActiveTab(v as 'strengths' | 'languages')}
        />
      }
    >
      {items.length === 0 ? (
        <Typography className="text-sm text-neutral-500">{emptyText}</Typography>
      ) : (
        <Box className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Box
              key={index}
              className="px-3 py-1.5 bg-neutral-100 rounded-full text-sm text-neutral-700"
            >
              {item}
            </Box>
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default StrengthsLanguagesSection;
