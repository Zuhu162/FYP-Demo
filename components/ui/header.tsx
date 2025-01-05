import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-[#800020] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UTM-HhIsmt7TLWA37MbFo9DDX68LaoEr6x.png"
              alt="UTM Logo"
              width={300}
              height={75}
              priority
              className="h-10 w-auto"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
