import { NextResponse } from 'next/server'

export async function GET() {
  // Mock market prices data
  const prices = [
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
      ],
      marketDetails: {
        volume: '150 tons',
        quality: 'Grade A',
        demand: 'High'
      }
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
      ],
      marketDetails: {
        volume: '200 tons',
        quality: 'Grade A',
        demand: 'Medium'
      }
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
      ],
      marketDetails: {
        volume: '300 tons',
        quality: 'Grade A',
        demand: 'High'
      }
    },
    {
      id: '4',
      crop: 'Capsicum',
      currentPrice: 60,
      previousPrice: 58,
      change: 2,
      changePercent: 3.45,
      unit: 'kg',
      market: 'Bangalore APMC',
      lastUpdated: '4 hours ago',
      trend: [
        { date: 'Jan', price: 55 },
        { date: 'Feb', price: 58 },
        { date: 'Mar', price: 62 },
        { date: 'Apr', price: 65 },
        { date: 'May', price: 60 },
        { date: 'Jun', price: 60 }
      ],
      marketDetails: {
        volume: '80 tons',
        quality: 'Grade A',
        demand: 'High'
      }
    }
  ]

  return NextResponse.json({
    success: true,
    prices,
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalMarkets: 4,
      priceSource: 'APMC Official Data'
    }
  })
}
