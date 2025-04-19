"use client"

import { useState, useEffect, useRef } from "react"
import { NoReflectionDigit } from "./no-reflection-digit"

// Separate component for milliseconds to ensure they update properly
function MillisecondDisplay({ value }: { value: string }) {
  return (
    <div className="flex">
      {value.split("").map((digit, index) => (
        <div key={`ms-${index}`} className="relative h-24 w-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-digital text-6xl digital-glow">{digit}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Timer() {
  const [time, setTime] = useState(0) // time in milliseconds
  const [displayTime, setDisplayTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    milliseconds: "00"
  })
  const [isRunning, setIsRunning] = useState(false)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)

  // Update displayed time
  useEffect(() => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, "0");
    
    setDisplayTime({
      hours,
      minutes,
      seconds,
      milliseconds
    });
  }, [time]);

  useEffect(() => {
    if (isRunning) {
      let startTime = Date.now() - time;
      
      const updateTimer = () => {
        const now = Date.now();
        setTime(now - startTime);
        requestRef.current = requestAnimationFrame(updateTimer);
      };
      
      requestRef.current = requestAnimationFrame(updateTimer);
      
      return () => {
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="font-digital text-xl digital-glow mb-4">
          Timer
        </div>
        
        <div className="flex items-center justify-center">
          <div className="flex">
            {displayTime.hours.split("").map((digit, index) => (
              <NoReflectionDigit key={`timer-hour-${index}`} digit={digit} />
            ))}
          </div>
          <div className="font-digital text-5xl text-[#4dfffe] digital-glow mx-2 font-thin">:</div>
          <div className="flex">
            {displayTime.minutes.split("").map((digit, index) => (
              <NoReflectionDigit key={`timer-minute-${index}`} digit={digit} />
            ))}
          </div>
          <div className="font-digital text-5xl text-[#4dfffe] digital-glow mx-2 font-thin">:</div>
          <div className="flex">
            {displayTime.seconds.split("").map((digit, index) => (
              <NoReflectionDigit key={`timer-second-${index}`} digit={digit} />
            ))}
          </div>
          <div className="font-digital text-5xl text-[#4dfffe] digital-glow mx-2 font-thin">.</div>
          <MillisecondDisplay value={displayTime.milliseconds} />
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={startTimer} 
          disabled={isRunning}
          className={`px-4 py-2 font-digital text-sm digital-glow border border-[#4dfffe] ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4dfffe10]'}`}
        >
          Start
        </button>
        <button 
          onClick={stopTimer} 
          disabled={!isRunning}
          className={`px-4 py-2 font-digital text-sm digital-glow border border-[#4dfffe] ${!isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4dfffe10]'}`}
        >
          Stop
        </button>
        <button 
          onClick={resetTimer}
          className="px-4 py-2 font-digital text-sm digital-glow border border-[#4dfffe] hover:bg-[#4dfffe10]"
        >
          Reset
        </button>
      </div>
    </div>
  )
} 