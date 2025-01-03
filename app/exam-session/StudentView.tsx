'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import { Input } from "@/components/ui/input"

const blurEffect = "filter blur-md transition-all duration-300"

interface StudentViewProps {
  meetingCode: string
}

export default function StudentView({ meetingCode }: StudentViewProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [remainingTime, setRemainingTime] = useState(3600) // 1 hour in seconds
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([])
  const [newMessage, setNewMessage] = useState('')

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

  const toggleVideo = () => {
    if (isVideoOn) {
      if (confirm("Turning off your video will blur the exam questions. Are you sure you want to proceed?")) {
        setIsVideoOn(false);
      }
    } else {
      setIsVideoOn(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Student', content: newMessage.trim() }])
      setNewMessage('')
      // Here you would typically send the message to a backend service
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleVideo}>
              {isVideoOn ? <Video /> : <VideoOff />}
            </Button>
            <Button variant="destructive" size="icon">
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
        <div className="flex flex-1 space-x-4">
          <Card className={`flex-1 ${!isVideoOn ? blurEffect : ''}`}>
            <CardContent className="p-4">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Exam Questions</h2>
                  <p className="text-lg font-semibold">1. What is the capital of France?</p>
                  <p>Please provide a detailed answer explaining why this city is the capital and its historical significance.</p>
                  
                  <p className="text-lg font-semibold mt-6">2. Explain the process of photosynthesis.</p>
                  <p>Describe the main steps involved in photosynthesis and the importance of this process for plants and the ecosystem.</p>
                  
                  <p className="text-lg font-semibold mt-6">3. Solve the equation: 2x + 5 = 15</p>
                  <p>Show your work step by step and explain your reasoning for each step.</p>
                  
                  <p className="text-lg font-semibold mt-6">4. Discuss the major themes in Shakespeare's "Hamlet".</p>
                  <p>Analyze at least three major themes in the play and provide examples from the text to support your analysis.</p>
                  
                  <p className="text-lg font-semibold mt-6">5. Describe the structure and function of DNA.</p>
                  <p>Explain the double helix structure of DNA and how it relates to its function in genetic inheritance and protein synthesis.</p>

                  <p className="text-lg font-semibold mt-6">6. Explain the SOLID principles in software design.</p>
                  <p>Describe each principle and provide an example of how it can be applied in object-oriented programming.</p>

                  <p className="text-lg font-semibold mt-6">7. Compare and contrast microservices architecture with monolithic architecture.</p>
                  <p>Discuss the advantages and disadvantages of each approach, and provide scenarios where one might be preferred over the other.</p>

                  <p className="text-lg font-semibold mt-6">8. Describe the Model-View-Controller (MVC) architectural pattern.</p>
                  <p>Explain the responsibilities of each component and how they interact with each other. Provide an example of how MVC can be implemented in a web application.</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="w-64">
            <CardContent className="p-4">
              <Tabs defaultValue="video">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="video">
                  <div className="aspect-video bg-black mb-4 rounded-lg flex items-center justify-center">
                    <p className="text-white">Proctor's video feed</p>
                  </div>
                  <p className="text-center font-semibold">Proctor</p>
                </TabsContent>
                <TabsContent value="chat" className="h-[300px] flex flex-col">
                  <ScrollArea className="flex-grow mb-4">
                    {messages.map((message, index) => (
                      <div key={index} className="flex items-start space-x-2 mb-2">
                        <Avatar>
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-lg p-2">
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

