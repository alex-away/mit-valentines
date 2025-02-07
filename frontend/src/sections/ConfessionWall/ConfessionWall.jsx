import React, { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL

const ConfessionWall = () => {
    const [confessions, setConfessions] = useState([])
    const [newConfession, setNewConfession] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const fetchConfessions = async () => {
        try {
            const response = await fetch(`${API_URL}/confession/all`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.status === 200) {
                setConfessions(data.confessions)
            }
        } catch (error) {
            console.error("Fetch error details:", {
                message: error.message,
                apiUrl: API_URL,
                stack: error.stack,
            })
        }
    }

    const postConfession = async () => {
        if (!newConfession.trim()) return

        setIsPosting(true)
        try {
            const response = await fetch(`${API_URL}/confession/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: newConfession }),
            })
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

    const featuredConfessions = confessions.slice(0, 4)
    const scrollableConfessions = confessions.slice(4)

    return (
        <section className="py-8 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                        Confession Wall 💝
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Share your feelings anonymously
                    </p>
                </div>

                {/* Collapsible Confession Form */}
                <div className="mb-8">
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-xl 
                        text-pink-600 hover:bg-white/90 transition-all duration-300
                        shadow-md hover:shadow-lg text-sm font-medium"
                    >
                        {isFormOpen ? "Close ×" : "✨ Write a Confession"}
                    </button>

                    {isFormOpen && (
                        <div className="mt-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                            <textarea
                                value={newConfession}
                                onChange={(e) =>
                                    setNewConfession(e.target.value)
                                }
                                className="w-full h-24 p-3 border border-pink-200 rounded-lg mb-3
                                focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                                placeholder="Pour your heart out... Your secret is safe with us 💖"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={postConfession}
                                    disabled={
                                        isPosting || !newConfession.trim()
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 
                                    text-white rounded-lg text-sm hover:from-pink-600 hover:to-purple-600 
                                    disabled:opacity-50 transition-all duration-300"
                                >
                                    {isPosting ? "Posting..." : "Share 💝"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Featured Confessions Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {featuredConfessions.map((confession) => (
                        <div
                            key={confession._id}
                            className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow 
                            hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <p className="text-gray-800 text-sm leading-relaxed">
                                {confession.message}
                            </p>
                            <div className="mt-2 text-xs text-gray-500">
                                {new Date(
                                    confession.timestamp
                                ).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scrollable Confessions */}
                {scrollableConfessions.length > 0 && (
                    <div className="overflow-x-auto custom-scrollbar -mx-4 px-4">
                        <div className="flex gap-4 pb-4 min-w-max">
                            {scrollableConfessions.map((confession) => (
                                <div
                                    key={confession._id}
                                    className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow
                                    hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
                                    w-72 flex-shrink-0"
                                >
                                    <p className="text-gray-800 text-sm leading-relaxed">
                                        {confession.message}
                                    </p>
                                    <div className="mt-2 text-xs text-gray-500">
                                        {new Date(
                                            confession.timestamp
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ConfessionWall
