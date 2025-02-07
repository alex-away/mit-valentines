import { useState, useEffect } from "react"
import React from "react"
import PropTypes from "prop-types"


const TimeUnit = ({ value, label }) => (
    <div
        className="bg-white/30 p-6 rounded-xl min-w-[140px] flex flex-col items-center 
    transform transition-all duration-300 hover:-translate-y-1 hover:scale-105
    border border-white/40 shadow-lg backdrop-blur-sm"
    >
        <span className="text-4xl font-bold tabular-nums">
            {value.toString().padStart(2, "0")}
        </span>
        <div className="text-sm mt-2 font-medium text-white/90">{label}</div>
    </div>
)

TimeUnit.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
}

const createFallingHearts = () => {
    const hearts = []
    for (let i = 0; i < 10; i++) {
        const startPosition = Math.random() * 100
        const delay = Math.random() * 5
        const duration = 6 + Math.random() * 4

        hearts.push(
            <div
                key={i}
                className="absolute text-2xl pointer-events-none animate-falling"
                style={{
                    left: `${startPosition}%`,
                    animation: `falling ${duration}s linear ${delay}s infinite`,
                }}
            >
                💝
            </div>
        )
    }
    return hearts
}

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-02-14T00:00:00").getTime()
        const now = new Date().getTime()
        const difference = targetDate - now

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (difference % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            })
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
    }

    useEffect(() => {
        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 relative overflow-hidden">
            {createFallingHearts()}
            <div className="text-center text-white z-10 p-8 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
                    Your Valentine Awaits... Ready to Match? 💕
                </h1>

                <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg animate-pulse-slow ring-1 ring-white/50">
                    <p className="text-2xl font-semibold mb-6">
                        Valentine&apos;s Match Reveal in: ⏳
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <TimeUnit value={timeLeft.hours} label="Hours" />
                        <TimeUnit value={timeLeft.minutes} label="Minutes" />
                        <TimeUnit value={timeLeft.seconds} label="Seconds" />
                    </div>
                </div>

                <button
                    className="mt-8 px-8 py-4 text-2xl bg-white text-pink-500 rounded-full 
          shadow-lg transform transition-all duration-300 hover:-translate-y-1 
          hover:shadow-xl active:translate-y-0 focus:outline-none focus:ring-2 
          focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                >
                    💘 Get Matched Now!
                </button>
            </div>
        </div>
    )
}

export default Hero
