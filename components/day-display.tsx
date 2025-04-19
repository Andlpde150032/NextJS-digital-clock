"use client"

import { useState, useEffect } from "react"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function DayDisplay({ day }: { day: number }) {
  const [prevDay, setPrevDay] = useState(day)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && day !== prevDay) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setPrevDay(day)
        setIsAnimating(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [day, prevDay, isMounted])

  return (
    <div className="relative h-12 w-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-digital text-xl digital-glow">
          {isAnimating ? days[prevDay] : days[day]}
        </div>
      </div>
    </div>
  )
}
