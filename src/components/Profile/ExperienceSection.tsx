'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Plus, Briefcase, Users, Heart, Pencil } from 'lucide-react';
import { SectionCard, SubTabNavigation } from '@/components/shared';
import type { Experience } from '@/types/student';

interface ExperienceSectionProps {
  experiences: Experience[];
  onAddExperience?: () => void;
  onEditExperience?: (experience: Experience) => void;
}

const typeIcons = {
  work: Briefcase,
  leadership: Users,
  volunteer: Heart,
};

function ExperienceCard({
  experience,
  onEdit,
}: {
  experience: Experience;
  onEdit?: () => void;
}) {
  const Icon = typeIcons[experience.type];

  return (
    <Box className="border border-neutral-200 rounded-lg p-4">
      <Box className="flex items-start justify-between mb-2">
        <Box className="flex items-center gap-3">
          <Box className="p-2 bg-neutral-100 rounded-lg">
            <Icon size={20} className="text-neutral-600" />
          </Box>
          <Box>
            <Typography className="font-medium text-neutral-900">
              {experience.title}
            </Typography>
            {experience.organization && (
              <Typography className="text-sm text-neutral-500">
                {experience.organization}
              </Typography>
            )}
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

      <Typography className="text-xs text-neutral-500 mb-2">
        {experience.dateRange}
      </Typography>

      <Typography className="text-sm text-neutral-600 mb-3">
        {experience.description}
      </Typography>

      {experience.skills.length > 0 && (
        <Box className="flex flex-wrap gap-1.5">
          {experience.skills.map((skill, index) => (
            <Box
              key={index}
              className="px-2 py-0.5 bg-neutral-100 rounded text-xs text-neutral-600"
            >
              {skill}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export function ExperienceSection({
  experiences,
  onAddExperience,
  onEditExperience,
}: ExperienceSectionProps) {
  const [filter, setFilter] = useState<'all' | 'work' | 'leadership' | 'volunteer'>('all');

  const filteredExperiences = filter === 'all'
    ? experiences
    : experiences.filter((e) => e.type === filter);

  const counts = {
    all: experiences.length,
    work: experiences.filter((e) => e.type === 'work').length,
    leadership: experiences.filter((e) => e.type === 'leadership').length,
    volunteer: experiences.filter((e) => e.type === 'volunteer').length,
  };

  return (
    <SectionCard
      title="Work, leadership & volunteer experience"
      action={
        <Button
          variant="text"
          size="small"
          startIcon={<Plus size={16} />}
          onClick={onAddExperience}
          className="text-slate-600 hover:text-slate-800"
          sx={{ textTransform: 'none' }}
        >
          Add
        </Button>
      }
    >
      <Box className="mb-4">
        <SubTabNavigation
          options={[
            { value: 'all', label: `All (${counts.all})` },
            { value: 'work', label: `Work (${counts.work})` },
            { value: 'leadership', label: `Leadership (${counts.leadership})` },
            { value: 'volunteer', label: `Volunteer (${counts.volunteer})` },
          ]}
          value={filter}
          onChange={(v) => setFilter(v as typeof filter)}
        />
      </Box>

      {filteredExperiences.length === 0 ? (
        <Typography className="text-sm text-neutral-500 py-4">
          No experiences added yet
        </Typography>
      ) : (
        <Box className="space-y-4">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onEdit={() => onEditExperience?.(experience)}
            />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}

export default ExperienceSection;
