import { useState, useEffect } from "react"
import React from "react"

const ConfessionWall = () => {
    const [confessions, setConfessions] = useState([])
    const [newConfession, setNewConfession] = useState("")
    const [isPosting, setIsPosting] = useState(false)

    const fetchConfessions = async () => {
        try {
            const response = await fetch("http://localhost:3000/confession/all")
            const data = await response.json()
            if (data.status === 200) {
                setConfessions(data.confessions)
            }
        } catch (error) {
            console.error("Failed to fetch confessions:", error)
        }
    }

    const postConfession = async () => {
        if (!newConfession.trim()) return

        setIsPosting(true)
        try {
            const response = await fetch(
                "http://localhost:3000/confession/post",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: newConfession }),
                }
            )
            const data = await response.json()
            if (data.status === 201) {
                setNewConfession("")
                fetchConfessions()
            }
        } catch (error) {
            console.error("Failed to post confession:", error)
        }
        setIsPosting(false)
    }

    useEffect(() => {
        fetchConfessions()
    }, [])

    return (
        <section className="py-16 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
                        Confession Wall 💝
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Share your feelings anonymously with the MIT-AoE
                        community
                    </p>
                </div>

                {/* Confession Form */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-12 transform transition-all duration-300 hover:shadow-2xl border border-pink-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Write Your Confession ✨
                    </h3>
                    <textarea
                        value={newConfession}
                        onChange={(e) => setNewConfession(e.target.value)}
                        className="w-full h-32 p-4 border border-pink-200 rounded-xl mb-4 
                        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent
                        text-gray-700 text-base resize-none transition-all duration-300
                        placeholder:text-gray-400 placeholder:text-sm"
                        placeholder="Pour your heart out... Your secret is safe with us 💖"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={postConfession}
                            disabled={isPosting || !newConfession.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 
                            text-white rounded-xl hover:from-pink-600 hover:to-purple-600 
                            disabled:opacity-50 transition-all duration-300 transform 
                            hover:-translate-y-1 active:translate-y-0 text-base
                            disabled:hover:transform-none shadow-md hover:shadow-xl"
                        >
                            {isPosting ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Posting...
                                </span>
                            ) : (
                                "Share Your Confession 💝"
                            )}
                        </button>
                    </div>
                </div>

                {/* Confessions List */}
                <div className="space-y-6">
                    {confessions.map((confession) => (
                        <div
                            key={confession._id}
                            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg 
                            hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                            border border-pink-50"
                        >
                            <p className="text-gray-800 text-lg leading-relaxed">
                                {confession.message}
                            </p>
                            <div className="mt-4 text-sm text-gray-500 flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                {new Date(
                                    confession.timestamp
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ConfessionWall
