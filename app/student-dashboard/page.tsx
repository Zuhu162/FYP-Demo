'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Settings, LogOut } from 'lucide-react'

export default function StudentDashboardPage() {
  const [meetingCode, setMeetingCode] = useState('')
  const router = useRouter()

  const handleJoinExam = () => {
    if (meetingCode) {
      router.push(`/exam-session?code=${meetingCode}&role=student`)
    }
  }

  const handleLogout = () => {
    // Here you would handle logout logic
    router.push('/login')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, Student</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Join Exam</CardTitle>
          <CardDescription>Enter the meeting code provided by your proctor to join the exam.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="meeting-code"
                placeholder="Enter meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#800020] hover:bg-[#600018]" onClick={handleJoinExam}>Join Exam</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

