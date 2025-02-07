import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from "./sections/DASHBOARD/Hero.jsx"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall.jsx"
import Challenges from "./sections/Challenges/Challenges.jsx"
import ProfileSection from "./sections/ProfileSection/ProfileSection.jsx"
import Quiz from "./sections/Challenges/quiz.jsx"
import LoginForm from "./components/LoginForm"
import MainLayout from "./layouts/MainLayout/MainLayout"

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={
                    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
                        <Hero />
                        <ConfessionWall />
                        <Quiz />
                        <Challenges />
                        <ProfileSection isMatched={false} />
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
