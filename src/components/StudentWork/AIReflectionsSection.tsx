'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CollapsibleSection, EmptyState } from '@/components/shared';
import { AIReflectionItem } from './AIReflectionItem';
import type { AIReflection } from '@/types/student';

interface AIReflectionsSectionProps {
  reflections: AIReflection[];
  pageSize?: number;
}

export function AIReflectionsSection({
  reflections,
  pageSize = 5,
}: AIReflectionsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReflections = showAll
    ? reflections
    : reflections.slice(0, pageSize);
  const hasMore = reflections.length > pageSize;

  if (reflections.length === 0) {
    return (
      <CollapsibleSection title="AI Reflections">
        <EmptyState type="no_reflections" />
      </CollapsibleSection>
    );
  }

  return (
    <CollapsibleSection title="AI Reflections">
      <Box>
        {displayedReflections.map((reflection) => (
          <AIReflectionItem key={reflection.id} reflection={reflection} />
        ))}
      </Box>

      {hasMore && (
        <Box className="mt-4 text-center">
          <Button
            variant="text"
            onClick={() => setShowAll(!showAll)}
            className="text-slate-600 hover:text-slate-800"
            sx={{ textTransform: 'none' }}
          >
            {showAll
              ? 'Show less'
              : `View all ${reflections.length} reflections`}
          </Button>
        </Box>
      )}
    </CollapsibleSection>
  );
}

export default AIReflectionsSection;
