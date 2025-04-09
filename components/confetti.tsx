"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [recycle, setRecycle] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted state to true
    setMounted(true)

    // Set dimensions on client side
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial dimensions
    updateDimensions()

    // Update on resize
    window.addEventListener("resize", updateDimensions)

    // Stop recycling confetti after 5 seconds for a more natural effect
    const timer = setTimeout(() => {
      setRecycle(false)
    }, 5000)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  // Don't render anything on the server or before mounting
  if (!mounted) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={recycle}
      numberOfPieces={300}
      gravity={0.3}
      initialVelocityY={10}
      tweenDuration={5000}
      colors={["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee", "#ff69b4", "#ffd700"]}
      confettiSource={{
        x: 0,
        y: 0,
        w: dimensions.width,
        h: 0,
      }}
    />
  )
}
