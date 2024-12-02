import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { Match } from '@/lib/match'

type Profile = {
  uuid: string
  id: number
  name: string
  age: number
  bio: string
  imageUrl: string
}

// This is a mock database. In a real application, you'd fetch this data from a real database.
// const matches: Match[] = [
//   { uuid: uuidv4(), name: "Mekkana", age: 25, imageUrl: "/girl-profiles/a0.png", matched: true },
//   { uuid: uuidv4(), name: "Athena", age: 25, imageUrl: "/girl-profiles/a1.png", matched: false },
//   { uuid: uuidv4(), name: "Hera", age: 30, imageUrl: "/girl-profiles/a2.png", matched: true },
//   { uuid: uuidv4(), name: "Aphrodite", age: 28, imageUrl: "/girl-profiles/a3.png", matched: false },
// ]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Match[]>
) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'data', 'profiles.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const profiles: Profile[] = JSON.parse(fileContents)
    // randomize the matches
    const matches: Match[] = profiles.map(profile => ({
      uuid: profile.uuid,
      name: profile.name,
      age: profile.age,
      imageUrl: profile.imageUrl,
      matched: Math.random() > 0.5
    }))
    res.status(200).json(matches)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

