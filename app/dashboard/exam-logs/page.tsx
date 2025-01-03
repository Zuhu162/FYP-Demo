'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

interface ExamLog {
  id: number
  title: string
  date: string
  participants: number
  flaggedExaminees: number
}

const mockExamLogs: ExamLog[] = [
  { id: 1, title: "Mathematics Final Exam", date: "2023-06-01 10:00", participants: 50, flaggedExaminees: 3 },
  { id: 2, title: "Physics Midterm", date: "2023-05-15 14:00", participants: 40, flaggedExaminees: 1 },
  { id: 3, title: "Computer Science Quiz", date: "2023-05-10 09:00", participants: 30, flaggedExaminees: 0 },
]

export default function ExamLogsPage() {
  const [examLogs] = useState<ExamLog[]>(mockExamLogs)
  const router = useRouter()

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <h1 className="text-2xl font-bold mb-6">Previous Exam Logs</h1>
      <div className="grid gap-4">
        {examLogs.map((log) => (
          <Card key={log.id}>
            <CardHeader>
              <CardTitle>{log.title}</CardTitle>
              <p className="text-sm text-gray-500">{log.date}</p>
            </CardHeader>
            <CardContent>
              <p><strong>Participants:</strong> {log.participants}</p>
              <p><strong>Flagged Examinees:</strong> {log.flaggedExaminees}</p>
              <Button className="mt-2" onClick={() => router.push(`/dashboard/exam-logs/${log.id}`)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

