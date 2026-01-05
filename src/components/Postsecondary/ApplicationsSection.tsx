'use client';

import { Typography } from '@mui/material';
import { CollapsibleSection } from '@/components/shared';

export function ApplicationsSection() {
  return (
    <CollapsibleSection title="Applications" defaultExpanded={false}>
      <Typography className="text-neutral-500 text-sm">
        College and program applications will be tracked here.
      </Typography>
    </CollapsibleSection>
  );
}

export default ApplicationsSection;
