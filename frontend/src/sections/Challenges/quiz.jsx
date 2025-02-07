import { useState } from 'react';
import React from 'react';
const quizQuestions = [
  {
    question: "What's your ideal date?",
    options: ["Romantic dinner 🍷", "Movie night 🎬", "Adventure trip ⛰️", "Chilling at home 🏡"],
  },
  {
    question: "How do you express love?",
    options: ["Gifts 🎁", "Quality time ❤️", "Physical touch 🤗", "Words of affirmation 💬"],
  },
  {
    question: "What's your love language?",
    options: ["Acts of service ✨", "Deep conversations 🗣️", "Hugs & kisses 😘", "Spontaneous surprises 🎉"],
  },
  {
    question: "Pick a romantic movie:",
    options: ["Titanic 🚢", "The Notebook 💌", "La La Land 🎶", "A Walk to Remember 🌹"],
  },
  {
    question: "Your dream Valentine’s gift?",
    options: ["Love letter 💌", "Surprise vacation ✈️", "Handmade gift 🎨", "A cozy date night 🍷"]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion === quizQuestions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    const romanticAnswers = ["Romantic dinner 🍷", "Quality time ❤️", "Hugs & kisses 😘", "The Notebook 💌", "Love letter 💌"];
    const adventurousAnswers = ["Adventure trip ⛰️", "Acts of service ✨", "Spontaneous surprises 🎉", "La La Land 🎶", "Surprise vacation ✈️"];
    
    const romanticScore = answers.filter(a => romanticAnswers.includes(a)).length;
    const adventurousScore = answers.filter(a => adventurousAnswers.includes(a)).length;

    if (romanticScore > adventurousScore) return "You are a Romantic Lover ❤️";
    if (adventurousScore > romanticScore) return "You are an Adventurous Lover 🌍";
    return "You are a Balanced Lover 💖";
  };

  return (
    <section className="py-12 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">💖 Love Personality Quiz</h2>
      {showResult ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">{getResult()}</h3>
          <button 
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            onClick={restartQuiz}
          >
            Restart Quiz 🔄
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">{quizQuestions[currentQuestion].question}</h3>
          <div className="grid grid-cols-2 gap-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Quiz;
