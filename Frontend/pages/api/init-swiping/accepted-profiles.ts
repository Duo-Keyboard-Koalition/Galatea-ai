import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for AI profiles
const mockProfiles = [
  { uuid: '1', name: 'Alice', age: 25, imageUrl: '/placeholder.svg?height=400&width=300' },
  { uuid: '2', name: 'Bob', age: 28, imageUrl: '/placeholder.svg?height=400&width=300' },
  { uuid: '3', name: 'Charlie', age: 23, imageUrl: '/placeholder.svg?height=400&width=300' },
  { uuid: '4', name: 'Diana', age: 27, imageUrl: '/placeholder.svg?height=400&width=300' },
  { uuid: '5', name: 'Eva', age: 26, imageUrl: '/placeholder.svg?height=400&width=300' },
]

// In a real application, you would store this data in a database
const acceptedProfiles: Record<string, string[]> = {}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sessionId = req.query.sessionId as string

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId parameter' })
    }

    // In a real application, you would fetch this data from a database
    const userAcceptedProfileIds = acceptedProfiles[sessionId] || []
    const userAcceptedProfiles = mockProfiles.filter(profile => userAcceptedProfileIds.includes(profile.uuid))

    res.status(200).json(userAcceptedProfiles)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

