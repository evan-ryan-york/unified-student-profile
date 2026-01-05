import type { Student, Milestone, QualityFlag, OnTrackInput } from '@/types/student';

/**
 * Calculates whether a student is on-track for post-secondary success.
 * Based on PRD business logic (4 trigger conditions for off-track status).
 */
export function calculateOnTrackStatus(input: OnTrackInput): 'on_track' | 'off_track' {
  const isOffTrack = (
    hasMissedMilestoneDeadline(input.milestones) ||
    hasLowQualityMilestone(input.qualityFlags) ||
    input.manualOverride ||
    hasLowGPA(input.student)
  );

  return isOffTrack ? 'off_track' : 'on_track';
}

/**
 * Check if any milestone with a deadline has passed without completion.
 */
export function hasMissedMilestoneDeadline(milestones: Milestone[]): boolean {
  const now = new Date();
  return milestones.some(m =>
    m.status === 'not_done' &&
    m.dueDate &&
    new Date(m.dueDate) < now
  );
}

/**
 * Check if any milestone has been flagged for low quality.
 */
export function hasLowQualityMilestone(qualityFlags: QualityFlag[]): boolean {
  return qualityFlags.length > 0;
}

/**
 * Check if student GPA is below threshold (< 2.0).
 */
export function hasLowGPA(student: Student): boolean {
  return student.gpa < 2.0;
}

/**
 * Get a summary of why a student is off-track.
 */
export function getOffTrackReasons(input: OnTrackInput): string[] {
  const reasons: string[] = [];

  if (hasLowGPA(input.student)) {
    reasons.push(`GPA is below 2.0 (current: ${input.student.gpa.toFixed(2)})`);
  }

  if (hasMissedMilestoneDeadline(input.milestones)) {
    const missedMilestones = input.milestones.filter(m =>
      m.status === 'not_done' &&
      m.dueDate &&
      new Date(m.dueDate) < new Date()
    );
    reasons.push(`Missed deadline${missedMilestones.length > 1 ? 's' : ''}: ${missedMilestones.map(m => m.title).join(', ')}`);
  }

  if (hasLowQualityMilestone(input.qualityFlags)) {
    reasons.push('Low quality milestone flagged');
  }

  if (input.manualOverride) {
    reasons.push('Manual override set by staff');
  }

  return reasons;
}

/**
 * Calculate milestone completion percentage.
 */
export function getMilestoneCompletionRate(milestones: Milestone[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const completed = milestones.filter(m => m.status === 'done').length;
  const total = milestones.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
