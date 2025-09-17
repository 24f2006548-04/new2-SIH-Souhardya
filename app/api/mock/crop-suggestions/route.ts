import { NextResponse } from 'next/server'

export async function GET() {
  // Mock crop suggestions data
  const suggestions = [
    {
      id: '1',
      name: 'Tomato',
      variety: 'Hybrid F1',
      suitability: 92,
      plantingSeason: 'Oct - Dec',
      expectedYield: '25-30 tons/acre',
      marketPrice: 45,
      growthPeriod: '90-120 days',
      waterRequirement: 'medium' as const,
      soilCompatibility: ['Alluvial', 'Black Soil'],
      benefits: ['High market demand', 'Good profit margin', 'Multiple harvests'],
      challenges: ['Pest susceptibility', 'Water management'],
      investment: '₹50,000-70,000/acre',
      profitPotential: 'High'
    },
    {
      id: '2',
      name: 'Okra',
      variety: 'Pusa Sawani',
      suitability: 88,
      plantingSeason: 'Mar - May',
      expectedYield: '8-12 tons/acre',
      marketPrice: 35,
      growthPeriod: '60-80 days',
      waterRequirement: 'low' as const,
      soilCompatibility: ['Alluvial', 'Red Soil'],
      benefits: ['Drought resistant', 'Quick harvest', 'Export potential'],
      challenges: ['Harvest timing', 'Market price fluctuation'],
      investment: '₹25,000-35,000/acre',
      profitPotential: 'Medium'
    },
    {
      id: '3',
      name: 'Capsicum',
      variety: 'California Wonder',
      suitability: 85,
      plantingSeason: 'Aug - Oct',
      expectedYield: '15-20 tons/acre',
      marketPrice: 60,
      growthPeriod: '100-120 days',
      waterRequirement: 'medium' as const,
      soilCompatibility: ['Alluvial', 'Black Soil'],
      benefits: ['High value crop', 'Good shelf life', 'Processing industry demand'],
      challenges: ['Temperature sensitivity', 'Disease management'],
      investment: '₹60,000-80,000/acre',
      profitPotential: 'High'
    },
    {
      id: '4',
      name: 'Brinjal',
      variety: 'Pusa Purple Long',
      suitability: 82,
      plantingSeason: 'Jun - Aug',
      expectedYield: '20-25 tons/acre',
      marketPrice: 30,
      growthPeriod: '120-150 days',
      waterRequirement: 'medium' as const,
      soilCompatibility: ['Alluvial', 'Black Soil', 'Red Soil'],
      benefits: ['Year-round demand', 'Multiple varieties', 'Local market'],
      challenges: ['Fruit borer', 'Harvest management'],
      investment: '₹40,000-55,000/acre',
      profitPotential: 'Medium'
    }
  ]

  return NextResponse.json({
    success: true,
    suggestions,
    metadata: {
      location: 'Maharashtra',
      soilType: 'Alluvial',
      season: 'Kharif',
      lastUpdated: new Date().toISOString()
    }
  })
}
