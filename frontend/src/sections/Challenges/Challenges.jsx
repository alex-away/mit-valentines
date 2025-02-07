import { useState } from 'react';
import React from 'react';

const Challenges = () => {
  const [accepted, setAccepted] = useState(false);
  const [dare, setDare] = useState('');

  // Fun dares for Spin the Wheel
  const dares = [
    "Send a cute emoji to your match! 💌",
    "Post a romantic song on your story 🎶",
    "Confess a crush anonymously on our Confession Wall 💬",
    "Text your match: 'You make my heart skip a beat' 💖",
    "Make a voice note saying something sweet 🎙️"
  ];

  // Function to handle challenge acceptance
  const handleAcceptChallenge = () => {
    setAccepted(true);
    alert("Challenge Accepted! Post a selfie with your match 💕");
  };

  // Function to spin the wheel and get a random dare
  const handleSpinWheel = () => {
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    setDare(randomDare);
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Fun Challenges 📸</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Daily Story Challenge */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Daily Story Challenge</h3>
            <p className="text-gray-600 mb-6 text-lg">💘 Post a selfie with your match & tag us!</p>
            <button 
              onClick={handleAcceptChallenge}
              className={`bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition text-lg ${accepted ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={accepted}
            >
              {accepted ? "Challenge Accepted ✅" : "Accept Challenge"}
            </button>
          </div>

          {/* Spin the Wheel Game */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Spin the Wheel 🎡</h3>
            <button 
              onClick={handleSpinWheel}
              className="w-full bg-purple-500 text-white px-8 py-10 rounded-2xl hover:bg-purple-600 transition text-xl"
            >
              Spin for a Fun Dare!
            </button>
            {dare && <p className="mt-6 text-xl font-semibold text-purple-700">{dare}</p>}
          </div>
        </div>

        {/* New Features */}
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Love Compatibility Test 💑</h3>
            <p className="text-gray-600 mb-6 text-lg">Enter your and your crush's name to see how compatible you are!</p>
            <button className="w-full bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600 transition text-xl">
              Check Compatibility
            </button>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Secret Valentine 💌</h3>
            <p className="text-gray-600 mb-6 text-lg">Send an anonymous valentine message to your crush!</p>
            <button className="w-full bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition text-xl">
              Send Secret Valentine
            </button>
          </div>
        </div>

        {/* More Fun Features */}
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Virtual Love Notes 💕</h3>
            <p className="text-gray-600 mb-6 text-lg">Leave an anonymous sweet message on the Love Board!</p>
            <button className="w-full bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition text-xl">
              Write a Love Note
            </button>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Emoji Compatibility Test 🤗</h3>
            <p className="text-gray-600 mb-6 text-lg">Enter your favorite emojis to see if your match vibes with you!</p>
            <button className="w-full bg-yellow-500 text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition text-xl">
              Test Emoji Match
            </button>
          </div>
        </div>

        {/* Blind Matchmaker Game */}
        <div className="mt-12 bg-white p-10 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6">Blind Matchmaker Game 🎭</h3>
          <p className="text-gray-600 mb-6 text-lg">Answer some random fun questions and get matched with a mystery person!</p>
          <button className="w-full bg-teal-500 text-white px-8 py-4 rounded-xl hover:bg-teal-600 transition text-xl">
            Try Blind Matchmaker
          </button>
        </div>

        {/* Quiz Section */}
        <button 
          className="mt-12 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-5 rounded-2xl shadow-2xl hover:shadow-2xl transition text-2xl"
          onClick={() => alert("Redirecting to quiz page... (You can link this to /quiz)")}
        >
          💖 What Kind of Lover Are You? - Take the Quiz!
        </button>
      </div>
    </section>
  );
};

export default Challenges;
