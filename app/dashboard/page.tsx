"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, LogIn, ClipboardList, Settings, LogOut } from "lucide-react";

export default function DashboardPage() {
  const [examCode, setExamCode] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    // Here you would handle logout logic
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proctor Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Exam</CardTitle>
            <CardDescription>Set up a new exam session</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Start a new exam proctoring session with custom settings.</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/create-exam" passHref>
              <Button className="w-full bg-[#800020] hover:bg-[#600018]">
                <Plus className="mr-2 h-4 w-4" /> Create Exam
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Join Existing Exam</CardTitle>
            <CardDescription>Enter an exam code to join</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter exam code"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#800020] hover:bg-[#600018]"
              disabled={!examCode}
              onClick={() =>
                router.push(`/exam-session?code=${examCode}&role=proctor`)
              }>
              <LogIn className="mr-2 h-4 w-4" /> Join Exam
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Previous Exam Logs</CardTitle>
            <CardDescription>View logs from past exams</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span>Exam {i + 1}</span>
                  <Button variant="outline" size="sm">
                    View Log
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/exam-logs" passHref>
              <Button variant="outline" className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" /> View All Logs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
