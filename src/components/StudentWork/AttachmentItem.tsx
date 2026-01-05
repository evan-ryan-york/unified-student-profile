'use client';

import { Box, Typography, Button } from '@mui/material';
import { Link, FileText, Image, Download, ExternalLink } from 'lucide-react';
import type { Attachment } from '@/types/student';

interface AttachmentItemProps {
  attachment: Attachment;
  onAction?: () => void;
}

const typeIcons = {
  link: Link,
  pdf: FileText,
  image: Image,
};

export function AttachmentItem({ attachment, onAction }: AttachmentItemProps) {
  const Icon = typeIcons[attachment.type];
  const isLink = attachment.type === 'link';
  const actionLabel = isLink ? 'Open link' : 'Download';
  const ActionIcon = isLink ? ExternalLink : Download;

  return (
    <Box
      className="flex items-center gap-3 py-2 px-3 bg-neutral-50 rounded-lg"
    >
      <Icon size={16} className="text-neutral-500 flex-shrink-0" />
      <Box className="flex-1 min-w-0">
        <Typography className="text-sm text-neutral-700 truncate">
          {attachment.name}
        </Typography>
        {attachment.size && (
          <Typography className="text-xs text-neutral-500">
            {attachment.size}
          </Typography>
        )}
      </Box>
      <Button
        variant="text"
        size="small"
        startIcon={<ActionIcon size={14} />}
        onClick={onAction}
        className="text-slate-600 hover:text-slate-800"
        sx={{ textTransform: 'none', minWidth: 'auto', fontSize: '0.75rem' }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
}

export default AttachmentItem;
