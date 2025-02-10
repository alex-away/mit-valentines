import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const MatchFinder = () => {
    const [matchData, setMatchData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [userHobbies, setUserHobbies] = useState([])
    const navigate = useNavigate()

    // Check if user has hobbies when component mounts
    useEffect(() => {
        checkUserHobbies()
    }, [])

    const checkUserHobbies = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const response = await fetch(
                "https://mit-valentines.onrender.com/user/get-profile",
                {
                    headers: {
                        token: token,
                    },
                }
            )
            const data = await response.json()
            if (data.hobbies) {
                setUserHobbies(data.hobbies)
            }
        } catch (err) {
            console.error("Error fetching user hobbies:", err)
        }
    }

    const findMatch = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setError("Please login first to find your match! 💝")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // First check if user has hobbies
            const profileResponse = await fetch(
                "https://mit-valentines.onrender.com/user/get-profile",
                {
                    headers: {
                       token: token,
                    },
                }
            )

            const profileData = await profileResponse.json()
            console.log(profileData.user.hobbies)
            if (!profileData.user.hobbies || profileData.user.hobbies.length == 0) {
                console.log("No hobbies found")
                setError(
                    "Please select your hobbies first! Scroll down to add them 💕"
                )

                document.querySelector("#hobbies-section")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                })
                setIsLoading(false)
                return
            }

            // Then find match
            const matchResponse = await fetch(
                "https://mit-valentines.onrender.com/user/find-match",
                {
                    headers: {
                        token: token,
                    },
                }
            )

            if (!matchResponse.ok) {
                throw new Error("Failed to connect to server")
            }

            const data = await matchResponse.json()

            if (data.status === 404) {
                setError(
                    "No matches found with similar hobbies. Try selecting different hobbies!"
                )
                return
            }

            if (data.status === 401) {
                setError(data.error || "Please try again")
                return
            }

            if (data.status === 200 && data.match) {
                setMatchData(data)
            } else {
                throw new Error("Unexpected response from server")
            }
        } catch (err) {
            setError(err.message || "Failed to find match. Please try again.")
            console.error("Match finding error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                    {error}
                </div>
            )}

            <button
                onClick={findMatch}
                disabled={isLoading}
                className={`w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 
                text-white rounded-xl font-medium text-lg transition-all
                ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
                {isLoading ? "Finding Your Match..." : "Find My Valentine 💝"}
            </button>

            {matchData && matchData.match && (
                <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                    <h3 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
                        Match Found! 💘
                    </h3>
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-purple-600">
                                {matchData.match.matchPercentage}% Match!
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Based on your shared interests
                            </p>
                        </div>
                        <p className="text-gray-700 flex justify-between items-center text-lg">
                            <span className="font-medium">Name:</span>
                            <span>{matchData.match.name}</span>
                        </p>
                        <p className="text-gray-700 flex justify-between items-center text-lg">
                            <span className="font-medium">Username:</span>
                            <span>{matchData.match.username}</span>
                        </p>
                        {matchData.match.hobbies && (
                            <div className="text-gray-700">
                                <p className="font-medium mb-3 text-lg">
                                    Shared Hobbies:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {matchData.match.hobbies.map(
                                        (hobby, index) => (
                                            <span
                                                key={index}
                                                className={`px-4 py-2 rounded-full text-sm
                                                ${
                                                    userHobbies.includes(hobby)
                                                        ? "bg-pink-100 text-pink-700"
                                                        : "bg-white text-gray-600"
                                                }`}
                                            >
                                                {hobby}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MatchFinder
