"use client"

import { useEffect, useRef, useState } from "react"

interface CelebrationEffectsProps {
  duration?: number
}

export default function CelebrationEffects({ duration = 8000 }: CelebrationEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(true)
  const effectsCreated = useRef(false)

  useEffect(() => {
    if (!containerRef.current || !isActive || effectsCreated.current) return

    // Mark that we've created the effects to prevent multiple creations
    effectsCreated.current = true

    const container = containerRef.current
    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight

    // Create falling elements
    const createFallingElements = () => {
      const elements = ["🎉", "🎊", "🥳", "🍔", "🍕", "🍰", "🍦", "🎈", "🎁", "🎂", "🎆", "🎇", "✨"]
      const createdElements: HTMLElement[] = []

      // Create 50 elements
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          if (!container || !isActive) return

          const element = document.createElement("div")
          const emoji = elements[Math.floor(Math.random() * elements.length)]

          // Set element properties
          element.textContent = emoji
          element.className = "falling-element"
          element.style.left = `${Math.random() * containerWidth}px`
          element.style.top = "-50px"
          element.style.position = "fixed"
          element.style.fontSize = `${Math.random() * 20 + 20}px`
          element.style.zIndex = "9999"
          element.style.opacity = "1"
          element.style.transform = "rotate(0deg)"
          element.style.transition = `all ${Math.random() * 3 + 3}s linear`

          // Add to container
          container.appendChild(element)
          createdElements.push(element)

          // Start animation after a small delay
          setTimeout(() => {
            if (!isActive) return
            element.style.top = `${containerHeight + 50}px`
            element.style.transform = `rotate(${Math.random() * 360}deg)`
            element.style.opacity = "0"
          }, 50)

          // Remove element after animation
          setTimeout(() => {
            element.remove()
          }, 6000)
        }, i * 100) // Stagger the creation of elements
      }

      return createdElements
    }

    // Start the effect
    const elements = createFallingElements()

    // Clear interval after duration
    const timeout = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => {
      clearTimeout(timeout)
      setIsActive(false)
      // Clean up any remaining elements
      elements.forEach((el) => {
        if (el.parentNode) {
          el.remove()
        }
      })
    }
  }, [duration, isActive])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
}
