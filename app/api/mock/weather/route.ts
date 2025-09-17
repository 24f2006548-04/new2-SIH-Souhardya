import { NextResponse } from 'next/server'

export async function GET() {
  // Mock weather data
  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      icon: 'cloud',
      feelsLike: 30,
      uvIndex: 6,
      visibility: 10
    },
    alerts: [
      {
        id: '1',
        type: 'warning',
        title: 'Heavy Rain Expected',
        description: 'Heavy rainfall expected in the next 24 hours. Consider delaying irrigation and protect sensitive crops.',
        time: '2 hours ago',
        severity: 'moderate'
      },
      {
        id: '2',
        type: 'info',
        title: 'Temperature Drop',
        description: 'Temperature will drop to 15°C tonight. Protect sensitive crops with covers.',
        time: '4 hours ago',
        severity: 'low'
      }
    ],
    forecast: [
      { day: 'Today', high: 32, low: 18, condition: 'Sunny', precipitation: 0, windSpeed: 8 },
      { day: 'Tomorrow', high: 28, low: 16, condition: 'Rainy', precipitation: 80, windSpeed: 15 },
      { day: 'Wed', high: 26, low: 14, condition: 'Cloudy', precipitation: 20, windSpeed: 12 },
      { day: 'Thu', high: 30, low: 17, condition: 'Sunny', precipitation: 0, windSpeed: 6 },
      { day: 'Fri', high: 33, low: 19, condition: 'Partly Cloudy', precipitation: 10, windSpeed: 9 }
    ],
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0760, lon: 72.8777 }
    },
    lastUpdated: new Date().toISOString()
  }

  return NextResponse.json({
    success: true,
    ...weatherData
  })
}
