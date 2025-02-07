import MainLayout from "./layouts/MainLayout/MainLayout"
import Hero from "./components/Hero/Hero"
import ProfileSection from "./sections/ProfileSection/ProfileSection"
import ConfessionWall from "./sections/ConfessionWall/ConfessionWall"
import Challenges from "./sections/Challenges/Challenges"
import ChallengesTest from "./sections/Challenges/ChallengesTest"
import Quiz from "./sections/Challenges/quiz"
import "./App.css"

function App() {
    return (
        <MainLayout>
            <Hero />
            <ProfileSection isMatched={false} />
            <ConfessionWall />
            <Challenges />
            <Quiz />
            <ChallengesTest />
        </MainLayout>
    )
}

export default App
