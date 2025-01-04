import './globals.css'
import { Inter } from 'next/font/google'
import { ExamProvider } from './contexts/ExamContext'
import { Header } from '@/components/ui/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UTMExamGuard',
  description: 'Online exam proctoring system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ExamProvider>
          {children}
        </ExamProvider>
      </body>
    </html>
  )
}

