'use client';

import { Box, Typography, Button } from '@mui/material';
import { Sparkles, RefreshCw } from 'lucide-react';
import type { AlmaSnapshot } from '@/types/student';

interface AlmaSnapshotSectionProps {
  snapshot: AlmaSnapshot | null;
  onGenerateSnapshot: () => void;
  isLoading?: boolean;
}

export function AlmaSnapshotSection({
  snapshot,
  onGenerateSnapshot,
  isLoading = false,
}: AlmaSnapshotSectionProps) {
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
        <Sparkles size={18} style={{ color: '#6B7280' }} />
        <Typography
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            color: '#181D27',
          }}
        >
          Alma Snapshot
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5 }}>
        {snapshot ? (
          <>
            <Typography
              sx={{
                color: '#414651',
                mb: 2,
                lineHeight: 1.6,
                fontSize: '14px',
              }}
            >
              {snapshot.content}
            </Typography>

            {snapshot.bulletPoints.length > 0 && (
              <Box
                component="ul"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  mb: 2.5,
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {snapshot.bulletPoints.map((point, index) => (
                  <Box
                    key={index}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      color: '#414651',
                    }}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        backgroundColor: '#181D27',
                        mt: 0.75,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: '14px', lineHeight: 1.5 }}>{point}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </>
        ) : (
          <Typography
            sx={{
              color: '#6B7280',
              fontSize: '14px',
              mb: 2.5,
            }}
          >
            No snapshot generated yet. Generate one to get AI-powered insights about this student.
          </Typography>
        )}

        <Button
          variant="outlined"
          startIcon={isLoading ? <RefreshCw size={14} className="animate-spin" /> : null}
          onClick={onGenerateSnapshot}
          disabled={isLoading}
          sx={{
            textTransform: 'none',
            borderColor: '#D5D7DA',
            color: '#414651',
            fontSize: '13px',
            fontWeight: 500,
            py: 0.75,
            px: 1.5,
            '&:hover': {
              borderColor: '#A4A7AE',
              backgroundColor: '#FAFAFA',
            },
          }}
        >
          {isLoading ? 'Generating...' : snapshot ? 'Regenerate snapshot' : 'Generate snapshot'}
        </Button>
      </Box>
    </Box>
  );
}

export default AlmaSnapshotSection;
