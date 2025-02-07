const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const UserRouter = require("./routes/userRoutes")
const ConfessionRouter = require("./routes/confessionRoutes")

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Local frontend
            "https://your-frontend-vercel-url.vercel.app", // Production frontend
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
)
app.use(express.json())
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("Hello World!")
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
