import React from 'react';
import './ConfettiExplosion.css';

const ConfettiExplosion = () => {
  const particleCount = 250; // 300 particles per corner
  const colors = ['#F87B7C', '#FFC107', '#39D1B4', '#FA9C9D', '#FFFFFF'];

  const renderParticles = (side) => {
    return [...Array(particleCount)].map((_, i) => {
      // Horizontal spread: -100vw to +100vw
      const x = Math.random() * 200 - 100;
      // Vertical spread: -50vh to -200vh (always up)
      const y = Math.random() * -150 - 50;
      // Staggered delay
      const delay = Math.random() * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const style = {
        '--x': `${x}vw`,
        '--y': `${y}vh`,
        '--delay': `${delay}s`,
        backgroundColor: color,
      };

      return <div key={i} className={`particle ${side}`} style={style} />;
    });
  };

  return (
    <div className="confetti-explosion-container">
      {renderParticles('left')}
      {renderParticles('right')}
    </div>
  );
};

export default ConfettiExplosion;