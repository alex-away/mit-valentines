const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const UserRouter = require("./routes/userRoutes")
const ConfessionRouter = require("./routes/confessionRoutes")
const { sendRegsiterMail } = require("./services/mailservices")

const port = process.env.PORT || 3000

// sendRegsiterMail("test", "test", "test")

app.use(bodyParser.json())

app.use(
    cors({
        origin: [
            "http://localhost:5173", // Local frontend
            "https://mit-valentines.vercel.app", // Production frontend
            "https://mit-valentines.onrender.com", // Backend URL (for testing)
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
)
app.use(express.json())

app.get("/", (req, res) => {
    
    res.send("Hello MITian's FUCK YOU!")
})

app.use("/user", UserRouter)
app.use("/confession", ConfessionRouter)

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error)
    })
