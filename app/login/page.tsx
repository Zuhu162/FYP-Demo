"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (role: "proctor" | "student") => {
    // Here you would typically handle authentication
    if (role === "proctor") {
      router.push("/dashboard");
    } else {
      router.push("/student-dashboard");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UTM-HhIsmt7TLWA37MbFo9DDX68LaoEr6x.png"
            alt="UTM Logo"
            width={200}
            height={50}
            priority
            className="mb-4"
          />
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the exam system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="proctor">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="proctor">Proctor</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            <TabsContent value="proctor">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin("proctor");
                }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proctor-email">Email</Label>
                    <Input
                      id="proctor-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proctor-password">Password</Label>
                    <Input
                      id="proctor-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#800020] hover:bg-[#600018]">
                    Login as Proctor
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="student">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin("student");
                }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#800020] hover:bg-[#600018]">
                    Login as Student
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
