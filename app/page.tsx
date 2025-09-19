'use client'
import * as React from 'react'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Navigation from '../components/Navigation'

export default function HomePage(): ReactElement {
  const { t } = useTranslation()

  const handleFeatureClick = (featureKey: string) => {
    // Navigate to dashboard and scroll to specific feature
    const featureMap: Record<string, string> = {
      'yieldPrediction': 'yield-prediction',
      'pestDetection': 'pest-detection', 
      'weatherAlerts': 'weather-alerts',
      'cropSuggestions': 'crop-suggestions',
      'fertilizerGuide': 'fertilizer-recommendations',
      'marketPrices': 'market-prices'
    }
    
    const featureId = featureMap[featureKey]
    if (featureId) {
      // Store the target feature in sessionStorage for dashboard to use
      sessionStorage.setItem('scrollToFeature', featureId)
      // Navigate to dashboard
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                >
                  {t('landing.title')}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-600 mb-8"
                >
                  {t('landing.subtitle')}
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg text-gray-500 mb-10 max-w-2xl"
                >
                  {t('landing.description')}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Link href="/profile" className="btn-primary text-lg px-8 py-3">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {t('landing.getStarted')}
                      </motion.span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Link href="/dashboard" className="btn-secondary text-lg px-8 py-3">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        {t('landing.learnMore')}
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('features.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('features.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  key: 'yieldPrediction',
                  icon: '🌾'
                },
                {
                  key: 'pestDetection',
                  icon: '🔍'
                },
                {
                  key: 'weatherAlerts',
                  icon: '🌤️'
                },
                {
                  key: 'cropSuggestions',
                  icon: '🌱'
                },
                {
                  key: 'fertilizerGuide',
                  icon: '🧪'
                },
                {
                  key: 'marketPrices',
                  icon: '📈'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.2, 0, 0, 1],
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { duration: 0.3, ease: [0.2, 0, 0, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className="card hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border border-white/20"
                  onClick={() => handleFeatureClick(feature.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleFeatureClick(feature.key)
                    }
                  }}
                  aria-label={`Go to ${t(`features.${feature.key}.title`)} feature`}
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900 mb-3"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ 
                      color: "#18A558",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {t(`features.${feature.key}.title`)}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-4"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ 
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {t(`features.${feature.key}.description`)}
                  </motion.p>
                  <motion.div 
                    className="mt-4 text-primary-600 font-medium text-sm flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span>{t('features.clickToExplore')}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Link 
                href="/profile" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
              >
                {t('cta.button')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
