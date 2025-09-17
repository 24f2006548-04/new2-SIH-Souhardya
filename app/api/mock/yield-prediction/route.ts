import { NextResponse } from 'next/server'

export async function GET() {
  // Mock yield prediction data
  const predictions = [
    { month: 'Jan', predicted: 120, actual: 115 },
    { month: 'Feb', predicted: 135, actual: 130 },
    { month: 'Mar', predicted: 150, actual: 145 },
    { month: 'Apr', predicted: 165, actual: 160 },
    { month: 'May', predicted: 180, actual: 175 },
    { month: 'Jun', predicted: 195, actual: 190 }
  ]

  return NextResponse.json({
    success: true,
    predictions,
    metadata: {
      crop: 'Tomato',
      variety: 'Hybrid F1',
      farmSize: '2.5 acres',
      soilType: 'Alluvial',
      lastUpdated: new Date().toISOString()
    }
  })
}
