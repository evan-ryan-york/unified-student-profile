// Core student types
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  email: string;
  location: string;
  avatarUrl: string;
  missionStatement: string;
  gpa: number;
  satScore: number | null;
  actScore: number | null;
  classRank: string;
  readinessScore: number;
  onTrackStatus: 'on_track' | 'off_track';
}

// Milestone types
export interface Milestone {
  id: string;
  title: string;
  type: 'willow_generated' | 'custom';
  status: 'done' | 'not_done';
  progress: number; // 0-100
  progressLabel?: string; // e.g., "1/3"
  description?: string;
  dueDate?: string; // ISO date string, used for on-track calculation
  completedAt?: string; // ISO date string
}

// Task types
export interface Task {
  id: string;
  title: string;
  dueDate: string | null;
  status: 'open' | 'completed';
  source: 'manual' | 'suggested_action' | 'meeting';
}

// Suggested Action types
export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  source: 'meeting_notes' | 'alma_snapshot';
  sourceDate?: string;
  status: 'pending' | 'accepted' | 'dismissed';
}

// SMART Goal types
export interface SmartGoalSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface SmartGoal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  subtasks: SmartGoalSubtask[];
}

// Alma Snapshot types
export interface AlmaSnapshot {
  id: string;
  generatedAt: string;
  content: string;
  bulletPoints: string[];
}

// Profile types
export interface AcademicAchievement {
  gpa: number;
  gpaMax: number;
  actScore: number | null;
  satScore: number | null;
  classRank: string;
}

export interface Award {
  id: string;
  name: string;
}

export interface MicroCredential {
  id: string;
  name: string;
  icon?: string;
}

export interface CourseHighlight {
  id: string;
  name: string;
  icon?: string;
}

export interface PersonalityTrait {
  name: string;
  description: string;
  score?: number; // Optional score/level indicator
}

export interface PersonalityType {
  name: string;
  traits: PersonalityTrait[];
}

export interface Experience {
  id: string;
  title: string;
  type: 'work' | 'leadership' | 'volunteer';
  organization?: string;
  dateRange: string;
  description: string;
  skills: string[];
}

export interface DurableSkillsResult {
  summary: string;
}

export interface StudentProfile {
  academicAchievements: AcademicAchievement;
  awards: Award[];
  microCredentials: MicroCredential[];
  courseHighlights: CourseHighlight[];
  strengths: string[];
  languages: string[];
  experiences: Experience[];
  durableSkills: DurableSkillsResult;
  personalityType: PersonalityType;
  values: string;
  mission: string;
  careerVision: string;
}

// Postsecondary types
export interface Bookmark {
  id: string;
  type: 'career' | 'school' | 'program';
  title: string;
  medianSalary?: number;
  educationYears?: string;
  tags: string[];
  isTopPick: boolean;
  isBookmarked: boolean;
}

export interface Recommendation {
  id: string;
  type: 'career' | 'school' | 'program';
  title: string;
  medianSalary?: number;
  educationYears?: string;
  tags: string[];
  isTopPick: boolean;
  recommendedBy: string;
  isBookmarked: boolean;
}

// Student Work types
export interface StudentWork {
  id: string;
  title: string;
  dateRange: string;
  category: string;
  description: string;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'link' | 'pdf' | 'image';
  name: string;
  url: string;
  size?: string;
}

// Activity & Meetings types
export interface ActivityItem {
  id: string;
  type: 'note' | 'alma_snapshot' | 'meeting_transcript' | 'milestone_completion';
  content: string;
  title?: string;
  duration?: string;
  createdAt: string;
  milestoneName?: string; // For milestone_completion type
}

// AI Reflection types
export interface AIReflection {
  id: string;
  title: string;
  lessonTitle: string;
  content: string;
  createdAt: string;
  curriculumUnit?: string;
}

// On-Track calculation types
export interface OnTrackInput {
  student: Student;
  milestones: Milestone[];
  qualityFlags: QualityFlag[];
  manualOverride: boolean;
}

export interface QualityFlag {
  milestoneId: string;
  reason: string;
  flaggedAt: string;
}

// Tab types
export type TabType = 'overview' | 'profile' | 'postsecondary' | 'student-work' | 'meetings';

// Empty state types
export type EmptyStateType =
  | 'no_milestones'
  | 'new_student'
  | 'no_meetings'
  | 'no_bookmarks'
  | 'no_reflections'
  | 'no_tasks'
  | 'no_goals'
  | 'no_activity';

// Error state types
export type ErrorStateType = 'load_failed' | 'snapshot_failed' | 'network_timeout';

// Complete student data bundle
export interface StudentData {
  student: Student;
  profile: StudentProfile;
  milestones: Milestone[];
  tasks: Task[];
  suggestedActions: SuggestedAction[];
  smartGoals: SmartGoal[];
  almaSnapshot: AlmaSnapshot | null;
  bookmarks: Bookmark[];
  recommendations: Recommendation[];
  studentWork: StudentWork[];
  activityHistory: ActivityItem[];
  aiReflections: AIReflection[];
  qualityFlags: QualityFlag[];
}
