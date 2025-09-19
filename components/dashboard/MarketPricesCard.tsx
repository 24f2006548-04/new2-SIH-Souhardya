'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown, DollarSign, MapPin, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MarketPrice {
  id: string
  crop: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  unit: string
  market: string
  lastUpdated: string
  trend: Array<{
    date: string
    price: number
  }>
}

export default function MarketPricesCard() {
  const { t } = useTranslation()
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCrop, setSelectedCrop] = useState<string>('')

  useEffect(() => {
    // Use fallback data immediately for faster loading
    const fallbackData = [
      {
        id: '1',
        crop: 'Tomato',
        currentPrice: 45,
        previousPrice: 42,
        change: 3,
        changePercent: 7.14,
        unit: 'kg',
        market: 'Mumbai APMC',
        lastUpdated: '2 hours ago',
        trend: [
          { date: 'Jan', price: 38 },
          { date: 'Feb', price: 42 },
          { date: 'Mar', price: 40 },
          { date: 'Apr', price: 45 },
          { date: 'May', price: 48 },
          { date: 'Jun', price: 45 }
        ]
      },
      {
        id: '2',
        crop: 'Onion',
        currentPrice: 28,
        previousPrice: 32,
        change: -4,
        changePercent: -12.5,
        unit: 'kg',
        market: 'Delhi APMC',
        lastUpdated: '1 hour ago',
        trend: [
          { date: 'Jan', price: 35 },
          { date: 'Feb', price: 38 },
          { date: 'Mar', price: 32 },
          { date: 'Apr', price: 30 },
          { date: 'May', price: 28 },
          { date: 'Jun', price: 28 }
        ]
      },
      {
        id: '3',
        crop: 'Potato',
        currentPrice: 22,
        previousPrice: 20,
        change: 2,
        changePercent: 10,
        unit: 'kg',
        market: 'Kolkata APMC',
        lastUpdated: '3 hours ago',
        trend: [
          { date: 'Jan', price: 18 },
          { date: 'Feb', price: 20 },
          { date: 'Mar', price: 22 },
          { date: 'Apr', price: 25 },
          { date: 'May', price: 23 },
          { date: 'Jun', price: 22 }
        ]
      }
    ]
    
    setPrices(fallbackData)
    setSelectedCrop('1')
    setIsLoading(false)
    
    // Optional: Fetch real data in background
    const fetchMarketPrices = async () => {
      try {
        const response = await fetch('/api/mock/market-prices')
        const data = await response.json()
        setPrices(data.prices)
        if (data.prices.length > 0) {
          setSelectedCrop(data.prices[0].id)
        }
      } catch (error) {
        console.error('Error fetching market prices:', error)
        // Keep fallback data
      }
    }

    // Fetch real data after component is rendered
    setTimeout(fetchMarketPrices, 100)
  }, [])

  const selectedPriceData = prices.find(p => p.id === selectedCrop)

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
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {t('dashboard.marketPrices')}
        </h3>
      </div>

      {/* Crop Selector */}
      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {prices.map((price) => (
            <button
              key={price.id}
              onClick={() => setSelectedCrop(price.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCrop === price.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {price.crop}
            </button>
          ))}
        </div>
      </div>

      {selectedPriceData && (
        <div className="space-y-6">
          {/* Current Price */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{selectedPriceData.crop}</h4>
              <div className="flex items-center">
                {selectedPriceData.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  selectedPriceData.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedPriceData.change >= 0 ? '+' : ''}{selectedPriceData.changePercent}%
                </span>
              </div>
            </div>
            
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">
                ₹{selectedPriceData.currentPrice}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                per {selectedPriceData.unit}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedPriceData.market}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{selectedPriceData.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Price Trend Chart */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Price Trend (6 months)</h5>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedPriceData.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [`₹${value}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Previous Price</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{selectedPriceData.previousPrice}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Change</p>
              <p className={`text-lg font-semibold ${
                selectedPriceData.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedPriceData.change >= 0 ? '+' : ''}₹{selectedPriceData.change}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 btn-primary text-sm">
              Set Price Alert
            </button>
            <button className="flex-1 btn-secondary text-sm">
              View All Markets
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
