import React from 'react';

interface Stage0ConfirmProps {
  onPlay: () => void;
  onSkip: () => void;
}

const Stage0Confirm: React.FC<Stage0ConfirmProps> = ({ onPlay, onSkip }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue au CAPTCHA, le truc trop génial !</h1>
      <p>Si vous êtes vraiment sûr de ne pas être un robot, vous pouvez passer le captcha. Dans le cas contraire, vérifiez que vous êtes bien un humain en le réalisant !</p>
      <div>
        <button
          onClick={onPlay}
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: 'lightblue',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Jouer au CAPTCHA
        </button>
        <button
          onClick={onSkip}
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            cursor: 'pointer',
            backgroundColor: 'lightgray',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Passer le CAPTCHA
        </button>
      </div>
    </div>
  );
};

export default Stage0Confirm;
