// Stage3Platformer.tsx
import React, { useEffect, useState } from 'react';

interface Stage3PlatformerProps {
  onComplete: () => void;
}

const Stage3Platformer: React.FC<Stage3PlatformerProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      alert("Time's up! Try again.");
      setFinished(true);
    }
  }, [timeLeft, finished]);

  const handleCompletion = () => {
    setFinished(true);
    onComplete();
  };

  return (
    <div>
      <h2>Stage 3: Platformer Challenge</h2>
      <p>Time left: {timeLeft}s</p>
      <button onClick={handleCompletion} style={{ marginTop: '20px' }}>
        Finish Challenge
      </button>
    </div>
  );
};

export default Stage3Platformer;
