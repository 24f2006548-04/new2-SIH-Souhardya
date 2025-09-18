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
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
      }, 1500) // Wait for loading animation to complete
      
      return () => clearTimeout(scrollTimer)
    }
  }, [])

  useEffect(() => {
    // Add event listeners for hero buttons
    const heroCtaBtn = document.getElementById('heroCtaBtn')
    const learnMoreBtn = document.querySelector('.btn-outline')
    
    const handleCtaClick = () => {
      // Scroll to dashboard grid
      const dashboardGrid = document.querySelector('.grid')
      if (dashboardGrid) {
        dashboardGrid.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    const handleLearnMoreClick = () => {
      // Scroll to dashboard grid
      const dashboardGrid = document.querySelector('.grid')
      if (dashboardGrid) {
        dashboardGrid.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener('click', handleCtaClick)
    }
    
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', handleLearnMoreClick)
    }
    
    return () => {
      if (heroCtaBtn) heroCtaBtn.removeEventListener('click', handleCtaClick)
      if (learnMoreBtn) learnMoreBtn.removeEventListener('click', handleLearnMoreClick)
    }
  }, [isLoading])

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
          {/* Hero Section */}
          <div className="hero relative w-full h-screen flex items-center justify-center text-center rounded-xl mb-8 overflow-hidden">
            <div 
              className="absolute inset-0 w-full h-full object-cover bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/assets/85c96744-8427-4010-8fce-abfab61dcde3.png')"
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/35"></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-bold text-white">AgriSight</h1>
              <p className="mt-4 text-lg text-white/90">Smart Agriculture for Modern Farmers</p>
              <div className="mt-6 flex gap-4 justify-center">
                <button id="heroCtaBtn" className="btn-primary">Get Started</button>
                <button className="btn-outline">Learn More</button>
              </div>
            </div>
          </div>

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
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="yield-prediction"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
            >
              <YieldPredictionCard />
            </motion.div>

            {/* Pest & Disease Detection Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="pest-detection"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
            >
              <PestDiseaseCard />
            </motion.div>

            {/* Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="weather-alerts"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
            >
              <WeatherAlertsCard />
            </motion.div>

            {/* Crop Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="crop-suggestions"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
            >
              <CropSuggestionsCard />
            </motion.div>

            {/* Fertilizer Recommendations Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="fertilizer-recommendations"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
            >
              <FertilizerRecommendationsCard onOpenModal={openModal} />
            </motion.div>

            {/* Market Prices Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                ease: [0.2, 0, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              data-feature="market-prices"
              className="md-elevation-2 hover:md-elevation-3 transition-all duration-300"
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
