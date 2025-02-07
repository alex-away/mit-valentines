import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Hero from "./sections/DASHBOARD/Hero.jsx"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall.jsx"
import Challenges from "./sections/Challenges/Challenges.jsx"
import ProfileSection from "./sections/ProfileSection/ProfileSection.jsx"
import Quiz from "./sections/Challenges/quiz.jsx"
import LoginForm from "./components/LoginForm"
import MatchFinder from "./components/MatchFinder/MatchFinder"
import HobbiesForm from "./components/HobbiesForm/HobbiesForm"

const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Hero />
        <MatchFinder />
        <HobbiesForm />
        <ConfessionWall />
        <Quiz />
        <Challenges />
        <ProfileSection isMatched={false} />
    </div>
)

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
