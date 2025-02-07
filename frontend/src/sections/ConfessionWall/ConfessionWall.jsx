import { useState } from 'react';
import React from 'react';
const ConfessionWall = () => {
  const [confessions, setConfessions] = useState([
    {
      id: 1,
      message: "To the girl in the white dress at the library 📖... You stole my heart! ❤️",
      timestamp: new Date()
    }
    // Add more sample confessions
  ]);

  return (
    <section className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Confession Wall 💬</h2>
        
        <button className="w-full mb-8 bg-white text-pink-600 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
          💖 Post Your Confession
        </button>

        <div className="space-y-4">
          {confessions.map(confession => (
            <div key={confession.id} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-800">{confession.message}</p>
              <div className="mt-2 text-sm text-gray-500">
                {confession.timestamp.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConfessionWall; 