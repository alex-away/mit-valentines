import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const PREDEFINED_HOBBIES = [
    "Reading 📚",
    "Gaming 🎮",
    "Music 🎵",
    "Dancing 💃",
    "Cooking 👨‍🍳",
    "Photography 📸",
    "Traveling ✈️",
    "Fitness 💪",
    "Painting 🎨",
    "Writing ✍️",
    "Movies 🎬",
    "Singing 🎤",
    "Sports ⚽",
    "Yoga 🧘‍♀️",
    "Hiking 🏃‍♂️",
    "Chess ♟️",
    "Gardening 🌱",
    "Fashion 👗",
    "Coding 💻",
    "Astronomy 🔭"
]

const HobbiesForm = () => {
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const toggleHobby = (hobby) => {
        setSelectedHobbies(prev => 
            prev.includes(hobby)
                ? prev.filter(h => h !== hobby)
                : [...prev, hobby]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedHobbies.length === 0) {
            setError("Please select at least one hobby!")
            return
        }

        setIsSubmitting(true)
        setError("")
        setSuccess("")

        const token = localStorage.getItem("token")
        if (!token) {
            setError("Please login first!")
            navigate("/login")
            return
        }

        try {
            const response = await fetch(
                "https://mit-valentines.onrender.com/user/update-hobbies",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ hobbies: selectedHobbies }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to update hobbies")
            }

            setSuccess("Hobbies updated successfully!")
        } catch (err) {
            setError(err.message || "Something went wrong")
            console.error("Hobbies update error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden m-4 p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-pink-600 mb-2">
                    Select Your Hobbies ✨
                </h2>
                <p className="text-gray-600">
                    Choose the activities you love! (Select multiple)
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {PREDEFINED_HOBBIES.map((hobby) => (
                        <button
                            key={hobby}
                            type="button"
                            onClick={() => toggleHobby(hobby)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 
                                ${
                                    selectedHobbies.includes(hobby)
                                        ? "bg-pink-500 text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }
                            `}
                        >
                            {hobby}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Selected: {selectedHobbies.length} / {PREDEFINED_HOBBIES.length}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || selectedHobbies.length === 0}
                        className={`px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 
                        text-white rounded-lg font-medium transition-all transform
                        ${
                            !isSubmitting && selectedHobbies.length > 0
                                ? "hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5"
                                : "opacity-75 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "Updating..." : "Save Hobbies"}
                    </button>
                </div>
            </form>

            {selectedHobbies.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Your Selected Hobbies:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedHobbies.map((hobby) => (
                            <span
                                key={hobby}
                                className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-700 rounded-full"
                            >
                                {hobby}
                                <button
                                    type="button"
                                    onClick={() => toggleHobby(hobby)}
                                    className="ml-2 text-pink-600 hover:text-pink-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HobbiesForm 