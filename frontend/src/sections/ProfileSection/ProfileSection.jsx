import { useState } from 'react';
import React from 'react';
const ProfileSection = ({ isMatched }) => {
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {isMatched ? (
          <div className="text-center">
            <img 
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-400"
              src="placeholder-profile.jpg" 
              alt="Match Profile" 
            />
            <h3 className="text-2xl font-bold mb-4">Your Match's Name</h3>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
              💬 DM Your Match
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="text-3xl mb-4">💖</div>
              <p className="text-xl text-gray-600">Searching for Your Perfect Match...</p>
            </div>
          </div>
        )}
        <button className="w-full mt-6 bg-purple-100 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-200 transition">
          💌 See Secret Admirer Messages
        </button>
      </div>
    </section>
  );
};

export default ProfileSection; 