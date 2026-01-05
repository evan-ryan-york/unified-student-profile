'use client';

import { Box, Button } from '@mui/material';

interface SubTabOption {
  value: string;
  label: string;
}

interface SubTabNavigationProps {
  options: SubTabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SubTabNavigation({
  options,
  value,
  onChange,
  className = '',
}: SubTabNavigationProps) {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        gap: 0.5,
        p: 0.5,
        backgroundColor: '#F3F4F6',
        borderRadius: '8px',
        width: 'fit-content',
      }}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          size="small"
          onClick={() => onChange(option.value)}
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: 'auto',
            textTransform: 'none',
            transition: 'all 0.2s',
            backgroundColor: value === option.value ? 'white' : 'transparent',
            color: value === option.value ? '#062F29' : '#4B5563',
            boxShadow: value === option.value ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            '&:hover': {
              backgroundColor: value === option.value ? 'white' : 'rgba(255,255,255,0.5)',
              color: '#062F29',
            },
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
}

export default SubTabNavigation;
