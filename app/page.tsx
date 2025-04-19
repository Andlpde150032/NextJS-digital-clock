"use client"
import { Clock } from "@/components/clock"
import { Timer } from "@/components/timer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl p-8 flex flex-col items-center">
        <Clock />
        <div className="h-[4rem]"></div>
        <Timer />
      </div>
    </main>
  )
}
