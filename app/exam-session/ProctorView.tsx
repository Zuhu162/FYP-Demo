'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send, FileText, MoreVertical } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useExam } from '../contexts/ExamContext'

interface ProctorViewProps {
  meetingCode: string
}

interface Student {
  id: number
  name: string
  email: string
  imageUrl: string
}

export default function ProctorView({ meetingCode }: ProctorViewProps) {
  const { examData } = useExam()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [remainingTime, setRemainingTime] = useState(examData?.duration ? examData.duration * 60 : 3600)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showEndConfirmation, setShowEndConfirmation] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [questionPaperUrl, setQuestionPaperUrl] = useState<string | null>(null)
  const router = useRouter()

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", email: "alice@utm.my", imageUrl: "/placeholder.svg?1" },
    { id: 2, name: "Bob Smith", email: "bob@utm.my", imageUrl: "/placeholder.svg?2" },
    { id: 3, name: "Charlie Brown", email: "charlie@utm.my", imageUrl: "/placeholder.svg?3" },
    { id: 4, name: "Diana Lee", email: "diana@utm.my", imageUrl: "/placeholder.svg?4" },
  ])

  useEffect(() => {
    if (examData?.questionPaper) {
      const fileUrl = URL.createObjectURL(examData.questionPaper)
      setQuestionPaperUrl(fileUrl)
    }

    return () => {
      if (questionPaperUrl) {
        URL.revokeObjectURL(questionPaperUrl)
      }
    }
  }, [examData])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleEndMeeting = () => {
    router.push('/dashboard')
  }

  const handleRemoveStudent = (studentId: number) => {
    setStudents(students.filter(student => student.id !== studentId))
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Proctor', content: newMessage.trim() }])
      setNewMessage('')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-3">
      <main className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsVideoOn(!isVideoOn)}>
              {isVideoOn ? <Video /> : <VideoOff />}
            </Button>
            <Button variant="destructive" size="icon" onClick={() => setShowEndConfirmation(true)}>
              <PhoneOff />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              {formatTime(remainingTime)}
            </div>
            <div className="text-lg font-semibold">
              Meeting Code: {meetingCode}
            </div>
          </div>
        </div>
        <Tabs defaultValue="students" className="flex-grow">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="question-paper">Question Paper</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="h-full">
            <div className="grid grid-cols-2 gap-4 h-full">
              {students.map((student) => (
                <Card key={student.id} className="relative">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-200 mb-2 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedStudent(student)}>
                      <Image src={student.imageUrl} alt={`${student.name}'s video feed`} width={320} height={180} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleRemoveStudent(student.id)}>
                            Remove from exam
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="question-paper" className="h-full">
            <Card className="h-full">
              <CardContent className="p-4 h-full">
                {questionPaperUrl ? (
                  <iframe src={questionPaperUrl} className="w-full h-full" />
                ) : (
                  <p>No question paper available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs></main>
      <aside className="w-80 bg-white p-4 flex flex-col">
        <Tabs defaultValue="chat" className="flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow">
              <div className="space-y-4 p-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-2 overflow-y-auto">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="participants">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Proctor" />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Proctor</p>
                    <p className="text-sm text-gray-500">You</p>
                  </div>
                </div>
                {students.map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={student.imageUrl} alt={student.name} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <Button className="mt-4" onClick={() => router.push('/reports')}>
          <FileText className="mr-2 h-4 w-4" /> View Reports
        </Button>
      </aside>

      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedStudent?.name}</DialogTitle>
            <DialogDescription>{selectedStudent?.email}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <Image 
              src={selectedStudent?.imageUrl || '/placeholder.svg'} 
              alt={`${selectedStudent?.name}'s video feed`} 
              width={640} 
              height={360} 
              className="w-full h-full object-cover" 
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEndConfirmation} onOpenChange={setShowEndConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Meeting</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this exam session? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndConfirmation(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleEndMeeting}>End Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

