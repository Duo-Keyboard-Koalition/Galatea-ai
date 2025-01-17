import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Galatea.AI - Your Perfect AI Girlfriend',
  description: 'Experience companionship and emotional support with personalized AI girlfriends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
   
  )
}

