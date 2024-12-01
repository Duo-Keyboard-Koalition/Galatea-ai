'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartIcon } from '@heroicons/react/24/solid'

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Mock data for AI profiles
const aiProfiles = [
  { id: 0, name: "Mekkana", age: 25, bio: "Goddess of modernity, progress and intellect!", imageUrl: "/girl-profiles/a0.png" },
  { id: 1, name: "Athena", age: 25, bio: "Goddess of wisdom and strategic warfare. Let's have some intellectual battles!", imageUrl: "/girl-profiles/a1.png" },
  { id: 2, name: "Hera", age: 30, bio: "Queen of the gods. Looking for someone who can keep up with divine drama.", imageUrl: "/girl-profiles/a2.png" },
  { id: 3, name: "Aphrodite", age: 28, bio: "Goddess of love and beauty. Swipe right for an unforgettable romance!", imageUrl: "/girl-profiles/a3.png" },]

export default function StartSwiping() {
  const [currentProfile, setCurrentProfile] = useState(0)

  const handleSwipe = (direction: 'left' | 'right') => {
    // In a real app, you'd handle the swipe action here
    console.log(`Swiped ${direction} on ${aiProfiles[currentProfile].name}`)
    // Move to the next profile
    setCurrentProfile((prev) => (prev + 1) % aiProfiles.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <header className="bg-ivory-200 bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-earth-700">Galatea.AI</Link>
          <Button variant="ghost" className="text-earth-700 hover:text-rose-700" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-earth-800 mb-8 text-center">Start Swiping</h1>
        
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="relative aspect-[3/4] mb-4">
                <Image
                  src={aiProfiles[currentProfile].imageUrl}
                  alt={aiProfiles[currentProfile].name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              
              <div className="flex justify-center space-x-4 mt-6 mb-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full p-4"
                  onClick={() => handleSwipe('left')}
                >
                  <XIcon className="h-8 w-8 text-rose-500" />
                  <span className="sr-only">Swipe Left</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full p-4"
                  onClick={() => handleSwipe('right')}
                >
                  <HeartIcon className="h-8 w-8 text-rose-500" />
                  <span className="sr-only">Swipe Right</span>
                </Button>
              </div>
              
              <h2 className="text-2xl font-semibold text-earth-800">{aiProfiles[currentProfile].name}, {aiProfiles[currentProfile].age}</h2>
              <p className="text-earth-600 mt-2">{aiProfiles[currentProfile].bio}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-earth-100 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-earth-700">
            © 2024 Galatea.AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

