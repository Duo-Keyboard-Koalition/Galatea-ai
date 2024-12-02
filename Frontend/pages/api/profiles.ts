import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type AIProfile = {
  uuid: string
  id: number
  name: string
  age: number
  bio: string
  imageUrl: string
}

const profiles: AIProfile[] = [
  { uuid: uuidv4(), id: 0, name: "Mekkana", age: 25, bio: "Goddess of modernity, progress and intellect!", imageUrl: "/girl-profiles/a0.png" },
  { uuid: uuidv4(), id: 1, name: "Athena", age: 25, bio: "Goddess of wisdom and strategic warfare. Let's have some intellectual battles!", imageUrl: "/girl-profiles/a1.png" },
  { uuid: uuidv4(), id: 2, name: "Hera", age: 30, bio: "Queen of the gods. Looking for someone who can keep up with divine drama.", imageUrl: "/girl-profiles/a2.png" },
  { uuid: uuidv4(), id: 3, name: "Aphrodite", age: 28, bio: "Goddess of love and beauty. Swipe right for an unforgettable romance!", imageUrl: "/girl-profiles/a3.png" },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIProfile[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(profiles)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

