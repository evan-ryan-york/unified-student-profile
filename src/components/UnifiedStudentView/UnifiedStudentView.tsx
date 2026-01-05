'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { AppLayout } from '@/components/AppLayout';
import { StudentHeader } from '@/components/StudentHeader';
import { TabNavigation } from '@/components/TabNavigation';
import { OverviewTab } from '@/components/Overview';
import { ProfileTab } from '@/components/Profile';
import { PostsecondaryTab } from '@/components/Postsecondary';
import { StudentWorkTab } from '@/components/StudentWork';
import { MeetingsTab } from '@/components/Meetings';
import { LoadingSection } from '@/components/shared';
import { AlmaChatPanel } from '@/components/AlmaChatPanel';
import { useStudentData } from '@/hooks/useStudentData';
import type { TabType } from '@/types/student';

interface UnifiedStudentViewProps {
  studentId: string;
}

export function UnifiedStudentView({ studentId }: UnifiedStudentViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isGeneratingSnapshot, setIsGeneratingSnapshot] = useState(false);

  const studentData = useStudentData(studentId);

  // Handle loading state
  if (!studentData) {
    return (
      <AppLayout>
        <Box sx={{ backgroundColor: '#FBFBFB', minHeight: '100vh' }}>
          <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #D5D7DA', px: 4, py: 3 }}>
            <LoadingSection variant="card" />
          </Box>
          <Box sx={{ p: 3 }}>
            <LoadingSection variant="grid" rows={6} />
          </Box>
        </Box>
      </AppLayout>
    );
  }

  const {
    student,
    profile,
    milestones,
    tasks,
    suggestedActions,
    smartGoals,
    almaSnapshot,
    bookmarks,
    recommendations,
    studentWork,
    activityHistory,
    aiReflections,
  } = studentData;

  const handleScheduleMeeting = () => {
    console.log('Schedule meeting clicked');
  };

  const handleGenerateSnapshot = () => {
    setIsGeneratingSnapshot(true);
    // Simulate snapshot generation
    setTimeout(() => {
      setIsGeneratingSnapshot(false);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            milestones={milestones}
            smartGoals={smartGoals}
            almaSnapshot={almaSnapshot}
            onGenerateSnapshot={handleGenerateSnapshot}
            isGeneratingSnapshot={isGeneratingSnapshot}
          />
        );
      case 'profile':
        return <ProfileTab student={student} profile={profile} />;
      case 'postsecondary':
        return (
          <PostsecondaryTab
            bookmarks={bookmarks}
            recommendations={recommendations}
          />
        );
      case 'student-work':
        return (
          <StudentWorkTab
            reflections={aiReflections}
            works={studentWork}
          />
        );
      case 'meetings':
        return (
          <MeetingsTab
            activities={activityHistory}
          />
        );
      default:
        return null;
    }
  };

  const handleTaskToggle = (task: typeof tasks[0]) => {
    console.log('Task toggled:', task.title);
  };

  const handleNewTask = () => {
    console.log('New task clicked');
  };

  const handleActionAccept = (action: typeof suggestedActions[0]) => {
    console.log('Action accepted:', action.title);
  };

  const handleActionDismiss = (action: typeof suggestedActions[0]) => {
    console.log('Action dismissed:', action.title);
  };

  return (
    <AppLayout
      rightPanel={
        <AlmaChatPanel
          studentFirstName={student.firstName}
          tasks={tasks}
          suggestedActions={suggestedActions}
          onTaskToggle={handleTaskToggle}
          onNewTask={handleNewTask}
          onActionAccept={handleActionAccept}
          onActionDismiss={handleActionDismiss}
        />
      }
      currentStudentId={studentId}
    >
      <Box
        sx={{
          backgroundColor: '#FBFBFB',
          minHeight: '100vh',
        }}
      >
        {/* Student Header */}
        <StudentHeader
          student={student}
          onScheduleMeeting={handleScheduleMeeting}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <Box sx={{ backgroundColor: '#FBFBFB' }}>
          {renderTabContent()}
        </Box>
      </Box>
    </AppLayout>
  );
}

export default UnifiedStudentView;
