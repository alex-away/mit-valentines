import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import Hero from "./sections/DASHBOARD/Hero.jsx"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall.jsx"
import Challenges from "./sections/Challenges/Challenges.jsx"
import ProfileSection from "./sections/ProfileSection/ProfileSection.jsx"
import Quiz from "./sections/Challenges/quiz.jsx"
import ChallengesTest from "./sections/Challenges/ChallengesTest.jsx"
import React from "react"
import "./App.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Hero />
        <ConfessionWall />
        <Challenges />
        <Quiz />
        <ChallengesTest />
        <ProfileSection />
    </StrictMode>
)
