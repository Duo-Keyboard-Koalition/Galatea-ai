import type { NextApiRequest, NextApiResponse } from 'next'

type SwipeData = {
  profileUuid: string
  direction: 'left' | 'right'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { profileUuid, direction } = req.body as SwipeData
    
    // Here you would typically save this data to a database
    console.log(`Swiped ${direction} on profile ${profileUuid}`)

    res.status(200).json({ message: 'Swipe recorded successfully' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

