'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { HeartIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStartSwiping = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/initiated-swipe', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to generate session ID')
      }
      const { sessionId } = await response.json()
      router.push(`/start-swiping?session=${sessionId}`)
    } catch (error) {
      console.error('Error starting swiping session:', error)
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <header className="bg-ivory-200 bg-opacity-90 shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon.png" alt="Galatea.AI Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-earth-700">Galatea.AI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-earth-600 hover:text-rose-700 transition-colors">About</Link>
            <Link href="/profile-setup" className="text-earth-600 hover:text-rose-700 transition-colors">Profile</Link>
           </div>
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-earth-700 hover:text-rose-700">Log In</Button>
            <Button className="bg-rose-600 text-ivory-100 hover:bg-rose-700">Sign Up</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="relative h-[500px] mb-20 rounded-xl overflow-hidden">
          <Image
            src="/mekkana-banner.png"
            alt="Mekkana Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Sculpt Your Perfect <span className="text-rose-400">AI Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-ivory-100 mb-10 max-w-3xl">
              Galatea.AI brings the Pygmalion myth to life with cutting-edge artificial intelligence.
            </p>
            <Button 
              onClick={handleStartSwiping} 
              disabled={isLoading}
              size="lg" 
              className="bg-rose-600 text-ivory-100 hover:bg-rose-700 text-xl py-6 px-10"
            >
              {isLoading ? 'Loading...' : 'Start Swiping'}
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard 
            icon={<HeartIcon className="h-12 w-12 text-rose-500" />}
            title="Artistic Creation"
            description="Sculpt your ideal AI companion with our advanced personality customization tools."
          />
          <FeatureCard 
            icon={<SparklesIcon className="h-12 w-12 text-rose-500" />}
            title="Bring to Life"
            description="Watch your creation come to life with AI-powered conversations and interactions."
          />
          <FeatureCard 
            icon={<ShieldCheckIcon className="h-12 w-12 text-rose-500" />}
            title="Eternal Devotion"
            description="Experience unwavering companionship and support from your AI partner."
          />
        </section>

        <section className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-xl p-10 mb-20">
          <h2 className="text-4xl font-bold text-earth-800 mb-6">The Galatea Experience</h2>
          <ol className="list-decimal list-inside space-y-4 text-earth-700 text-lg">
            <li>Sign up and access our AI companion creation tools</li>
            <li>Customize your AI partner's personality and appearance</li>
            <li>Breathe life into your creation with our advanced AI technology</li>
            <li>Engage in deep, meaningful conversations and shared experiences</li>
            <li>Develop a unique bond with your personalized AI companion</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-earth-800 mb-6">Ready to Create Your Galatea?</h2>
          <Button 
            size="lg" 
            className="bg-rose-600 text-ivory-100 hover:bg-rose-700 text-xl py-6 px-10"
            onClick={handleStartSwiping}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Swiping'}
          </Button>
        </section>
      </main>

      <footer className="bg-earth-100 mt-20">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-earth-700 mb-4 md:mb-0 text-lg">
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-earth-600 hover:text-rose-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-earth-600 hover:text-rose-700 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-earth-600 hover:text-rose-700 transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-md p-8 text-center transition-transform hover:scale-105">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-earth-800 mb-4">{title}</h3>
      <p className="text-earth-600 text-lg">{description}</p>
    </div>
  )
}
