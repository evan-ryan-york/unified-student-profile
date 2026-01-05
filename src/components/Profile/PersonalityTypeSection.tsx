'use client';

import { Box, Typography, Button } from '@mui/material';
import { SectionCard } from '@/components/shared';
import type { PersonalityType } from '@/types/student';

interface PersonalityTypeSectionProps {
  personalityType: PersonalityType;
  onViewDetails?: () => void;
}

function TraitCard({ name, description }: { name: string; description: string }) {
  return (
    <Box className="bg-neutral-50 rounded-lg p-4">
      <Typography className="font-medium text-neutral-900 mb-1">
        {name}
      </Typography>
      <Typography className="text-sm text-neutral-600 leading-relaxed">
        {description}
      </Typography>
    </Box>
  );
}

export function PersonalityTypeSection({
  personalityType,
  onViewDetails,
}: PersonalityTypeSectionProps) {
  if (!personalityType.name) {
    return (
      <SectionCard title="Personality type">
        <Typography className="text-neutral-500 text-sm">
          No personality assessment completed yet.
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title={`Personality type - ${personalityType.name}`}
      action={
        onViewDetails && (
          <Button
            variant="text"
            size="small"
            onClick={onViewDetails}
            className="text-slate-600 hover:text-slate-800"
            sx={{ textTransform: 'none' }}
          >
            View details
          </Button>
        )
      }
    >
      {personalityType.traits.length === 0 ? (
        <Typography className="text-neutral-500 text-sm">
          No traits identified yet.
        </Typography>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalityType.traits.map((trait, index) => (
            <TraitCard
              key={index}
              name={trait.name}
              description={trait.description}
            />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default PersonalityTypeSection;
