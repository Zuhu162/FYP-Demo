'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ExamData {
  name: string
  description: string
  duration: number
  meetingCode: string
  allowedEmails: string
  questionPaper: File | null
}

interface ExamContextType {
  examData: ExamData | null
  setExamData: React.Dispatch<React.SetStateAction<ExamData | null>>
}

const ExamContext = createContext<ExamContextType | undefined>(undefined)

export function ExamProvider({ children }: { children: ReactNode }) {
  const [examData, setExamData] = useState<ExamData | null>(null)

  return (
    <ExamContext.Provider value={{ examData, setExamData }}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExam() {
  const context = useContext(ExamContext)
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return context
}

