'use client'
import * as React from 'react'
import { useState } from 'react'
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { Save, User, MapPin, Droplets, Globe } from 'lucide-react'

interface FarmerProfile {
  state: string
  district: string
  farmSize: string
  soilType: string
  irrigation: string
  languages: string[]
}

export default function ProfilePage(): ReactElement {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<FarmerProfile>({
    state: '',
    district: '',
    farmSize: '',
    soilType: '',
    irrigation: '',
    languages: []
  })

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]

  const soilTypes = [
    'Alluvial Soil', 'Black Soil', 'Red Soil', 'Laterite Soil',
    'Mountain Soil', 'Desert Soil', 'Saline Soil', 'Peaty Soil'
  ]

  const irrigationTypes = [
    'Drip Irrigation', 'Sprinkler Irrigation', 'Flood Irrigation',
    'Furrow Irrigation', 'Center Pivot', 'Manual Watering'
  ]

  const languages = ['Hindi', 'English', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi']

  const handleInputChange = (field: keyof FarmerProfile, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Profile saved:', profile)
      alert('Profile saved successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <User className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('profile.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('profile.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Location Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    {t('profile.state')}
                  </label>
                  <select
                    value={profile.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="input-field"
                    required
                    aria-describedby="state-help"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <p id="state-help" className="text-sm text-gray-500 mt-1">
                    Select your state for localized recommendations
                  </p>
                </div>

                <div>
                  <label className="label">
                    {t('profile.district')}
                  </label>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="input-field"
                    placeholder="Enter your district"
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <Droplets className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Farm Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    {t('profile.farmSize')}
                  </label>
                  <input
                    type="number"
                    value={profile.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    className="input-field"
                    placeholder="Enter farm size in acres"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    {t('profile.soilType')}
                  </label>
                  <select
                    value={profile.soilType}
                    onChange={(e) => handleInputChange('soilType', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map(soil => (
                      <option key={soil} value={soil}>{soil}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    {t('profile.irrigation')}
                  </label>
                  <select
                    value={profile.irrigation}
                    onChange={(e) => handleInputChange('irrigation', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select Irrigation Type</option>
                    {irrigationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <Globe className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Language Preferences</h2>
              </div>
              
              <div>
                <label className="label">
                  {t('profile.languages')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {languages.map(language => (
                    <label key={language} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.languages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Select all languages you're comfortable with for better recommendations
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                <span>{isLoading ? t('common.loading') : t('profile.save')}</span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
