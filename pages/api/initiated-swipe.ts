import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type InitSwipeResponse = {
  uuid: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InitSwipeResponse>
) {
  if (req.method === 'POST') {
    const uuid = uuidv4()
    console.log(`Initiated swipe session: ${uuid}`)
    res.status(200).json({ uuid })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

