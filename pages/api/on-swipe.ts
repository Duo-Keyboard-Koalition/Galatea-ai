import { NextApiRequest, NextApiResponse } from 'next'

interface SwipeData {
  [key: string]: 'left' | 'right';
}

interface SubmitSwipesRequest extends NextApiRequest {
  body: {
    sessionId: string;
    swipeData: SwipeData;
  }
}

export default async function handler(req: SubmitSwipesRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const { sessionId, swipeData } = req.body

    if (!sessionId || !swipeData) {
      return res.status(400).json({ error: 'Missing sessionId or swipeData' })
    }

    // Process the swipe data
   

    // Here you would typically:
    // 1. Validate the sessionId
    // 2. Store the swipe data in your database
    // 3. Update user preferences or matches based on the swipes
    // 4. Potentially trigger any matching algorithms

    // For this example, we'll just log the data and return a success response
    Object.entries(swipeData).forEach(([profileId, direction]) => {
      console.log(`Swipe action received for session ${sessionId}: Profile UUID ${swipeData.profileUuid}, Direction ${swipeData.direction}, Full swipe data:`, swipeData);
    })

    // In a real application, you might return some useful data here,
    // such as new matches or updated recommendations
    res.status(200).json({ message: 'Swipes submitted successfully' })
  } catch (error) {
    console.error('Error processing swipes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

