'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  Bookmark,
  BookmarkCheck,
  Star,
} from 'lucide-react';
import { SectionCard, SubTabNavigation, EmptyState, TopPickBadge } from '@/components/shared';
import type { Bookmark as BookmarkType } from '@/types/student';

interface BookmarksSectionProps {
  bookmarks: BookmarkType[];
  onBookmarkToggle?: (bookmark: BookmarkType) => void;
}

function formatSalary(salary?: number): string {
  if (!salary) return '-';
  return `$${(salary / 1000).toFixed(0)}k`;
}

function BookmarkRow({
  bookmark,
  onToggle,
}: {
  bookmark: BookmarkType;
  onToggle?: () => void;
}) {
  return (
    <Box
      className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
    >
      <IconButton
        size="small"
        onClick={onToggle}
        className={bookmark.isBookmarked ? 'text-green-600' : 'text-neutral-300'}
      >
        {bookmark.isBookmarked ? (
          <BookmarkCheck size={20} className="fill-green-100" />
        ) : (
          <Bookmark size={20} />
        )}
      </IconButton>

      <Box className="flex-1 min-w-0">
        <Box className="flex items-center gap-2 mb-1">
          <Typography className="font-medium text-neutral-900 text-sm">
            {bookmark.title}
          </Typography>
          {bookmark.isTopPick && <TopPickBadge />}
        </Box>
        {bookmark.tags.length > 0 && (
          <Box className="flex flex-wrap gap-1">
            {bookmark.tags.map((tag, index) => (
              <Typography
                key={index}
                className="text-xs text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded"
              >
                {tag}
              </Typography>
            ))}
          </Box>
        )}
      </Box>

      {bookmark.type === 'career' && (
        <>
          <Box className="w-24 text-right">
            <Typography className="text-xs text-neutral-500 uppercase">
              Median Salary
            </Typography>
            <Typography className="text-sm font-medium text-neutral-900">
              {formatSalary(bookmark.medianSalary)}
            </Typography>
          </Box>
          <Box className="w-20 text-right">
            <Typography className="text-xs text-neutral-500 uppercase">
              Education
            </Typography>
            <Typography className="text-sm font-medium text-neutral-900">
              {bookmark.educationYears || '-'}
            </Typography>
          </Box>
        </>
      )}

      {bookmark.type === 'program' && (
        <Box className="w-20 text-right">
          <Typography className="text-xs text-neutral-500 uppercase">
            Duration
          </Typography>
          <Typography className="text-sm font-medium text-neutral-900">
            {bookmark.educationYears || '-'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export function BookmarksSection({ bookmarks, onBookmarkToggle }: BookmarksSectionProps) {
  const [filter, setFilter] = useState<'career' | 'school' | 'program'>('career');

  const filteredBookmarks = bookmarks.filter((b) => b.type === filter);
  const counts = {
    career: bookmarks.filter((b) => b.type === 'career').length,
    school: bookmarks.filter((b) => b.type === 'school').length,
    program: bookmarks.filter((b) => b.type === 'program').length,
  };

  return (
    <SectionCard
      title="Bookmarks"
      action={
        <SubTabNavigation
          options={[
            { value: 'career', label: `Careers (${counts.career})` },
            { value: 'school', label: `Schools (${counts.school})` },
            { value: 'program', label: `Programs (${counts.program})` },
          ]}
          value={filter}
          onChange={(v) => setFilter(v as typeof filter)}
        />
      }
    >
      {filteredBookmarks.length === 0 ? (
        <EmptyState type="no_bookmarks" />
      ) : (
        <Box>
          {filteredBookmarks.map((bookmark) => (
            <BookmarkRow
              key={bookmark.id}
              bookmark={bookmark}
              onToggle={() => onBookmarkToggle?.(bookmark)}
            />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default BookmarksSection;
