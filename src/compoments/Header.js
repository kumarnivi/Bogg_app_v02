import Link from "next/link"
import Image from "next/image"


export default function Header() {
    return (
        <header className="bg-[#c6c6c9] shadow-lg fixed top-0 w-full z-1000">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <Image 
                    src="/images/logImg.png"  // path relative to /public
                    width={35}               // required
                    height={50}               // required
                    alt="Logo"
                    className="object-cover"
                />
                <nav className="space-x-4">
                    <Link href="/" className="text-blue-500">Home</Link>
                    <Link href="./about" className="text-blue-500">About</Link>
                    <Link href="./contact" className="text-blue-500">Contact</Link>
                </nav>
            </div>
        </header>
    )
}