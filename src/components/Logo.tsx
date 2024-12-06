import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => {
    const [position, setPosition] = useState({ x: getRandomPosition(), y: getRandomPosition() });
    const [rotation, setRotation] = useState(getRandomRotation());
    const [showScore, setShowScore] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [scorePosition, setScorePosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);

    function getRandomPosition() {
        return Math.floor(Math.random() * 80) + 10; // Génère une position aléatoire entre 10% et 90%
    }

    function getRandomRotation() {
        return Math.floor(Math.random() * 90) - 45; // Génère une rotation aléatoire entre -45 et 45 degrés
    }

    const handleClick = () => {
        setScorePosition({ x: position.x, y: position.y });
        setShowScore(true);
        setTimeout(() => {
            setShowScore(false);
        }, 1000); 
        setPosition({ x: getRandomPosition(), y: getRandomPosition() });
        setRotation(getRandomRotation());
        setScore(score + 1); 
    };
    useEffect(() => {
        if (score === 5) {
          setShowCongrats(true);
          setTimeout(() => {
            setShowCongrats(false);
          }, 2000); // Affiche "Bien ouej fraté!!!" pendant 2 secondes
        }
      }, [score]);

    return (
        <div>
            {score < 5 ? (
                <div
                    onClick={handleClick}
                    style={{
                        position: 'fixed',
                        top: `${position.y}%`,
                        left: `${position.x}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    <img src="/LogoLyreco2.png" alt="Logo" style={{ width: '20%', height: '10%', opacity: 0.3 * Math.pow(1.0/2.0, score) }} />
                </div>
            ) : (
                showCongrats && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'red',
                        fontSize: '80px',
                        zIndex: 11,
                    }}
                >
                    Bien ouej fraté!!!
                </div>
                )
            )}
            {showScore && (
                <div
                    style={{
                        position: 'fixed',
                        top: `${scorePosition.y}%`,
                        left: `${scorePosition.x}%`,
                        transform: 'translate(-50%, -50%)',
                        color: 'black',
                        fontSize: '12px',
                        zIndex: 11,
                    }}
                >
                    Score +1
                </div>
            )}
        </div>
    );
};

export default Logo;