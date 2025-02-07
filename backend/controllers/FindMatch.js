const express = require("express")
const { USER_DATA } = require("../models/userDb")
const jwt = require("jsonwebtoken")

// Function to calculate hobby match percentage
const calculateHobbyMatch = (userHobbies, potentialMatchHobbies) => {
    if (!userHobbies || !potentialMatchHobbies) return 0
    const matchingHobbies = userHobbies.filter((hobby) =>
        potentialMatchHobbies.includes(hobby)
    )
    return (matchingHobbies.length / userHobbies.length) * 100
}

// Function to find potential matches
const findPotentialMatches = async (user) => {
    try {
        // Find users of opposite gender
        const oppositeGender = user.gender === "Male" ? "Female" : "Male"
        const potentialMatches = await USER_DATA.find({
            gender: oppositeGender,
            Hobbies: { $exists: true, $ne: [] }, // Only users with hobbies
        })

        // Calculate match percentages
        const matchesWithScores = potentialMatches.map((match) => ({
            userId: match._id,
            name: match.Name,
            username: match.User_Name,
            hobbies: match.Hobbies,
            matchPercentage: calculateHobbyMatch(user.Hobbies, match.Hobbies),
        }))

        // Sort by match percentage
        return matchesWithScores.sort(
            (a, b) => b.matchPercentage - a.matchPercentage
        )
    } catch (error) {
        throw new Error("Error finding matches: " + error.message)
    }
}

exports.findMatch = async (req, res) => {
    const { token } = req.headers
    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY)

        if (!userId) return res.json({ status: 401, error: "Unauthorized" })
        const user = await USER_DATA.findOne({ _id: userId })

        if (!user.Hobbies || user.Hobbies.length === 0)
            return res.json({
                status: 401,
                error: "Please add some hobbies first!",
            })

        const matches = await findPotentialMatches(user)

        if (!matches || matches.length === 0) {
            return res.json({
                status: 404,
                message: "No matches found with similar hobbies",
            })
        }

        // Return the best match
        const bestMatch = matches[0]
        res.json({
            status: 200,
            match: {
                name: bestMatch.name,
                username: bestMatch.username,
                hobbies: bestMatch.hobbies,
                matchPercentage: Math.round(bestMatch.matchPercentage),
            },
        })
    } catch (error) {
        console.error("Match finding error:", error)
        res.status(500).json({ message: error.message })
    }
}
