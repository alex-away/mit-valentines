import MainLayout from "./layouts/MainLayout/MainLayout"
import Hero from "./components/Hero/Hero"
import ProfileSection from "./sections/ProfileSection/ProfileSection"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall"
import Challenges from "./sections/Challenges/Challenges"
import Quiz from "./sections/Challenges/quiz"
import React from "react"
import "./App.css"

function App() {
    return (
        <MainLayout>
            <Hero />
            <ProfileSection isMatched={false} />
            <ConfessionWall />
            <Challenges />
            <Quiz />
        </MainLayout>
    )
}

export default App
