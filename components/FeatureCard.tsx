'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'

interface FeatureCardProps {
  feature: string
  title: string
  description: string
  icon: string
  index: number
  onViewDetails: (feature: string) => void
  onTryDemo: (feature: string) => void
}

export default function FeatureCard({ 
  feature, 
  title, 
  description, 
  icon, 
  index, 
  onViewDetails, 
  onTryDemo 
}: FeatureCardProps) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    const cardElement = document.querySelector(`[data-feature="${feature}"]`)
    if (cardElement) {
      observer.observe(cardElement)
    }

    return () => observer.disconnect()
  }, [feature])

  return (
    <article 
      className={`feature-card group ${isInView ? 'in-view' : ''}`}
      data-feature={feature}
      data-index={index}
      tabIndex={0}
      aria-labelledby={`feat-title-${feature}`}
    >
      <div className="card-inner">
        <div className="icon">{icon}</div>
        <h3 id={`feat-title-${feature}`}>{title}</h3>
        <p className="desc">{description}</p>
        <div className="actions">
          <button 
            className="btn-primary view-details" 
            data-feature={feature}
            onClick={() => onViewDetails(feature)}
          >
            View details
          </button>
          <button 
            className="btn-ghost try-demo" 
            data-feature={feature}
            onClick={() => onTryDemo(feature)}
          >
            Try demo
          </button>
        </div>
      </div>
    </article>
  )
}
