'use client'

import { useSearchParams } from 'next/navigation'
import ProctorView from './ProctorView'
import StudentView from './StudentView'

export default function ExamSessionPage() {
  const searchParams = useSearchParams()
  const meetingCode = searchParams.get('code')
  const role = searchParams.get('role')

  return role === 'student' ? (
    <StudentView meetingCode={meetingCode || ''} />
  ) : (
    <ProctorView meetingCode={meetingCode || ''} />
  )
}

