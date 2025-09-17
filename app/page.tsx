'use client'
import * as React from 'react'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import LottieAnimation from '../components/LottieAnimation'

export default function HomePage(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
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
                  <Link href="/profile" className="btn-primary text-lg px-8 py-3">
                    {t('landing.getStarted')}
                  </Link>
                  <Link href="/dashboard" className="btn-secondary text-lg px-8 py-3">
                    {t('landing.learnMore')}
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center lg:justify-end"
              >
                <LottieAnimation />
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
                Smart Agriculture Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Harness the power of AI and data analytics to optimize your farming operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Yield Prediction',
                  description: 'AI-powered crop yield forecasting based on weather, soil, and historical data',
                  icon: '🌾'
                },
                {
                  title: 'Pest Detection',
                  description: 'Upload photos to identify pests and diseases with instant recommendations',
                  icon: '🔍'
                },
                {
                  title: 'Weather Alerts',
                  description: 'Real-time weather monitoring and alerts for optimal farming decisions',
                  icon: '🌤️'
                },
                {
                  title: 'Crop Suggestions',
                  description: 'Personalized crop recommendations based on your farm conditions',
                  icon: '🌱'
                },
                {
                  title: 'Fertilizer Guide',
                  description: 'Smart fertilizer recommendations for maximum crop health and yield',
                  icon: '🧪'
                },
                {
                  title: 'Market Prices',
                  description: 'Live market price tracking and selling recommendations',
                  icon: '📈'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
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
                Ready to Transform Your Farming?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using AgriSight to increase their yields and reduce costs.
              </p>
              <Link 
                href="/profile" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
