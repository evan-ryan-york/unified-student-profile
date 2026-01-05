'use client';

import { useState } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import { ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { formatRelativeTime } from '@/lib/dateUtils';
import type { AIReflection } from '@/types/student';

interface AIReflectionItemProps {
  reflection: AIReflection;
}

export function AIReflectionItem({ reflection }: AIReflectionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate content for preview
  const previewLength = 150;
  const needsTruncation = reflection.content.length > previewLength;
  const previewContent = needsTruncation
    ? reflection.content.slice(0, previewLength) + '...'
    : reflection.content;

  return (
    <Box className="border-b border-neutral-100 last:border-b-0 py-4">
      <Box className="flex items-start justify-between">
        <Box className="flex items-start gap-3 flex-1">
          <Box className="p-2 bg-amber-50 rounded-lg flex-shrink-0">
            <Brain size={16} className="text-amber-600" />
          </Box>
          <Box className="flex-1 min-w-0">
            <Typography className="font-medium text-neutral-900 text-sm mb-1">
              {reflection.title}
            </Typography>
            <Typography className="text-xs text-neutral-500 mb-2">
              {reflection.lessonTitle}
              {reflection.curriculumUnit && ` • ${reflection.curriculumUnit}`}
            </Typography>

            <Collapse in={isExpanded} collapsedSize={0}>
              <Typography className="text-sm text-neutral-600 leading-relaxed">
                {reflection.content}
              </Typography>
            </Collapse>

            {!isExpanded && (
              <Typography className="text-sm text-neutral-600 leading-relaxed">
                {previewContent}
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="flex items-center gap-2 flex-shrink-0 ml-4">
          <Typography className="text-xs text-neutral-400">
            {formatRelativeTime(reflection.createdAt)}
          </Typography>
          {needsTruncation && (
            <IconButton
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neutral-400"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AIReflectionItem;
