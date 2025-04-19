"use client"

import { useEffect, useState } from "react"

export function NoReflectionDigit({ digit }: { digit: string }) {
  const [prevDigit, setPrevDigit] = useState(digit)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only run effect after component is mounted and when digit changes
    if (isMounted && digit !== prevDigit) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setPrevDigit(digit)
        setIsAnimating(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [digit, prevDigit, isMounted])

  return (
    <div className="relative h-24 w-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-digital text-6xl digital-glow">
          {isAnimating ? prevDigit : digit}
        </div>
      </div>
    </div>
  )
} 