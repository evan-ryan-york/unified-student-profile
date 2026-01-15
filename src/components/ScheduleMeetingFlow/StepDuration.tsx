'use client';

import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Clock, Calendar } from 'lucide-react';
import { Slate } from '@/theme/primitives';

interface StepDurationProps {
  duration: number;
  scheduledDate: string;
  scheduledTime: string;
  onDurationChange: (duration: number) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onSchedule: () => void;
  onAddAgenda: () => void;
  onCancel: () => void;
  canProceed: boolean;
}

const DURATION_OPTIONS = [15, 30, 45, 60];

export function StepDuration({
  duration,
  scheduledDate,
  scheduledTime,
  onDurationChange,
  onDateChange,
  onTimeChange,
  onSchedule,
  onAddAgenda,
  onCancel,
  canProceed,
}: StepDurationProps) {
  // Get tomorrow's date as default minimum
  const tomorrow = dayjs().add(1, 'day');

  // Convert string date to dayjs for the calendar
  const selectedDate = scheduledDate ? dayjs(scheduledDate) : null;

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      onDateChange(date.format('YYYY-MM-DD'));
    }
  };

  return (
    <Box className="p-4 flex flex-col h-full">
      <Box className="flex-1 space-y-6">
        {/* Duration selection */}
        <Box>
          <Box className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-neutral-500" />
            <Typography className="text-sm font-medium text-neutral-700">
              Meeting duration
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={duration}
            exclusive
            onChange={(_, value) => value && onDurationChange(value)}
            fullWidth
            sx={{
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                py: 1.5,
                fontSize: '0.875rem',
                '&.Mui-selected': {
                  backgroundColor: Slate[50],
                  color: Slate[900],
                  borderColor: Slate[300],
                  '&:hover': {
                    backgroundColor: Slate[100],
                  },
                },
              },
            }}
          >
            {DURATION_OPTIONS.map((mins) => (
              <ToggleButton key={mins} value={mins}>
                {mins} min
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Date selection */}
        <Box>
          <Box className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-neutral-500" />
            <Typography className="text-sm font-medium text-neutral-700">
              Date
            </Typography>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              minDate={tomorrow}
              sx={{
                width: '100%',
                '& .MuiPickersCalendarHeader-root': {
                  paddingLeft: 1,
                  paddingRight: 1,
                },
                '& .MuiDayCalendar-weekContainer': {
                  justifyContent: 'space-around',
                },
                '& .MuiPickersDay-root': {
                  fontSize: '0.875rem',
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            type="time"
            label="Time"
            value={scheduledTime}
            onChange={(e) => onTimeChange(e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
        </Box>

      </Box>

      {/* Actions */}
      <Box className="flex flex-col gap-3 pt-4 border-t border-neutral-100 mt-4">
        <Box className="flex gap-2">
          <Button
            variant="text"
            onClick={onCancel}
            sx={{ textTransform: 'none', flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSchedule}
            disabled={!canProceed}
            sx={{ textTransform: 'none', flex: 1 }}
          >
            Schedule
          </Button>
        </Box>
        <Button
          variant="text"
          onClick={onAddAgenda}
          disabled={!canProceed}
          sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.875rem' }}
        >
          Add an agenda instead
        </Button>
      </Box>
    </Box>
  );
}

export default StepDuration;
