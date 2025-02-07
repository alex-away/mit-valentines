import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const MatchFinder = () => {
    const [matchData, setMatchData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const findMatch = async () => {
        setIsLoading(true)
        setError("")
        const token = localStorage.getItem("token")

        if (!token) {
            setError("Please login first!")
            navigate("/login")
            return
        }

        try {
            const response = await fetch(
                "https://mit-valentines.onrender.com/user/find-match",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to find match")
            }

            setMatchData(data)
        } catch (err) {
            setError(err.message || "Something went wrong")
            console.error("Match finding error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-pink-600 mb-2">
                    Find Your Valentine Match 💘
                </h2>
                <p className="text-gray-600">
                    Click to discover your perfect match!
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <button
                onClick={findMatch}
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 
                text-white rounded-lg font-medium transition-all transform
                ${
                    !isLoading
                        ? "hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5"
                        : "opacity-75 cursor-not-allowed"
                }`}
            >
                {isLoading ? "Finding Your Match..." : "Find My Match 💝"}
            </button>

            {matchData && (
                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-pink-600 mb-3">
                        Your Match! 🎉
                    </h3>
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Name:</span>{" "}
                            {matchData.name}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Username:</span>{" "}
                            {matchData.username}
                        </p>
                        {matchData.hobbies && (
                            <p className="text-gray-700">
                                <span className="font-medium">Hobbies:</span>{" "}
                                {matchData.hobbies.join(", ")}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MatchFinder 