'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Upload, Clock, AlertTriangle } from 'lucide-react'

export default function ProctorView() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [meetingLink, setMeetingLink] = useState('')
  const [examRules, setExamRules] = useState({
    duration: 60,
    allowBreaks: false,
    requireConstantVideo: true,
  })

  const generateMeetingLink = () => {
    const link = `https://exam.university.edu/${Math.random().toString(36).substr(2, 9)}`
    setMeetingLink(link)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Exam Proctoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-black mb-4 rounded-lg flex items-center justify-center">
            <p className="text-white">Proctor's video feed</p>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsVideoOn(!isVideoOn)}>
              {isVideoOn ? <Video /> : <VideoOff />}
            </Button>
            <Button variant="destructive" size="icon">
              <PhoneOff />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meeting-link">Meeting Link</Label>
              <div className="flex space-x-2">
                <Input id="meeting-link" value={meetingLink} readOnly />
                <Button onClick={generateMeetingLink}>Generate</Button>
              </div>
            </div>
            <div>
              <Label htmlFor="question-paper">Upload Question Paper</Label>
              <div className="flex space-x-2">
                <Input id="question-paper" type="file" />
                <Button><Upload className="mr-2 h-4 w-4" /> Upload</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Exam Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="exam-duration">Exam Duration (minutes)</Label>
              <Input
                id="exam-duration"
                type="number"
                value={examRules.duration}
                onChange={(e) => setExamRules({...examRules, duration: parseInt(e.target.value)})}
                className="w-20"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allow-breaks"
                checked={examRules.allowBreaks}
                onCheckedChange={(checked) => setExamRules({...examRules, allowBreaks: checked})}
              />
              <Label htmlFor="allow-breaks">Allow Breaks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="require-video"
                checked={examRules.requireConstantVideo}
                onCheckedChange={(checked) => setExamRules({...examRules, requireConstantVideo: checked})}
              />
              <Label htmlFor="require-video">Require Constant Video</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Exam Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="students">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?${i}`} />
                        <AvatarFallback>S{i+1}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Student {i+1}</p>
                        <p className="text-sm text-gray-500">Online</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="reports">
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="flex items-center space-x-4 py-4">
                        <AlertTriangle className="h-10 w-10 text-yellow-500" />
                        <div>
                          <p className="font-medium">Alert for Student {i+1}</p>
                          <p className="text-sm text-gray-500">Face not detected for 30 seconds</p>
                        </div>
                        <Button variant="outline" size="sm">Review</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

