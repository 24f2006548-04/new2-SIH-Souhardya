'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Sprout, TrendingUp, Calendar, MapPin } from 'lucide-react'

interface CropSuggestion {
  id: string
  name: string
  variety: string
  suitability: number
  plantingSeason: string
  expectedYield: string
  marketPrice: number
  growthPeriod: string
  waterRequirement: 'low' | 'medium' | 'high'
  soilCompatibility: string[]
  benefits: string[]
}

export default function CropSuggestionsCard() {
  const { t } = useTranslation()
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use fallback data immediately for faster loading
    const fallbackData = [
      {
        id: '1',
        name: 'Tomato',
        variety: 'Hybrid F1',
        suitability: 92,
        plantingSeason: 'Oct - Dec',
        expectedYield: '25-30 tons/acre',
        marketPrice: 45,
        growthPeriod: '90-120 days',
        waterRequirement: 'medium' as 'low' | 'medium' | 'high',
        soilCompatibility: ['Alluvial', 'Black Soil'],
        benefits: ['High market demand', 'Good profit margin', 'Multiple harvests']
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
        waterRequirement: 'low' as 'low' | 'medium' | 'high',
        soilCompatibility: ['Alluvial', 'Red Soil'],
        benefits: ['Drought resistant', 'Quick harvest', 'Export potential']
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
        waterRequirement: 'medium' as 'low' | 'medium' | 'high',
        soilCompatibility: ['Alluvial', 'Black Soil'],
        benefits: ['High value crop', 'Good shelf life', 'Processing industry demand']
      }
    ]
    
    setSuggestions(fallbackData)
    setIsLoading(false)
    
    // Optional: Fetch real data in background
    const fetchCropSuggestions = async () => {
      try {
        const response = await fetch('/api/mock/crop-suggestions')
        const data = await response.json()
        setSuggestions(data.suggestions)
      } catch (error) {
        console.error('Error fetching crop suggestions:', error)
        // Keep fallback data
      }
    }

    // Fetch real data after component is rendered
    setTimeout(fetchCropSuggestions, 100)
  }, [])

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return 'text-green-600 bg-green-100'
    if (suitability >= 80) return 'text-yellow-600 bg-yellow-100'
    return 'text-orange-600 bg-orange-100'
  }

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (isLoading) {
    return (
      <div className="card h-full">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card h-full">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Sprout className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {t('features.cropSuggestions.title')}
        </h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((crop) => (
          <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                <p className="text-sm text-gray-600">{crop.variety}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSuitabilityColor(crop.suitability)}`}>
                {crop.suitability}% match
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{crop.plantingSeason}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">₹{crop.marketPrice}/kg</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{t('dashboard.expectedYield')}</span>
                <span className="font-medium text-gray-900">{crop.expectedYield}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{t('dashboard.growthPeriod')}</span>
                <span className="font-medium text-gray-900">{crop.growthPeriod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{t('dashboard.waterRequirement')}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWaterRequirementColor(crop.waterRequirement)}`}>
                  {crop.waterRequirement}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.soilCompatibility')}:</p>
              <div className="flex flex-wrap gap-1">
                {crop.soilCompatibility.map((soil, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {soil}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.keyBenefits')}:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {crop.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full btn-primary text-sm">
          {t('dashboard.viewAllSuggestions')}
        </button>
      </div>
    </div>
  )
}
