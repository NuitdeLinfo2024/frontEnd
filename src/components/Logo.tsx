import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => {
    const [position, setPosition] = useState({ x: 10, y: 5 });
    const [rotation, setRotation] = useState(35);
    const [showScore, setShowScore] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [scorePosition, setScorePosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);

    function getRandomPositionX() {
        return Math.floor(Math.random() * 90) + 5; // Génère une position aléatoire entre 5% et 95%
    }

    function getRandomPositionY() {
        return Math.floor(Math.random() * 80) + 15; // Génère une position aléatoire entre 10% et 95%
    }

    function getRandomRotation() {
        return Math.floor(Math.random() * 90) - 45; // Génère une rotation aléatoire entre -45 et 45 degrés
    }

    const handleClick = () => {
        setScorePosition({ x: position.x, y: position.y });
        setShowScore(true);
        setTimeout(() => {
            setShowScore(false);
        }, 2000);
        setPosition({ x: getRandomPositionX(), y: getRandomPositionY() });
        setRotation(getRandomRotation());
        setScore(score + 1);
    };
    useEffect(() => {
        if (score === 10) {
            setShowCongrats(true);
            setTimeout(() => {
                setShowCongrats(false);
            }, 3000);
        }
    }, [score]);

    const imageSize = 5.0 * Math.pow(97.0 / 100.0, score);

    return (
        <div>
            {score < 10 ? (
                <div
                    onClick={handleClick}
                    style={{
                        position: 'fixed',
                        width : `${imageSize}%`,
                        height: `${imageSize*(3/4)}%`,
                        top: `${position.y}%`,
                        left: `${position.x}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    <img src="/LogoLyreco2.png" alt="Logo" style={{ width: `100%`, height: `100%`, opacity: 1 * Math.pow(3.0 / 5.0, score) }} />
                </div>
            ) : (
                showCongrats && (
                    <>
                      {(
                        <img
                          src="/feuxArtifices.gif"
                          alt="Feux d'artifice"
                          style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 10,
                          }}
                        />
                      )}
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
                        Bien ouej mon gaté!!!
                      </div>
                    </>
                  )
            )}
            {showScore && (
                <div
                    className="fade-out-up"
                    style={{
                        position: 'fixed',
                        top: `${scorePosition.y}%`,
                        left: `${scorePosition.x}%`,
                        transform: 'translate(-50%, -50%)',
                        color: 'green',
                        fontSize: '18px',
                        zIndex: 11,
                    }}
                >
                    Score +1
                </div>
            )}
            {showScore && (
        <img
          src="/EXPLOOSIOOOON.gif"
          alt="Explosion"
          style={{
            position: 'fixed',
            top: `${scorePosition.y}%`,
            left: `${scorePosition.x}%`,
            transform: 'translate(-50%, -50%)',
            width: '5%',
            height: '5%',
            zIndex: 10,
          }}
        />
      )}
        </div>
    );
};

export default Logo;