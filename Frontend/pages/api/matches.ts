import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type Match = {
  uuid: string
  name: string
  age: number
  imageUrl: string
  matched: boolean
}

// This is a mock database. In a real application, you'd fetch this data from a real database.
const matches: Match[] = [
  { uuid: uuidv4(), name: "Mekkana", age: 25, imageUrl: "/girl-profiles/a0.png", matched: true },
  { uuid: uuidv4(), name: "Athena", age: 25, imageUrl: "/girl-profiles/a1.png", matched: false },
  { uuid: uuidv4(), name: "Hera", age: 30, imageUrl: "/girl-profiles/a2.png", matched: true },
  { uuid: uuidv4(), name: "Aphrodite", age: 28, imageUrl: "/girl-profiles/a3.png", matched: false },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Match[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(matches)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

