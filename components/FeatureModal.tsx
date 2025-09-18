'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface FeatureModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
  title: string
  content: React.ReactNode
}

export default function FeatureModal({ isOpen, onClose, feature, title, content }: FeatureModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      modalRef.current?.showModal()
      trapFocus(modalRef.current)
    } else {
      modalRef.current?.close()
      previousActiveElement.current?.focus()
    }
  }, [isOpen])

  const trapFocus = (modal: HTMLElement | null) => {
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    modal.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      modal.removeEventListener('keydown', handleTabKey)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <dialog
      ref={modalRef}
      className="feature-modal"
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="modal-body">
          {content}
        </div>
      </div>
    </dialog>
  )
}
