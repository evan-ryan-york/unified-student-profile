'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Checkbox, TextField, IconButton, Chip } from '@mui/material';
import { AlertTriangle, Sparkles, Plus, X, Target, Calendar, BookOpen, Bookmark, GraduationCap, RotateCcw, GripVertical, Trash2, Clock } from 'lucide-react';
import type { TopicRecommendation, TopicCategory, AgendaItem } from '@/types/student';

interface StepTopicsAgendaProps {
  studentFirstName: string;
  recommendations: TopicRecommendation[];
  selectedTopicIds: Set<string>;
  customTopics: string[];
  agenda: AgendaItem[];
  meetingTitle: string;
  duration: number;
  onTopicToggle: (topicId: string) => void;
  onAddCustomTopic: (topic: string) => void;
  onRemoveCustomTopic: (index: number) => void;
  onAgendaChange: (agenda: AgendaItem[]) => void;
  onTitleChange: (title: string) => void;
  onSchedule: () => void;
  onBack: () => void;
  canProceed: boolean;
}

const categoryIcons: Record<TopicCategory, typeof AlertTriangle> = {
  deadline: AlertTriangle,
  milestone: Target,
  goal: Target,
  reflection: BookOpen,
  bookmark: Bookmark,
  grade_level: GraduationCap,
  follow_up: RotateCcw,
};

const priorityStyles = {
  high: {
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    chipColor: 'error' as const,
  },
  medium: {
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    chipColor: 'warning' as const,
  },
  low: {
    borderColor: 'border-neutral-200',
    bgColor: 'bg-white',
    chipColor: 'default' as const,
  },
};

export function StepTopicsAgenda({
  studentFirstName,
  recommendations,
  selectedTopicIds,
  customTopics,
  agenda,
  meetingTitle,
  duration,
  onTopicToggle,
  onAddCustomTopic,
  onRemoveCustomTopic,
  onAgendaChange,
  onTitleChange,
  onSchedule,
  onBack,
  canProceed,
}: StepTopicsAgendaProps) {
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      onAddCustomTopic(newTopic.trim());
      setNewTopic('');
    }
  };

  const highPriorityTopics = recommendations.filter((r) => r.priority === 'high');
  const otherTopics = recommendations.filter((r) => r.priority !== 'high');

  const totalAllocatedTime = agenda.reduce((sum, item) => sum + (item.duration || 0), 0);
  const remainingTime = duration - totalAllocatedTime;

  const handleRemoveAgendaItem = (id: string) => {
    onAgendaChange(agenda.filter((item) => item.id !== id));
  };

  const handleUpdateAgendaItem = (id: string, updates: Partial<AgendaItem>) => {
    onAgendaChange(
      agenda.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleAddAgendaItem = () => {
    const newItem: AgendaItem = {
      id: `agenda-new-${Date.now()}`,
      topic: '',
      source: 'counselor_added',
      duration: Math.max(5, remainingTime),
      covered: false,
    };
    // Insert before wrap-up (last item)
    onAgendaChange([...agenda.slice(0, -1), newItem, ...agenda.slice(-1)]);
  };

  return (
    <Box className="p-6">
      {/* Meeting Title */}
      <Box className="mb-6">
        <Typography className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
          Meeting Title (Optional)
        </Typography>
        <TextField
          value={meetingTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Leave blank for default title..."
          fullWidth
          size="small"
          sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
        />
      </Box>

      {/* Two-column layout */}
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Topics Selection */}
        <Box className="space-y-4">
          <Box>
            <Typography className="text-sm font-medium text-neutral-900 mb-1">
              Select Topics
            </Typography>
            <Box className="flex items-center gap-1 text-xs text-neutral-500">
              <Sparkles size={12} className="text-amber-500" />
              <span>AI-recommended for {studentFirstName}</span>
            </Box>
          </Box>

          {/* High Priority Section */}
          {highPriorityTopics.length > 0 && (
            <Box>
              <Typography className="text-xs font-medium text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                <AlertTriangle size={12} />
                High Priority
              </Typography>
              <Box className="space-y-2">
                {highPriorityTopics.map((rec) => (
                  <TopicCard
                    key={rec.id}
                    recommendation={rec}
                    isSelected={selectedTopicIds.has(rec.id)}
                    onToggle={() => onTopicToggle(rec.id)}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Suggested Topics Section */}
          {otherTopics.length > 0 && (
            <Box>
              <Typography className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
                Suggested Topics
              </Typography>
              <Box className="space-y-2">
                {otherTopics.map((rec) => (
                  <TopicCard
                    key={rec.id}
                    recommendation={rec}
                    isSelected={selectedTopicIds.has(rec.id)}
                    onToggle={() => onTopicToggle(rec.id)}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Custom Topics Section */}
          <Box>
            <Typography className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
              Custom Topics
            </Typography>

            {/* Existing custom topics */}
            {customTopics.length > 0 && (
              <Box className="space-y-2 mb-3">
                {customTopics.map((topic, index) => (
                  <Box
                    key={index}
                    className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg bg-white"
                  >
                    <Checkbox checked disabled size="small" />
                    <Typography className="flex-1 text-sm text-neutral-900">
                      {topic}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => onRemoveCustomTopic(index)}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {/* Add new topic */}
            <Box className="flex gap-2">
              <TextField
                size="small"
                placeholder="Add a custom topic..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
                fullWidth
                sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTopic}
                disabled={!newTopic.trim()}
                sx={{ textTransform: 'none', minWidth: 'auto', px: 2 }}
              >
                <Plus size={18} />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right Column - Agenda Preview */}
        <Box className="space-y-4">
          <Box>
            <Typography className="text-sm font-medium text-neutral-900 mb-1">
              Your Agenda
            </Typography>
            <Typography className="text-xs text-neutral-500">
              Auto-generated from selected topics
            </Typography>
          </Box>

          {/* Time budget */}
          <Box className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
            <Clock size={14} className="text-neutral-500" />
            <Typography className="text-xs text-neutral-600">
              {totalAllocatedTime} of {duration} min allocated
            </Typography>
            {remainingTime > 0 && (
              <Typography className="text-xs text-amber-600">
                ({remainingTime} min unallocated)
              </Typography>
            )}
            {remainingTime < 0 && (
              <Typography className="text-xs text-red-600">
                ({Math.abs(remainingTime)} min over!)
              </Typography>
            )}
          </Box>

          {/* Agenda Items */}
          {agenda.length === 0 ? (
            <Box className="p-6 border border-dashed border-neutral-200 rounded-lg text-center">
              <Typography className="text-sm text-neutral-500 mb-1">
                No agenda items yet
              </Typography>
              <Typography className="text-xs text-neutral-400">
                Select topics to build your agenda, or schedule without one
              </Typography>
            </Box>
          ) : (
            <Box className="space-y-2">
              {agenda.map((item, index) => (
                <AgendaItemEditor
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdate={(updates) => handleUpdateAgendaItem(item.id, updates)}
                  onRemove={() => handleRemoveAgendaItem(item.id)}
                  canRemove={agenda.length > 1}
                />
              ))}
            </Box>
          )}

          {/* Add Item Button */}
          {agenda.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={handleAddAgendaItem}
              fullWidth
              sx={{
                textTransform: 'none',
                borderStyle: 'dashed',
                color: 'text.secondary',
              }}
            >
              Add agenda item
            </Button>
          )}
        </Box>
      </Box>

      {/* Actions */}
      <Box className="flex gap-3 pt-6 mt-6 border-t border-neutral-100">
        <Button
          variant="text"
          onClick={onBack}
          sx={{ textTransform: 'none' }}
        >
          Back
        </Button>
        <Box className="flex-1" />
        <Button
          variant="contained"
          onClick={onSchedule}
          disabled={!canProceed}
          sx={{
            textTransform: 'none',
            px: 4,
            backgroundColor: '#062F29',
            '&:hover': {
              backgroundColor: '#0A4A40',
            },
          }}
        >
          Schedule Meeting
        </Button>
      </Box>
    </Box>
  );
}

interface TopicCardProps {
  recommendation: TopicRecommendation;
  isSelected: boolean;
  onToggle: () => void;
}

function TopicCard({ recommendation, isSelected, onToggle }: TopicCardProps) {
  const Icon = categoryIcons[recommendation.category];
  const styles = priorityStyles[recommendation.priority];

  return (
    <Box
      onClick={onToggle}
      className={`
        flex items-start gap-3 p-3 rounded-lg border cursor-pointer
        transition-colors
        ${isSelected ? 'border-blue-300 bg-blue-50' : `${styles.borderColor} ${styles.bgColor}`}
      `}
    >
      <Checkbox
        checked={isSelected}
        size="small"
        sx={{ p: 0, mt: 0.25 }}
      />

      <Box className="flex-1 min-w-0">
        <Box className="flex items-center gap-2 mb-1">
          <Icon size={14} className="text-neutral-400" />
          <Typography className="font-medium text-neutral-900 text-sm">
            {recommendation.topic}
          </Typography>
          {recommendation.priority === 'high' && (
            <Chip
              label="High"
              size="small"
              color={styles.chipColor}
              sx={{ height: 18, fontSize: '0.65rem' }}
            />
          )}
        </Box>

        {recommendation.description && (
          <Typography className="text-xs text-neutral-600 mb-1">
            {recommendation.description}
          </Typography>
        )}

        <Typography className="text-xs text-neutral-500 italic">
          {recommendation.reason}
        </Typography>
      </Box>
    </Box>
  );
}

interface AgendaItemEditorProps {
  item: AgendaItem;
  index: number;
  onUpdate: (updates: Partial<AgendaItem>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function AgendaItemEditor({ item, index, onUpdate, onRemove, canRemove }: AgendaItemEditorProps) {
  return (
    <Box className="flex items-start gap-2 p-3 border border-neutral-200 rounded-lg bg-white">
      {/* Drag handle (visual only for now) */}
      <Box className="text-neutral-300 cursor-grab mt-2">
        <GripVertical size={16} />
      </Box>

      {/* Content */}
      <Box className="flex-1 space-y-1">
        <Box className="flex items-center gap-2">
          <Typography className="text-xs text-neutral-400 font-medium">
            {index + 1}.
          </Typography>
          <TextField
            value={item.topic}
            onChange={(e) => onUpdate({ topic: e.target.value })}
            placeholder="Topic..."
            variant="standard"
            fullWidth
            sx={{
              '& .MuiInput-root': { fontSize: '0.875rem' },
              '& .MuiInput-root:before': { borderBottom: 'none' },
              '& .MuiInput-root:hover:not(.Mui-disabled):before': { borderBottom: '1px solid #E5E7EB' },
            }}
          />
          {item.source === 'ai_recommended' && (
            <Sparkles size={12} className="text-amber-500 flex-shrink-0" />
          )}
        </Box>
      </Box>

      {/* Duration */}
      <Box className="flex items-center gap-1 flex-shrink-0">
        <TextField
          type="number"
          value={item.duration || 0}
          onChange={(e) => onUpdate({ duration: parseInt(e.target.value) || 0 })}
          size="small"
          inputProps={{ min: 1, max: 60, style: { textAlign: 'center' } }}
          sx={{ width: 50, '& .MuiInputBase-root': { fontSize: '0.75rem' } }}
        />
        <Typography className="text-xs text-neutral-400">min</Typography>
      </Box>

      {/* Remove button */}
      {canRemove && (
        <IconButton
          size="small"
          onClick={onRemove}
          className="text-neutral-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </IconButton>
      )}
    </Box>
  );
}

export default StepTopicsAgenda;
