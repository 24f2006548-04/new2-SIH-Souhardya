'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CloudRain, Sun, Cloud, AlertTriangle, Thermometer, Droplets, Wind } from 'lucide-react'

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    condition: string
    icon: string
  }
  alerts: Array<{
    id: string
    type: 'warning' | 'info' | 'danger'
    title: string
    description: string
    time: string
  }>
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
  }>
}

export default function WeatherAlertsCard() {
  const { t } = useTranslation()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use fallback data immediately for faster loading
    const fallbackData = {
      current: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: 'Partly Cloudy',
        icon: 'cloud'
      },
      alerts: [
        {
          id: '1',
          type: 'warning',
          title: 'Heavy Rain Expected',
          description: 'Heavy rainfall expected in the next 24 hours. Consider delaying irrigation.',
          time: t('dashboard.2HoursAgo')
        },
        {
          id: '2',
          type: 'info',
          title: 'Temperature Drop',
          description: 'Temperature will drop to 15°C tonight. Protect sensitive crops.',
          time: t('dashboard.4HoursAgo')
        }
      ],
      forecast: [
        { day: 'Today', high: 32, low: 18, condition: 'Sunny', precipitation: 0 },
        { day: 'Tomorrow', high: 28, low: 16, condition: 'Rainy', precipitation: 80 },
        { day: 'Wed', high: 26, low: 14, condition: 'Cloudy', precipitation: 20 },
        { day: 'Thu', high: 30, low: 17, condition: 'Sunny', precipitation: 0 },
        { day: 'Fri', high: 33, low: 19, condition: 'Partly Cloudy', precipitation: 10 }
      ]
    }
    
    setIsLoading(false)
    
    // Optional: Fetch real data in background
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/mock/weather')
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        // Keep fallback data
      }
    }

    // Fetch real data after component is rendered
    setTimeout(fetchWeatherData, 100)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-500" />
      case 'partly cloudy': return <Cloud className="h-6 w-6 text-gray-400" />
      default: return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'danger': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <AlertTriangle className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'danger': return 'border-red-200 bg-red-50'
      default: return 'border-blue-200 bg-blue-50'
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
        <div className="p-2 bg-blue-100 rounded-lg">
          <CloudRain className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {t('dashboard.weatherAlerts')}
        </h3>
      </div>

      {weatherData && weatherData.alerts.length > 0 ? (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Active Alerts</h4>
          <div className="space-y-2">
            {weatherData.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start">
                  {getAlertIcon(alert.type)}
                  <div className="ml-2 flex-1">
                    <h5 className="font-medium text-gray-900 text-sm">
                      {alert.title}
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No active weather alerts.</div>
      )}
    </div>
  )
}
