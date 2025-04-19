"use client"

import { useEffect, useState } from "react"
import { DigitDisplay } from "./digit-display"
import { DayDisplay } from "./day-display"
import { MonthDisplay } from "./month-display"

export function Clock() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get hours, minutes, seconds
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  // Get week number
  const getWeekNumber = (d: Date) => {
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1)
    const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  const weekNumber = getWeekNumber(date).toString().padStart(2, "0")

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-6">
          <MonthDisplay month={date.getMonth()} />
          <DayDisplay day={date.getDay()} />
        </div>
        <div className="font-digital text-xl text-[#4dfffe] digital-glow">Week {weekNumber}</div>
      </div>

      <div className="relative" style={{ marginBottom: "40px" }}>
        <div className="flex items-center justify-center">
          <div className="flex">
            {hours.split("").map((digit, index) => (
              <DigitDisplay key={`hour-${index}`} digit={digit} />
            ))}
          </div>
          <div className="font-digital text-5xl text-[#4dfffe] digital-glow mx-2 font-thin">:</div>
          <div className="flex">
            {minutes.split("").map((digit, index) => (
              <DigitDisplay key={`minute-${index}`} digit={digit} />
            ))}
          </div>
          <div className="font-digital text-5xl text-[#4dfffe] digital-glow mx-2 font-thin">:</div>
          <div className="flex">
            {seconds.split("").map((digit, index) => (
              <DigitDisplay key={`second-${index}`} digit={digit} />
            ))}
          </div>
        </div>
        
        {/* Gradient overlay for reflection fade effect */}
        <div className="absolute w-full h-24" style={{ top: "95%" }}>
          <div className="reflection-gradient"></div>
        </div>
      </div>
    </div>
  )
}
