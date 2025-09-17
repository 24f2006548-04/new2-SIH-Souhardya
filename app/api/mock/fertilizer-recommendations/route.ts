import { NextResponse } from 'next/server'

export async function GET() {
  // Mock fertilizer recommendations data
  const recommendations = [
    {
      id: '1',
      name: 'NPK 19:19:19',
      type: 'inorganic' as const,
      applicationTime: 'Before planting & during growth',
      quantity: '50-75 kg/acre',
      frequency: 'Every 3-4 weeks',
      benefits: ['Balanced nutrition', 'Quick absorption', 'High yield'],
      price: 25,
      availability: 'high' as const,
      soilCompatibility: ['Alluvial', 'Black Soil', 'Red Soil'],
      composition: 'N: 19%, P: 19%, K: 19%',
      applicationMethod: 'Broadcast or side dressing',
      precautions: ['Avoid over-application', 'Store in dry place']
    },
    {
      id: '2',
      name: 'Vermicompost',
      type: 'organic' as const,
      applicationTime: 'During soil preparation',
      quantity: '2-3 tons/acre',
      frequency: 'Once per season',
      benefits: ['Improves soil structure', 'Long-term fertility', 'Eco-friendly'],
      price: 8,
      availability: 'high' as const,
      soilCompatibility: ['All soil types'],
      composition: 'Organic matter: 60-70%, NPK: 1-2%',
      applicationMethod: 'Mix with topsoil',
      precautions: ['Ensure proper decomposition', 'Avoid fresh manure']
    },
    {
      id: '3',
      name: 'Azospirillum Biofertilizer',
      type: 'bio' as const,
      applicationTime: 'Seed treatment & soil application',
      quantity: '1-2 kg/acre',
      frequency: 'Every 2-3 months',
      benefits: ['Nitrogen fixation', 'Root development', 'Cost effective'],
      price: 120,
      availability: 'medium' as const,
      soilCompatibility: ['Alluvial', 'Black Soil'],
      composition: 'Azospirillum: 10^8 CFU/g',
      applicationMethod: 'Seed coating or soil drenching',
      precautions: ['Store in cool place', 'Use within expiry date']
    },
    {
      id: '4',
      name: 'DAP (Diammonium Phosphate)',
      type: 'inorganic' as const,
      applicationTime: 'At planting time',
      quantity: '100-150 kg/acre',
      frequency: 'Once per season',
      benefits: ['High phosphorus content', 'Quick root development', 'Early maturity'],
      price: 35,
      availability: 'high' as const,
      soilCompatibility: ['Alluvial', 'Black Soil'],
      composition: 'N: 18%, P: 46%',
      applicationMethod: 'Placement near roots',
      precautions: ['Avoid contact with seeds', 'Use protective gear']
    }
  ]

  return NextResponse.json({
    success: true,
    recommendations,
    metadata: {
      crop: 'Tomato',
      soilType: 'Alluvial',
      season: 'Kharif',
      lastUpdated: new Date().toISOString()
    }
  })
}
