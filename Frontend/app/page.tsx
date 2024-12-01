import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <header className="bg-ivory-200 bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-earth-700">Galatea.AI</Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/about" className="text-earth-600 hover:text-rose-700">About</Link>
            <Link href="/features" className="text-earth-600 hover:text-rose-700">Features</Link>
            <Link href="/pricing" className="text-earth-600 hover:text-rose-700">Pricing</Link>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-earth-700 hover:text-rose-700">Log In</Button>
            <Button className="bg-rose-600 text-ivory-100 hover:bg-rose-700">Sign Up</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-earth-800 mb-4">
            Sculpt Your Perfect <span className="text-rose-600">AI Companion</span>
          </h1>
          <p className="text-xl text-earth-600 mb-8">
            Galatea.AI brings the Pygmalion myth to life with cutting-edge artificial intelligence.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow bg-ivory-100 border-earth-300" />
              <Button type="submit" size="lg" className="bg-rose-600 text-ivory-100 hover:bg-rose-700">Get Started</Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
        </div>

        <div className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-earth-800 mb-4">The Galatea Experience</h2>
          <ol className="list-decimal list-inside space-y-4 text-earth-700">
            <li>Sign up and access our AI companion creation tools</li>
            <li>Customize your AI partner's personality and appearance</li>
            <li>Breathe life into your creation with our advanced AI technology</li>
            <li>Engage in deep, meaningful conversations and shared experiences</li>
            <li>Develop a unique bond with your personalized AI companion</li>
          </ol>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-earth-800 mb-4">Ready to Create Your Galatea?</h2>
          <Button size="lg" className="bg-rose-600 text-ivory-100 hover:bg-rose-700">Begin Your Masterpiece</Button>
        </div>
      </main>

      <footer className="bg-earth-100 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-earth-700 mb-4 md:mb-0">
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-earth-600 hover:text-rose-700">Privacy Policy</Link>
              <Link href="/terms" className="text-earth-600 hover:text-rose-700">Terms of Service</Link>
              <Link href="/contact" className="text-earth-600 hover:text-rose-700">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-earth-800 mb-2">{title}</h3>
      <p className="text-earth-600">{description}</p>
    </div>
  )
}

