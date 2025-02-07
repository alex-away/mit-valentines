import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./App.css"
import Hero from "./sections/DASHBOARD/Hero.jsx"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall.jsx"
import Challenges from "./sections/Challenges/Challenges.jsx"
import ProfileSection from "./sections/ProfileSection/ProfileSection.jsx"
import Quiz from "./sections/Challenges/quiz.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Hero />
        <ConfessionWall />
        <Quiz />
        <Challenges />
        <ProfileSection isMatched={false} />
    </StrictMode>
)
