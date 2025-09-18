'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Beaker, Calendar, Droplets, TrendingUp } from 'lucide-react'

interface FertilizerRecommendation {
  id: string
  name: string
  type: 'organic' | 'inorganic' | 'bio'
  applicationTime: string
  quantity: string
  frequency: string
  benefits: string[]
  price: number
  availability: 'high' | 'medium' | 'low'
  soilCompatibility: string[]
}

interface FertilizerRecommendationsCardProps {
  onOpenModal: (title: string, content: React.ReactNode) => void
}

export default function FertilizerRecommendationsCard({ onOpenModal }: FertilizerRecommendationsCardProps) {
  const { t } = useTranslation()
  const [recommendations, setRecommendations] = useState<FertilizerRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFertilizerRecommendations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/mock/fertilizer-recommendations')
        const data = await response.json()
        setRecommendations(data.recommendations)
      } catch (error) {
        console.error('Error fetching fertilizer recommendations:', error)
        // Mock data for demo
        setRecommendations([
          {
            id: '1',
            name: 'NPK 19:19:19',
            type: 'inorganic',
            applicationTime: 'Before planting & during growth',
            quantity: '50-75 kg/acre',
            frequency: 'Every 3-4 weeks',
            benefits: ['Balanced nutrition', 'Quick absorption', 'High yield'],
            price: 25,
            availability: 'high',
            soilCompatibility: ['Alluvial', 'Black Soil', 'Red Soil']
          },
          {
            id: '2',
            name: 'Vermicompost',
            type: 'organic',
            applicationTime: 'During soil preparation',
            quantity: '2-3 tons/acre',
            frequency: 'Once per season',
            benefits: ['Improves soil structure', 'Long-term fertility', 'Eco-friendly'],
            price: 8,
            availability: 'high',
            soilCompatibility: ['All soil types']
          },
          {
            id: '3',
            name: 'Azospirillum Biofertilizer',
            type: 'bio',
            applicationTime: 'Seed treatment & soil application',
            quantity: '1-2 kg/acre',
            frequency: 'Every 2-3 months',
            benefits: ['Nitrogen fixation', 'Root development', 'Cost effective'],
            price: 120,
            availability: 'medium',
            soilCompatibility: ['Alluvial', 'Black Soil']
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFertilizerRecommendations()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organic': return 'text-green-600 bg-green-100'
      case 'inorganic': return 'text-blue-600 bg-blue-100'
      case 'bio': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleViewDetails = (fertilizer: FertilizerRecommendation) => {
    const modalContent = (
      <div className="space-y-4">
        <p><strong>What it is:</strong> A material (natural or synthetic) applied to soil or plants to supply nutrients and boost growth.</p>
        <p><strong>Main nutrients:</strong> Nitrogen (N), Phosphorus (P), Potassium (K).</p>
        <p><strong>Types:</strong> Straight (single nutrient), Complex (multi), Organic vs Inorganic.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Fertilizer Details:</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {fertilizer.name}</p>
            <p><strong>Type:</strong> {fertilizer.type}</p>
            <p><strong>Price:</strong> ₹{fertilizer.price} per kg</p>
            <p><strong>Application Time:</strong> {fertilizer.applicationTime}</p>
            <p><strong>Quantity:</strong> {fertilizer.quantity}</p>
            <p><strong>Frequency:</strong> {fertilizer.frequency}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Key Benefits:</h4>
          <ul className="space-y-1 text-sm">
            {fertilizer.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Soil Compatibility:</h4>
          <div className="flex flex-wrap gap-2">
            {fertilizer.soilCompatibility.map((soil, index) => (
              <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                {soil}
              </span>
            ))}
          </div>
        </div>

        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="font-semibold cursor-pointer">Environmental impacts (short)</summary>
          <p className="mt-2 text-sm">Overuse can cause runoff, eutrophication, soil acidification and potent greenhouse gas (N₂O).</p>
        </details>

        <div className="pt-4 border-t">
          <a 
            href="https://en.wikipedia.org/wiki/Fertilizer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Read full Wikipedia article
          </a>
        </div>
      </div>
    )
    
    onOpenModal(`${fertilizer.name} — Quick facts`, modalContent)
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
        <div className="p-2 bg-purple-100 rounded-lg">
          <Beaker className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {t('dashboard.fertilizerRecommendations')}
        </h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((fertilizer) => (
          <div key={fertilizer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{fertilizer.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(fertilizer.type)}`}>
                    {fertilizer.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(fertilizer.availability)}`}>
                    {fertilizer.availability} availability
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{fertilizer.price}</p>
                <p className="text-xs text-gray-500">per kg</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-3 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{fertilizer.applicationTime}</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{fertilizer.quantity}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{fertilizer.frequency}</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Key Benefits:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {fertilizer.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Soil Compatibility:</p>
              <div className="flex flex-wrap gap-1">
                {fertilizer.soilCompatibility.map((soil, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {soil}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 btn-primary text-sm">
                Add to Cart
              </button>
              <button 
                className="flex-1 btn-secondary text-sm view-details-btn"
                data-product-id={fertilizer.id}
                onClick={() => handleViewDetails(fertilizer)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full btn-secondary text-sm">
          View All Fertilizers
        </button>
      </div>
    </div>
  )
}
