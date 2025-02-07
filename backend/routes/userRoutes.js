const express = require("express")
const {
    registerUser,
    loginUser,
    updateHobbies,
} = require("../controllers/AuthControllers")
const { findMatch } = require("../controllers/FindMatch")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const { USER_DATA } = require("../models/userDb")

UserRouter.post("/register", registerUser)
UserRouter.post("/login", loginUser)
UserRouter.post("/update-hobbies", updateHobbies)
UserRouter.get("/find-match", findMatch)
UserRouter.get("/get-profile", async (req, res) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ status: 401, error: "No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await USER_DATA.findOne({ _id: decoded.userId })

        if (!user) {
            return res.json({ status: 404, error: "User not found" })
        }

        res.json({
            status: 200,
            username: user.User_Name,
            hobbies: user.Hobbies || [],
            gender: user.gender,
            name: user.Name,
        })
    } catch (error) {
        console.error("Profile fetch error:", error)
        res.status(500).json({
            status: 500,
            error: "Failed to fetch profile",
        })
    }
})

module.exports = UserRouter
