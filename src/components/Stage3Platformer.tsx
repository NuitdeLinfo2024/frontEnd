import React, { useEffect, useState } from 'react';

interface Stage3PlatformerProps {
  onComplete: () => void;
  goBackToStage2: () => void;
}

const Stage3Platformer: React.FC<Stage3PlatformerProps> = ({ onComplete, goBackToStage2 }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [playerJumping, setPlayerJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      alert("Le temps est écoulé ! Retour au Stage 2.");
      goBackToStage2(); // Retour au Stage 2 lorsque le temps est écoulé
    }
  }, [timeLeft, finished, goBackToStage2]);

  // Faire avancer automatiquement le joueur vers la droite en utilisant requestAnimationFrame
  useEffect(() => {
    if (!finished) {
      const moveRight = () => {
        setPlayerPosition((prev) => Math.min(prev + 0.15, 100));
        requestAnimationFrame(moveRight);
      };

      requestAnimationFrame(moveRight);
    }
  }, [finished]);

  const handleCompletion = () => {
    setFinished(true);
    onComplete();
  };

  // Gérer le clic de souris pour faire sauter le joueur
  const handleJump = () => {
    if (!finished && !playerJumping) {
      setPlayerJumping(true);
      let height = 0;
      const jump = () => {
        if (height < 75) {
          height += 5;
          setJumpHeight(height);
          requestAnimationFrame(jump);
        } else {
          let fall = () => {
            if (height > 0) {
              height -= 5;
              setJumpHeight(height);
              requestAnimationFrame(fall);
            } else {
              setPlayerJumping(false);
            }
          };
          requestAnimationFrame(fall);
        }
      };
      requestAnimationFrame(jump);
    }
  };

  // Attacher l'événement de clic de la souris à la fenêtre
  useEffect(() => {
    window.addEventListener('click', handleJump);
    return () => {
      window.removeEventListener('click', handleJump);
    };
  }, [finished, playerJumping]);

  useEffect(() => {
    if (playerPosition >= 100 && !finished) {
      alert("Vous avez atteint le but !");
      handleCompletion();
    }
  }, [playerPosition, finished]);

  // Vérifier si le joueur a touché un obstacle
  useEffect(() => {
    if (
      (playerPosition >= 29 && playerPosition <= 30 && jumpHeight === 0) || // Premier obstacle
      (playerPosition >= 59 && playerPosition <= 60 && jumpHeight === 0)    // Deuxième obstacle
    ) {
      alert("Vous avez heurté un obstacle ! Retour au début.");
      setPlayerPosition(0); // Réinitialiser la position du joueur
      setJumpHeight(0); // Réinitialiser la hauteur du saut
    }
  }, [playerPosition, jumpHeight]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Stage 3 : Défi de la plateforme</h1>
      <p>Temps restant : {timeLeft}s</p>
      <div style={{ position: 'relative', margin: '20px auto', width: '400px', height: '100px', backgroundColor: 'lightgray', border: '2px solid black' }}>
        {/* Sol */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '10px', backgroundColor: 'brown' }} />

        {/* Joueur */}
        <div
          style={{
            position: 'absolute',
            bottom: jumpHeight,
            left: `${playerPosition}%`,
            width: '10px',
            height: '30px',
            backgroundColor: 'blue',
            borderRadius: '5px',
            transition: 'left 0.1s, bottom 0.1s',
          }}
        />

        {/* Objectif */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '10px',
            height: '30px',
            backgroundColor: 'green',
            borderRadius: '5px',
          }}
        />

        {/* Obstacles */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '30%',
            width: '10px',
            height: '30px',
            backgroundColor: 'red',
            borderRadius: '5px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '60%',
            width: '10px',
            height: '30px',
            backgroundColor: 'red',
            borderRadius: '5px',
          }}
        />
      </div>
    </div>
  );
};

export default Stage3Platformer;
