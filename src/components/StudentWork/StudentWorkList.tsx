'use client';

import { Box, Typography, Button } from '@mui/material';
import { Plus, FileText, Pencil } from 'lucide-react';
import { SectionCard } from '@/components/shared';
import { AttachmentItem } from './AttachmentItem';
import type { StudentWork, Attachment } from '@/types/student';

interface StudentWorkListProps {
  works: StudentWork[];
  onAddWork?: () => void;
  onEditWork?: (work: StudentWork) => void;
  onAttachmentAction?: (attachment: Attachment) => void;
}

function WorkItem({
  work,
  onEdit,
  onAttachmentAction,
}: {
  work: StudentWork;
  onEdit?: () => void;
  onAttachmentAction?: (attachment: Attachment) => void;
}) {
  return (
    <Box className="border border-neutral-200 rounded-lg p-4">
      <Box className="flex items-start justify-between mb-3">
        <Box className="flex items-start gap-3">
          <Box className="p-2 bg-neutral-100 rounded-lg flex-shrink-0">
            <FileText size={20} className="text-neutral-600" />
          </Box>
          <Box>
            <Typography className="font-medium text-neutral-900">
              {work.title}
            </Typography>
            <Typography className="text-xs text-neutral-500">
              {work.dateRange} • {work.category}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="text"
          size="small"
          startIcon={<Pencil size={14} />}
          onClick={onEdit}
          className="text-neutral-500 hover:text-neutral-700"
          sx={{ textTransform: 'none', minWidth: 'auto' }}
        >
          Edit
        </Button>
      </Box>

      <Typography className="text-sm text-neutral-600 mb-4 leading-relaxed">
        {work.description}
      </Typography>

      {work.attachments.length > 0 && (
        <Box className="space-y-2">
          {work.attachments.map((attachment) => (
            <AttachmentItem
              key={attachment.id}
              attachment={attachment}
              onAction={() => onAttachmentAction?.(attachment)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export function StudentWorkList({
  works,
  onAddWork,
  onEditWork,
  onAttachmentAction,
}: StudentWorkListProps) {
  return (
    <SectionCard
      title="Student work"
      action={
        <Button
          variant="text"
          size="small"
          startIcon={<Plus size={16} />}
          onClick={onAddWork}
          className="text-slate-600 hover:text-slate-800"
          sx={{ textTransform: 'none' }}
        >
          Add
        </Button>
      }
    >
      {works.length === 0 ? (
        <Typography className="text-neutral-500 text-sm py-4">
          No student work added yet.
        </Typography>
      ) : (
        <Box className="space-y-4">
          {works.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              onEdit={() => onEditWork?.(work)}
              onAttachmentAction={onAttachmentAction}
            />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default StudentWorkList;
