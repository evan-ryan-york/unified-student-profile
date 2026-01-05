import { UnifiedStudentView } from '@/components/UnifiedStudentView';

interface StudentPageProps {
  params: Promise<{ studentId: string }>;
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { studentId } = await params;
  return <UnifiedStudentView studentId={studentId} />;
}

export function generateStaticParams() {
  return [
    { studentId: 'jessica-santiago' },
    { studentId: 'student-a-new' },
    { studentId: 'student-b-low-gpa' },
    { studentId: 'student-c-missed' },
    { studentId: 'student-d-active' },
    { studentId: 'student-e-borderline' },
  ];
}
