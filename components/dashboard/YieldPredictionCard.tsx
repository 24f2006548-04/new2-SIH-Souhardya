'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface YieldData {
  month: string
  predicted: number
  actual: number
}

export default function YieldPredictionCard() {
  const { t } = useTranslation()
  const [yieldData, setYieldData] = useState<YieldData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use fallback data immediately for faster loading
    const fallbackData = [
      { month: 'Jan', predicted: 120, actual: 115 },
      { month: 'Feb', predicted: 135, actual: 130 },
      { month: 'Mar', predicted: 150, actual: 145 },
      { month: 'Apr', predicted: 165, actual: 160 },
      { month: 'May', predicted: 180, actual: 175 },
      { month: 'Jun', predicted: 195, actual: 190 }
    ]
    
    setYieldData(fallbackData)
    setIsLoading(false)
    
    // Optional: Fetch real data in background
    const fetchYieldData = async () => {
      try {
        const response = await fetch('/api/mock/yield-prediction')
        const data = await response.json()
        setYieldData(data.predictions)
      } catch (error) {
        console.error('Error fetching yield data:', error)
        // Keep fallback data
      }
    }

    // Fetch real data after component is rendered
    setTimeout(fetchYieldData, 100)
  }, [])

  const currentYield = yieldData[yieldData.length - 1]?.predicted || 0
  const previousYield = yieldData[yieldData.length - 2]?.predicted || 0
  const growthRate = previousYield > 0 ? ((currentYield - previousYield) / previousYield * 100).toFixed(1) : 0

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-primary-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">
            {t('features.yieldPrediction.title')}
          </h3>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {t('dashboard.next6Months')}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">{currentYield}</span>
              <span className="text-sm text-gray-500 ml-2">kg/acre</span>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${parseFloat(growthRate.toString()) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(growthRate.toString()) >= 0 ? '+' : ''}{growthRate}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  name={t('dashboard.predicted')}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name={t('dashboard.actual')}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Predicted</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Actual</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
