'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Clock } from 'lucide-react'

export default function StudentView() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [remainingTime, setRemainingTime] = useState(3600) // 1 hour in seconds
  const [isTabFocused, setIsTabFocused] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    const handleVisibilityChange = () => {
      setIsTabFocused(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-white border rounded-lg mb-4 p-4">
            {isTabFocused ? (
              <ScrollArea className="h-full">
                <h2 className="text-xl font-bold mb-4">Exam Questions</h2>
                <p>
                  This is where the exam questions would be displayed. The content here will be
                  populated with the actual exam questions uploaded by the proctor.
                </p>
                {/* Add more question content as needed */}
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500 font-bold">Question paper hidden. Please return focus to this tab.</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
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
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{formatTime(remainingTime)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Proctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-black mb-4 rounded-lg flex items-center justify-center">
            <p className="text-white">Proctor's video feed</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Proctor Name</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

