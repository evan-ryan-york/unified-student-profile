import { redirect } from 'next/navigation';
import { defaultStudentId } from '@/lib/mockData';

export default function Home() {
  // Redirect to the default student (Jessica Santiago)
  redirect(`/students/${defaultStudentId}`);
}
