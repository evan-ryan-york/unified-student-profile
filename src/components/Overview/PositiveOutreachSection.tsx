'use client';

import { Box, Typography } from '@mui/material';
import { Smile } from 'lucide-react';

export function PositiveOutreachSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2.5,
          py: 2,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Smile size={18} style={{ color: '#6B7280' }} />
        <Typography
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            color: '#181D27',
          }}
        >
          Positive outreach opportunities
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.5 }}>
          Positive outreach suggestions will appear here based on student achievements and milestones.
        </Typography>
      </Box>
    </Box>
  );
}

export default PositiveOutreachSection;
