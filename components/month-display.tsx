"use client"

import { useState, useEffect } from "react"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function MonthDisplay({ month }: { month: number }) {
  const [prevMonth, setPrevMonth] = useState(month)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && month !== prevMonth) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setPrevMonth(month)
        setIsAnimating(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [month, prevMonth, isMounted])

  return (
    <div className="relative h-12 w-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-digital text-xl digital-glow">
          {isAnimating ? months[prevMonth] : months[month]}
        </div>
      </div>
    </div>
  )
}
