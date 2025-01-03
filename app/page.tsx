import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>UTMExamGuard</CardTitle>
          <CardDescription>Click Login to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/login" passHref>
            <Button className="w-full">Proceed to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

