'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import YieldPredictionCard from '../../components/dashboard/YieldPredictionCard'
import PestDiseaseCard from '../../components/dashboard/PestDiseaseCard'
import WeatherAlertsCard from '../../components/dashboard/WeatherAlertsCard'
import CropSuggestionsCard from '../../components/dashboard/CropSuggestionsCard'
import FertilizerRecommendationsCard from '../../components/dashboard/FertilizerRecommendationsCard'
import MarketPricesCard from '../../components/dashboard/MarketPricesCard'

export default function DashboardPage(): ReactElement {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('dashboard.welcome')}, Farmer! Here's your personalized agriculture insights.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Yield Prediction Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <YieldPredictionCard />
            </motion.div>

            {/* Pest & Disease Detection Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PestDiseaseCard />
            </motion.div>

            {/* Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <WeatherAlertsCard />
            </motion.div>

            {/* Crop Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CropSuggestionsCard />
            </motion.div>

            {/* Fertilizer Recommendations Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <FertilizerRecommendationsCard />
            </motion.div>

            {/* Market Prices Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MarketPricesCard />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
