import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout/MainLayout"
import Hero from "./components/Hero/Hero"
import ProfileSection from "./sections/ProfileSection/ProfileSection"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall"
import Challenges from "./sections/Challenges/Challenges"
import Quiz from "./sections/Challenges/quiz"
import LoginForm from "./components/LoginForm"
import "./App.css"

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            {/* <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={
                    <MainLayout>
                        <Hero />
                        <ConfessionWall />
                        <Challenges />
                        <Quiz />
                        <ProfileSection isMatched={false} />
                    </MainLayout>
                } />
            </Routes> */}
        </div>
    )
}

export default App
