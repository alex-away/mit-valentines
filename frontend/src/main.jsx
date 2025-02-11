import { StrictMode } from "react"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Hero from "./sections/DASHBOARD/Hero.jsx"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall.jsx"
import Challenges from "./sections/Challenges/Challenges.jsx"
import Quiz from "./sections/Challenges/quiz.jsx"
import LoginForm from "./components/LoginForm"
import MatchFinder from "./components/MatchFinder/MatchFinder"
import HobbiesForm from "./components/HobbiesForm/HobbiesForm"
import PeopleSearch from "./components/PeopleSearch/PeopleSearch.jsx"

const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Hero />

        <ConfessionWall  />
        <PeopleSearch />
        <Challenges />
        <Quiz />
        

        {/* Bottom Section with Match and Hobbies */}
        <div className="bg-gradient-to-br from-pink-100/50 to-purple-100/50 py-16">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    Find Your Perfect Match 💘
                </h2>
                <div className="flex flex-col gap-8">
                    <div className="transform hover:scale-[1.02] transition-all duration-300">
                        <MatchFinder />
                    </div>
                    <div className="transform hover:scale-[1.02] transition-all duration-300">
                        <HobbiesForm />
                    </div>
                </div>
            </div>
        </div>
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
