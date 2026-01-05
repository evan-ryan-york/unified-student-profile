'use client';

import { Typography } from '@mui/material';
import { CollapsibleSection } from '@/components/shared';

export function FAFSAInfoSection() {
  return (
    <CollapsibleSection title="FAFSA Info" defaultExpanded={false}>
      <Typography className="text-neutral-500 text-sm">
        FAFSA information and status will be displayed here.
      </Typography>
    </CollapsibleSection>
  );
}

export default FAFSAInfoSection;
