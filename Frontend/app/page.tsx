import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100">
      <header className="bg-white bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-pink-600">Galatea.AI</Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/about" className="text-gray-700 hover:text-pink-600">About</Link>
            <Link href="/features" className="text-gray-700 hover:text-pink-600">Features</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-pink-600">Pricing</Link>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Find Your Perfect Match with <span className="text-pink-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Galatea.AI uses cutting-edge artificial intelligence to connect hearts and minds.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit" size="lg">Get Started</Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={<HeartIcon className="h-12 w-12 text-pink-500" />}
            title="Intelligent Matching"
            description="Our AI analyzes your preferences and personality to find your ideal partner."
          />
          <FeatureCard 
            icon={<SparklesIcon className="h-12 w-12 text-pink-500" />}
            title="Spark Conversations"
            description="AI-powered conversation starters to break the ice and make meaningful connections."
          />
          <FeatureCard 
            icon={<ShieldCheckIcon className="h-12 w-12 text-pink-500" />}
            title="Safe and Secure"
            description="Advanced security measures to ensure your privacy and safety while dating."
          />
        </div>

        <div className="bg-white bg-opacity-70 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>Sign up and create your profile</li>
            <li>Our AI analyzes your preferences and personality</li>
            <li>Receive tailored matches based on compatibility</li>
            <li>Start conversations with AI-assisted ice breakers</li>
            <li>Meet your perfect match and start your love story</li>
          </ol>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Love?</h2>
          <Button size="lg">Start Your Journey</Button>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-700 mb-4 md:mb-0">
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-gray-700 hover:text-pink-600">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-700 hover:text-pink-600">Terms of Service</Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-600">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white bg-opacity-70 rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

