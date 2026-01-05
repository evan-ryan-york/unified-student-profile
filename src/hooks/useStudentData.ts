'use client';

import { useMemo } from 'react';
import { getStudentData, defaultStudentId } from '@/lib/mockData';
import type {
  Student,
  StudentProfile,
  Milestone,
  Task,
  SuggestedAction,
  SmartGoal,
  AlmaSnapshot,
  Bookmark,
  Recommendation,
  StudentWork,
  ActivityItem,
  AIReflection,
  QualityFlag,
  StudentData,
} from '@/types/student';

/**
 * Hook to get complete student data bundle.
 */
export function useStudentData(studentId: string = defaultStudentId): StudentData | null {
  return useMemo(() => getStudentData(studentId), [studentId]);
}

/**
 * Hook to get basic student info.
 */
export function useStudent(studentId: string = defaultStudentId): Student | null {
  const data = useStudentData(studentId);
  return data?.student ?? null;
}

/**
 * Hook to get student profile.
 */
export function useStudentProfile(studentId: string = defaultStudentId): StudentProfile | null {
  const data = useStudentData(studentId);
  return data?.profile ?? null;
}

/**
 * Hook to get student milestones.
 */
export function useMilestones(studentId: string = defaultStudentId): Milestone[] {
  const data = useStudentData(studentId);
  return data?.milestones ?? [];
}

/**
 * Hook to get student tasks.
 */
export function useTasks(studentId: string = defaultStudentId): Task[] {
  const data = useStudentData(studentId);
  return data?.tasks ?? [];
}

/**
 * Hook to get filtered tasks by status.
 */
export function useFilteredTasks(
  studentId: string = defaultStudentId,
  status: 'open' | 'completed'
): Task[] {
  const tasks = useTasks(studentId);
  return useMemo(() => tasks.filter(t => t.status === status), [tasks, status]);
}

/**
 * Hook to get suggested actions.
 */
export function useSuggestedActions(studentId: string = defaultStudentId): SuggestedAction[] {
  const data = useStudentData(studentId);
  return data?.suggestedActions ?? [];
}

/**
 * Hook to get pending suggested actions.
 */
export function usePendingSuggestedActions(studentId: string = defaultStudentId): SuggestedAction[] {
  const actions = useSuggestedActions(studentId);
  return useMemo(() => actions.filter(a => a.status === 'pending'), [actions]);
}

/**
 * Hook to get SMART goals.
 */
export function useSmartGoals(studentId: string = defaultStudentId): SmartGoal[] {
  const data = useStudentData(studentId);
  return data?.smartGoals ?? [];
}

/**
 * Hook to get filtered SMART goals by status.
 */
export function useFilteredSmartGoals(
  studentId: string = defaultStudentId,
  status: 'active' | 'completed' | 'archived'
): SmartGoal[] {
  const goals = useSmartGoals(studentId);
  return useMemo(() => goals.filter(g => g.status === status), [goals, status]);
}

/**
 * Hook to get Alma snapshot.
 */
export function useAlmaSnapshot(studentId: string = defaultStudentId): AlmaSnapshot | null {
  const data = useStudentData(studentId);
  return data?.almaSnapshot ?? null;
}

/**
 * Hook to get bookmarks.
 */
export function useBookmarks(studentId: string = defaultStudentId): Bookmark[] {
  const data = useStudentData(studentId);
  return data?.bookmarks ?? [];
}

/**
 * Hook to get filtered bookmarks by type.
 */
export function useFilteredBookmarks(
  studentId: string = defaultStudentId,
  type: 'career' | 'school' | 'program'
): Bookmark[] {
  const bookmarks = useBookmarks(studentId);
  return useMemo(() => bookmarks.filter(b => b.type === type), [bookmarks, type]);
}

/**
 * Hook to get recommendations.
 */
export function useRecommendations(studentId: string = defaultStudentId): Recommendation[] {
  const data = useStudentData(studentId);
  return data?.recommendations ?? [];
}

/**
 * Hook to get filtered recommendations by type.
 */
export function useFilteredRecommendations(
  studentId: string = defaultStudentId,
  type: 'career' | 'school' | 'program'
): Recommendation[] {
  const recommendations = useRecommendations(studentId);
  return useMemo(() => recommendations.filter(r => r.type === type), [recommendations, type]);
}

/**
 * Hook to get student work items.
 */
export function useStudentWork(studentId: string = defaultStudentId): StudentWork[] {
  const data = useStudentData(studentId);
  return data?.studentWork ?? [];
}

/**
 * Hook to get activity history.
 */
export function useActivityHistory(studentId: string = defaultStudentId): ActivityItem[] {
  const data = useStudentData(studentId);
  const activities = data?.activityHistory ?? [];

  // Sort by createdAt descending (most recent first)
  return useMemo(() =>
    [...activities].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [activities]
  );
}

/**
 * Hook to get AI reflections.
 */
export function useAIReflections(studentId: string = defaultStudentId): AIReflection[] {
  const data = useStudentData(studentId);
  const reflections = data?.aiReflections ?? [];

  // Sort by createdAt descending (most recent first)
  return useMemo(() =>
    [...reflections].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [reflections]
  );
}

/**
 * Hook to get paginated AI reflections.
 */
export function usePaginatedAIReflections(
  studentId: string = defaultStudentId,
  page: number = 1,
  pageSize: number = 10
): { reflections: AIReflection[]; totalPages: number; total: number } {
  const allReflections = useAIReflections(studentId);

  return useMemo(() => {
    const total = allReflections.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const reflections = allReflections.slice(startIndex, startIndex + pageSize);

    return { reflections, totalPages, total };
  }, [allReflections, page, pageSize]);
}

/**
 * Hook to get quality flags.
 */
export function useQualityFlags(studentId: string = defaultStudentId): QualityFlag[] {
  const data = useStudentData(studentId);
  return data?.qualityFlags ?? [];
}
