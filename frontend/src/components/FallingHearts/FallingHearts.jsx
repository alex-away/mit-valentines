import React from 'react';

const FallingHearts = () => {
  const hearts = [];
  for (let i = 0; i < 10; i++) {
    const startPosition = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 6 + Math.random() * 4;
    
    hearts.push(
      <div
        key={i}
        className="absolute text-2xl pointer-events-none animate-falling"
        style={{
          left: `${startPosition}%`,
          animation: `falling ${duration}s linear ${delay}s infinite`,
        }}
      >
        💝
      </div>
    );
  }
  return hearts;
};

export default FallingHearts; 