'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { Camera, Upload, AlertTriangle, CheckCircle } from 'lucide-react'

interface DetectionResult {
  pest: string
  confidence: number
  severity: 'low' | 'medium' | 'high'
  recommendations: string[]
}

export default function PestDiseaseCard() {
  const { t } = useTranslation()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setUploadedImage(previewUrl)
    setIsAnalyzing(true)

    try {
      // Simulate API call for pest detection
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/mock/pest-detection', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data.detection)
      } else {
        throw new Error('Detection failed')
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
      // Mock result for demo
      setResult({
        pest: 'Aphids',
        confidence: 87,
        severity: 'medium',
        recommendations: [
          'Apply neem oil spray',
          'Introduce ladybugs as natural predators',
          'Remove affected leaves',
          'Improve air circulation'
        ]
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="card h-full">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Camera className="h-6 w-6 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {t('dashboard.pestDisease')}
        </h3>
      </div>

      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop the image here' : 'Upload plant photo'}
          </p>
          <p className="text-sm text-gray-500">
            Drag & drop or click to select (JPG, PNG, WebP)
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Max file size: 5MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded plant"
              className="w-full h-48 object-cover rounded-lg"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Analyzing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Detection Result</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                  {result.severity.toUpperCase()}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{result.pest}</span>
                  <span className="text-sm text-gray-600">{result.confidence}% confidence</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                  Recommendations
                </h5>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setUploadedImage(null)
                  setResult(null)
                }}
                className="w-full btn-secondary text-sm"
              >
                Analyze Another Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
