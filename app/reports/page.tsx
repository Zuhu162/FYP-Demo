'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Video, Camera, WifiOff } from 'lucide-react'

interface Report {
  id: number
  studentName: string
  studentEmail: string
  timestamp: string
  flagType: 'video_off' | 'away_from_camera' | 'disconnected'
  duration: string
}

const mockReports: Report[] = [
  { id: 1, studentName: "Alice Johnson", studentEmail: "alice@utm.my", timestamp: "2023-06-01 10:15:30", flagType: 'video_off', duration: "2m 15s" },
  { id: 2, studentName: "Bob Smith", studentEmail: "bob@utm.my", timestamp: "2023-06-01 10:30:45", flagType: 'away_from_camera', duration: "1m 30s" },
  { id: 3, studentName: "Charlie Brown", studentEmail: "charlie@utm.my", timestamp: "2023-06-01 11:05:20", flagType: 'disconnected', duration: "3m 45s" },
]

const getFlagIcon = (flagType: Report['flagType']) => {
  switch (flagType) {
    case 'video_off':
      return <Video className="h-5 w-5 text-yellow-500" />
    case 'away_from_camera':
      return <Camera className="h-5 w-5 text-orange-500" />
    case 'disconnected':
      return <WifiOff className="h-5 w-5 text-red-500" />
  }
}

const getFlagDescription = (flagType: Report['flagType']) => {
  switch (flagType) {
    case 'video_off':
      return 'Video turned off'
    case 'away_from_camera':
      return 'Away from camera'
    case 'disconnected':
      return 'Disconnected from meeting'
  }
}

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports)
  const router = useRouter()

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exam Session
      </Button>
      <h1 className="text-2xl font-bold mb-6">Exam Incident Reports</h1>
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {getFlagIcon(report.flagType)}
                <span className="ml-2">{report.studentName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {report.studentEmail}</p>
              <p><strong>Timestamp:</strong> {report.timestamp}</p>
              <p><strong>Incident:</strong> {getFlagDescription(report.flagType)}</p>
              <p><strong>Duration:</strong> {report.duration}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

