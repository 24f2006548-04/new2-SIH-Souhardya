'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Modal from '../../components/Modal'
import YieldPredictionCard from '../../components/dashboard/YieldPredictionCard'
import PestDiseaseCard from '../../components/dashboard/PestDiseaseCard'
import WeatherAlertsCard from '../../components/dashboard/WeatherAlertsCard'
import CropSuggestionsCard from '../../components/dashboard/CropSuggestionsCard'
import FertilizerRecommendationsCard from '../../components/dashboard/FertilizerRecommendationsCard'
import MarketPricesCard from '../../components/dashboard/MarketPricesCard'

export default function DashboardPage(): ReactElement {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<{
    title: string
    content: React.ReactNode
  }>({ title: '', content: null })

  const openModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent({ title: '', content: null })
  }

  useEffect(() => {
    // Simulate loading dashboard data - reduced from 1000ms to 300ms
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle scroll to specific feature from home page
    const scrollToFeature = sessionStorage.getItem('scrollToFeature')
    if (scrollToFeature) {
      // Clear the session storage
      sessionStorage.removeItem('scrollToFeature')
      
      // Wait for loading to complete, then scroll to feature
      const scrollTimer = setTimeout(() => {
        const featureElement = document.querySelector(`[data-feature="${scrollToFeature}"]`)
        if (featureElement) {
          featureElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 500) // Reduced wait time since loading is faster
      
      return () => clearTimeout(scrollTimer)
    }
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -2 }}
              data-feature="yield-prediction"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <YieldPredictionCard />
            </motion.div>

            {/* Pest & Disease Detection Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ y: -2 }}
              data-feature="pest-detection"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <PestDiseaseCard />
            </motion.div>

            {/* Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ y: -2 }}
              data-feature="weather-alerts"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <WeatherAlertsCard />
            </motion.div>

            {/* Crop Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              whileHover={{ y: -2 }}
              data-feature="crop-suggestions"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <CropSuggestionsCard />
            </motion.div>

            {/* Fertilizer Recommendations Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ y: -2 }}
              data-feature="fertilizer-recommendations"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <FertilizerRecommendationsCard onOpenModal={openModal} />
            </motion.div>

            {/* Market Prices Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              whileHover={{ y: -2 }}
              data-feature="market-prices"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-200"
            >
              <MarketPricesCard />
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Modal */}
      <Modal
        id="fertilizerModal"
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
      >
        {modalContent.content}
      </Modal>
    </div>
  )
}
