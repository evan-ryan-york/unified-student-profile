'use client';

import { Box, Typography } from '@mui/material';
import { BadgeCheck, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/shared';
import type { AcademicAchievement, Award as AwardType, MicroCredential, CourseHighlight } from '@/types/student';

interface AcademicAchievementsSectionProps {
  achievements: AcademicAchievement;
  awards: AwardType[];
  microCredentials: MicroCredential[];
  courseHighlights: CourseHighlight[];
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string | number | null;
  subtitle?: string;
}) {
  return (
    <Box
      sx={{
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        p: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: '12px',
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#062F29',
        }}
      >
        {value ?? '-'}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontSize: '12px',
            color: '#6B7280',
            mt: 0.25,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function TagList({ items, emptyText }: { items: string[]; emptyText: string }) {
  if (items.length === 0) {
    return (
      <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{emptyText}</Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            px: 1.5,
            py: 0.75,
            backgroundColor: '#F3F4F6',
            borderRadius: '9999px',
            fontSize: '14px',
            color: '#374151',
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

function IconCard({ name, icon: Icon }: { name: string; icon: React.ElementType }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
      }}
    >
      <Icon size={16} style={{ color: '#6B7280' }} />
      <Typography sx={{ fontSize: '14px', color: '#374151' }}>{name}</Typography>
    </Box>
  );
}

export function AcademicAchievementsSection({
  achievements,
  awards,
  microCredentials,
  courseHighlights,
}: AcademicAchievementsSectionProps) {
  return (
    <SectionCard title="Academic achievements">
      {/* Stats grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard label="ACT" value={achievements.actScore} />
        <StatCard label="SAT" value={achievements.satScore} />
        <StatCard label="Class Rank" value={achievements.classRank} />
      </Box>

      {/* Awards & Recognition */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            mb: 1.5,
          }}
        >
          Awards & Recognition
        </Typography>
        <TagList
          items={awards.map((a) => a.name)}
          emptyText="No awards yet"
        />
      </Box>

      {/* Micro credentials */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            mb: 1.5,
          }}
        >
          Micro credentials
        </Typography>
        {microCredentials.length === 0 ? (
          <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
            No micro credentials yet
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {microCredentials.map((cred) => (
              <IconCard key={cred.id} name={cred.name} icon={BadgeCheck} />
            ))}
          </Box>
        )}
      </Box>

      {/* Course highlights */}
      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#374151',
            mb: 1.5,
          }}
        >
          Course highlights
        </Typography>
        {courseHighlights.length === 0 ? (
          <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
            No course highlights yet
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {courseHighlights.map((course) => (
              <IconCard key={course.id} name={course.name} icon={BookOpen} />
            ))}
          </Box>
        )}
      </Box>
    </SectionCard>
  );
}

export default AcademicAchievementsSection;
