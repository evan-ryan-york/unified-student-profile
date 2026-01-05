'use client';

import { Box, Typography } from '@mui/material';
import { MapPin, Mail } from 'lucide-react';
import { SectionCard } from '@/components/shared';

interface IdDetailsSectionProps {
  location: string;
  email: string;
}

export function IdDetailsSection({ location, email }: IdDetailsSectionProps) {
  return (
    <SectionCard title="Non essential ID details">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4B5563' }}>
          <MapPin size={16} style={{ color: '#9CA3AF' }} />
          <Typography sx={{ fontSize: '14px' }}>{location}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4B5563' }}>
          <Mail size={16} style={{ color: '#9CA3AF' }} />
          <Typography sx={{ fontSize: '14px' }}>{email}</Typography>
        </Box>
      </Box>
    </SectionCard>
  );
}

export default IdDetailsSection;
