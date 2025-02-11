import { useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PeopleSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [votedUser, setVotedUser] = useState(null);
  const [error, setError] = useState("");
  const [showVotePopup, setShowVotePopup] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to see other users!");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await fetch("https://mit-valentines.onrender.com/user/all-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.status === 200 && Array.isArray(data.users)) {
        // Filter valid users and shuffle them randomly
        const validUsers = data.users
          .filter(user => user && user.Name && user.User_Name);
        
        // Fisher-Yates shuffle algorithm
        const shuffledUsers = [...validUsers];
        for (let i = shuffledUsers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
        }
        
        setUsers(shuffledUsers);
      } else {
        console.error("Invalid user data received:", data);
        setError("Failed to load users data properly");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    }
  };

  // Love Function (One Vote Only)
  const handleLove = async (email) => {
    if (votedUser) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to vote!");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await fetch("https://mit-valentines.onrender.com/user/update-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confessionEmail: email }),
      });

      const data = await response.json();
      
      if (data.status === 200) {
        setVotedUser(email);
        // Floating heart animation
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerHTML = "❤️";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
        // Refresh users list to update vote counts
        fetchUsers();
      } else {
        setError(data.error || "Failed to vote. Please try again.");
      }
    } catch (err) {
      console.error("Error voting:", err);
      setError("Failed to vote. Please try again later.");
    }
  };

  const getDisplayedUsers = () => {
    if (search.trim()) {
      // Show all users that match the search criteria
      return users.filter(user => {
        const searchTerm = search.toLowerCase();
        const searchFields = [
          user.Name?.toLowerCase(),          // Full name
          user.User_Name?.toLowerCase(),     // Username
          user.gender?.toLowerCase(),        // Gender
          user.Hobbies?.join(' ').toLowerCase(), // All hobbies combined
        ].filter(Boolean);

        return searchFields.some(field => field.includes(searchTerm));
      });
    }
    // If no search, show only 4 random users
    return users.slice(0, 4);
  };

  const scrollToVoting = () => {
    const votingSection = document.getElementById('voting-section');
    if (votingSection) {
      votingSection.scrollIntoView({ behavior: 'smooth' });
      setShowVotePopup(false);
    }
  };

  return (
    <>
      {/* Voting Alert Popup */}
      <AnimatePresence>
        {showVotePopup && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-lg">💘</span>
                    <h3 className="text-white font-semibold">Valentine's Voting</h3>
                  </div>
                  <button
                    onClick={() => setShowVotePopup(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 mb-4">
                  Valentine's voting has started! Cast your secret vote and spread the love! 💕
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowVotePopup(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={scrollToVoting}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white 
                    rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Vote Now</span>
                    <span>❤️</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="voting-section" className="py-12 bg-gradient-to-b from-pink-100 to-red-200 min-h-screen flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xl"></div>

        <div className="max-w-4xl w-full mx-auto p-8 relative z-10">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="text-center bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/30">
            <h2 className="text-5xl font-extrabold text-pink-600 drop-shadow-lg">💘 Secret Love Vote 💘</h2>
            <p className="text-gray-700 mt-2 italic">You only get one chance. Make it special!</p>
          </div>

          <input
            type="text"
            className="w-full p-3 border border-white/40 rounded-2xl mt-4 text-lg shadow-lg bg-white/20 backdrop-blur-md focus:ring-2 focus:ring-pink-400 transition-all outline-none text-gray-900"
            placeholder="🔍 Search by name, username, or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search ? (
            <p className="text-center text-gray-600 mt-4 italic">
              Showing all users matching "{search}" ✨
            </p>
          ) : (
            <p className="text-center text-gray-600 mt-4 italic">
              Showing random suggestions. Search to find more! ✨
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6 mt-6 relative z-10">
            {!votedUser ? (
              getDisplayedUsers().length > 0 ? (
                getDisplayedUsers().map((user) => (
                  <motion.div
                    key={user.email}
                    whileHover={{ scale: 1.05 }}
                    className="relative flex items-center p-4 rounded-3xl shadow-xl border border-white/30 bg-white/20 backdrop-blur-md"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold text-xl text-gray-800">{user.Name}</p>
                      <p className="text-gray-600">@{user.User_Name}</p>
                      
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLove(user.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition flex items-center"
                    >
                      <FaHeart className="mr-2" /> Vote ❤️
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-800 font-semibold text-xl col-span-2">
                  No users found matching your search 🔍
                </div>
              )
            ) : (
              <div className="text-center mt-6 text-gray-800 font-semibold text-xl col-span-2">
                ❤️ You have already used your vote! ❤️
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PeopleSearch;
