'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Upload } from 'lucide-react'
import TimeSettingModal from './TimeSettingModal'
import { useExam } from '../../contexts/ExamContext'

export default function CreateExamPage() {
  const [step, setStep] = useState(1)
  const [examName, setExamName] = useState('')
  const [examDescription, setExamDescription] = useState('')
  const [examDuration, setExamDuration] = useState(60) // Default 60 minutes
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [questionPaper, setQuestionPaper] = useState<File | null>(null)
  const [allowedEmails, setAllowedEmails] = useState('')
  const [meetingCode, setMeetingCode] = useState('')
  const router = useRouter()
  const { setExamData } = useExam()

  const handleExamDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!examName || !examDescription || !questionPaper) {
      alert('Please fill in all required fields and upload a question paper.')
      return
    }
    setStep(2)
    generateMeetingCode()
  }

  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setMeetingCode(code)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setQuestionPaper(file)
    } else {
      alert('Please upload a PDF file')
      e.target.value = ''
    }
  }

  const handleCreateExam = () => {
    const examData = {
      name: examName,
      description: examDescription,
      duration: examDuration,
      meetingCode,
      allowedEmails,
      questionPaper
    }
    setExamData(examData)
    router.push(`/exam-session?code=${meetingCode}&role=proctor`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Exam</h1>
      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Set the basic information for the exam</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExamDetailsSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="exam-name">Exam Name</Label>
                <Input 
                  id="exam-name" 
                  value={examName} 
                  onChange={(e) => setExamName(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="exam-description">Exam Description</Label>
                <Textarea 
                  id="exam-description" 
                  value={examDescription} 
                  onChange={(e) => setExamDescription(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Exam Duration</Label>
                <div className="flex items-center space-x-2">
                  <Input value={`${examDuration} minutes`} readOnly />
                  <Button variant="outline" onClick={() => setShowTimeModal(true)}>
                    <Clock className="mr-2 h-4 w-4" /> Set Time
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="question-paper">Upload Question Paper</Label>
                <Input 
                  id="question-paper" 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileUpload}
                  required
                />
              </div>
              <Button type="submit">Next</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Exam Settings</CardTitle>
            <CardDescription>Configure additional settings for the exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="allowed-emails">Allowed Email Addresses</Label>
              <Textarea
                id="allowed-emails"
                placeholder="Enter email addresses, one per line"
                value={allowedEmails}
                onChange={(e) => setAllowedEmails(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="meeting-code">Meeting Code</Label>
              <Input id="meeting-code" value={meetingCode} readOnly />
            </div>
            <Button onClick={handleCreateExam}>Create Exam</Button>
          </CardContent>
        </Card>
      )}
      <TimeSettingModal
        isOpen={showTimeModal}
        onClose={() => setShowTimeModal(false)}
        duration={examDuration}
        onSave={(newDuration) => {
          setExamDuration(newDuration)
          setShowTimeModal(false)
        }}
      />
    </div>
  )
}

