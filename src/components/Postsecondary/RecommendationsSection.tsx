'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { SectionCard, SubTabNavigation, TopPickBadge } from '@/components/shared';
import type { Recommendation } from '@/types/student';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  onBookmarkToggle?: (recommendation: Recommendation) => void;
}

function formatSalary(salary?: number): string {
  if (!salary) return '-';
  return `$${(salary / 1000).toFixed(0)}k`;
}

function RecommendationRow({
  recommendation,
  onToggle,
}: {
  recommendation: Recommendation;
  onToggle?: () => void;
}) {
  return (
    <Box
      className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
    >
      <IconButton
        size="small"
        onClick={onToggle}
        className={recommendation.isBookmarked ? 'text-green-600' : 'text-neutral-300'}
      >
        {recommendation.isBookmarked ? (
          <BookmarkCheck size={20} className="fill-green-100" />
        ) : (
          <Bookmark size={20} />
        )}
      </IconButton>

      <Box className="flex-1 min-w-0">
        <Box className="flex items-center gap-2 mb-1">
          <Typography className="font-medium text-neutral-900 text-sm">
            {recommendation.title}
          </Typography>
          {recommendation.isTopPick && <TopPickBadge />}
        </Box>
        <Box className="flex flex-wrap gap-1 items-center">
          {recommendation.tags.map((tag, index) => (
            <Typography
              key={index}
              className="text-xs text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded"
            >
              {tag}
            </Typography>
          ))}
          <Typography className="text-xs text-slate-600">
            Recommended by {recommendation.recommendedBy}
          </Typography>
        </Box>
      </Box>

      {recommendation.type === 'career' && (
        <>
          <Box className="w-24 text-right">
            <Typography className="text-xs text-neutral-500 uppercase">
              Median Salary
            </Typography>
            <Typography className="text-sm font-medium text-neutral-900">
              {formatSalary(recommendation.medianSalary)}
            </Typography>
          </Box>
          <Box className="w-20 text-right">
            <Typography className="text-xs text-neutral-500 uppercase">
              Education
            </Typography>
            <Typography className="text-sm font-medium text-neutral-900">
              {recommendation.educationYears || '-'}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export function RecommendationsSection({
  recommendations,
  onBookmarkToggle,
}: RecommendationsSectionProps) {
  const [filter, setFilter] = useState<'career' | 'school' | 'program'>('career');

  const filteredRecommendations = recommendations.filter((r) => r.type === filter);
  const counts = {
    career: recommendations.filter((r) => r.type === 'career').length,
    school: recommendations.filter((r) => r.type === 'school').length,
    program: recommendations.filter((r) => r.type === 'program').length,
  };

  // Only show tabs that have recommendations
  const options = [
    counts.career > 0 && { value: 'career', label: `Careers (${counts.career})` },
    counts.school > 0 && { value: 'school', label: `Schools (${counts.school})` },
    counts.program > 0 && { value: 'program', label: `Programs (${counts.program})` },
  ].filter(Boolean) as { value: string; label: string }[];

  if (recommendations.length === 0) {
    return (
      <SectionCard title="Recommendations">
        <Typography className="text-neutral-500 text-sm py-4">
          No recommendations yet. Staff can add recommendations for this student.
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Recommendations"
      action={
        options.length > 1 && (
          <SubTabNavigation
            options={options}
            value={filter}
            onChange={(v) => setFilter(v as typeof filter)}
          />
        )
      }
    >
      {filteredRecommendations.length === 0 ? (
        <Typography className="text-neutral-500 text-sm py-4">
          No {filter} recommendations yet.
        </Typography>
      ) : (
        <Box>
          {filteredRecommendations.map((rec) => (
            <RecommendationRow
              key={rec.id}
              recommendation={rec}
              onToggle={() => onBookmarkToggle?.(rec)}
            />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default RecommendationsSection;
