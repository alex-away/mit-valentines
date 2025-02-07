import React, { useState, useEffect, useRef } from "react"

const Challenges = () => {
    const [accepted, setAccepted] = useState(false)
    const [dare, setDare] = useState("")
    const [isSpinning, setIsSpinning] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [lastIndex, setLastIndex] = useState(-1)
    const wheelRef = useRef(null)

    const dares = [
        { text: "Send a cute emoji to your match! 💌", icon: "💌" },
        { text: "Post a romantic song on your story 🎶", icon: "🎵" },
        { text: "Confess a crush anonymously on our Confession Wall 💬", icon: "💭" },
        { text: "Text your match: 'You make my heart skip a beat' 💖", icon: "💝" },
        { text: "Make a voice note saying something sweet 🎙️", icon: "🗣️" },
        { text: "Share your favorite memory with your match 📸", icon: "📸" },
        { text: "Write a short love poem 📝", icon: "✍️" },
        { text: "Send a virtual hug 🤗", icon: "🫂" }
    ]

    const getNextSpinResult = (prevIndex) => {
        // Get a random index that's not the same as the last one
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * dares.length);
        } while (newIndex === prevIndex);
        
        return newIndex;
    }

    const handleAcceptChallenge = () => {
        setAccepted(true)
        alert("Challenge Accepted! Post a selfie with your match 💕")
    }

    const handleSpinWheel = () => {
        if (isSpinning) return
        
        setIsSpinning(true)
        setDare("")
        
        const minSpins = 5
        const maxSpins = 8
        const spins = minSpins + Math.random() * (maxSpins - minSpins)
        
        const nextIndex = getNextSpinResult(lastIndex)
        const baseAngle = (nextIndex * 360) / dares.length
        const totalRotation = (spins * 360) + baseAngle
        
        setRotation(prevRotation => prevRotation + totalRotation)
        setLastIndex(nextIndex)

        setTimeout(() => {
            setDare(dares[nextIndex].text)
            setIsSpinning(false)
        }, 4500)
    }

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    Valentine's Challenges 💝
                </h2>

                <div className="max-w-2xl mx-auto mb-16">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300">
                        <h3 className="text-2xl font-semibold mb-6 text-pink-600">
                            Secret Valentine 💌
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg">
                            Send an anonymous valentine message to your crush!
                        </p>
                        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:opacity-90 transition text-xl">
                            Send Secret Valentine
                        </button>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-3xl font-semibold mb-8 text-pink-600">
                            Spin for Love 💫
                        </h3>
                        <div className="relative">

                            <div className="wheel-container mx-auto relative" style={{ width: '500px', height: '500px' }}>
                                <div 
                                    ref={wheelRef}
                                    className="wheel absolute w-full h-full rounded-full"
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                        transition: 'transform 4.5s cubic-bezier(0.2, 0.8, 0.1, 0.99)',
                                    }}
                                >
                                    {dares.map((dare, index) => (
                                        <div
                                            key={index}
                                            className="absolute w-full h-full"
                                            style={{
                                                transform: `rotate(${(index * 360) / dares.length}deg)`,
                                            }}
                                        >
                                            <div 
                                                className="absolute w-1/2 h-[2px] right-0 top-1/2 origin-left"
                                                style={{
                                                    background: 'linear-gradient(90deg, transparent, rgba(219, 39, 119, 0.3))'
                                                }}
                                            />
                                            <div 
                                                className="absolute right-12 top-1/2 -translate-y-1/2"
                                                style={{
                                                    transform: `rotate(${-(index * 360) / dares.length}deg) rotate(${-rotation}deg)`,
                                                }}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl filter drop-shadow-md">{dare.icon}</span>
                                                    <div className="h-1.5 w-1.5 rounded-full bg-pink-300"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div 
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 pointer-container"
                                >
                                    <div className="pointer"></div>
                                </div>
                                <div 
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                    style={{ width: '100px', height: '100px' }}
                                >
                                    <button
                                        onClick={handleSpinWheel}
                                        disabled={isSpinning}
                                        className={`w-full h-full rounded-full bg-white shadow-lg border-2 border-pink-300 flex items-center justify-center text-xl font-medium text-pink-500 hover:scale-105 hover:border-pink-400 transition-all duration-300 ${
                                            isSpinning ? 'cursor-not-allowed opacity-50' : ''
                                        }`}
                                    >
                                        {isSpinning ? '✨' : 'Spin!'}
                                    </button>
                                </div>
                            </div>
                            {dare && (
                                <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                                    <p className="text-2xl font-medium text-pink-600">
                                        {dare}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    className="mt-12 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-5 rounded-2xl shadow-2xl hover:opacity-90 transition text-2xl"
                    onClick={() =>
                        alert(
                            "Redirecting to quiz page... (You can link this to /quiz)"
                        )
                    }
                >
                    💖 What Kind of Lover Are You? - Take the Quiz!
                </button>
            </div>

            <style jsx>{`
                .wheel {
                    background: radial-gradient(circle at center, white 55%, rgba(219, 39, 119, 0.08) 56%, rgba(219, 39, 119, 0.15) 100%);
                    box-shadow: 0 0 30px rgba(219, 39, 119, 0.15);
                }
                .pointer-container {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    filter: drop-shadow(0 2px 4px rgba(219, 39, 119, 0.3));
                }
                .pointer {
                    width: 0;
                    height: 0;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-top: 35px solid rgb(236, 72, 153);
                    position: relative;
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(219, 39, 119, 0.2); }
                    50% { box-shadow: 0 0 30px rgba(219, 39, 119, 0.4); }
                }
                .wheel:not(.spinning) {
                    animation: glow 3s infinite;
                }
            `}</style>
        </section>
    )
}

export default Challenges
