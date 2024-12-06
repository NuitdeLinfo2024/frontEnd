import React, { useState, useEffect } from 'react';
import Stage0Confirm from './Stage0Confirm.tsx';
import Stage1Form from './Stage1Form.tsx';
import Stage2Interactive from './Stage2Interactive.tsx';
import Stage3Platformer from './Stage3Platformer.tsx';
import Stage4Password from './Stage4Password.tsx';

interface CaptchaProps {
  onComplete: () => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage > 4) {
      onComplete(); // Trigger the onComplete callback when all stages are completed
    }
  }, [stage, onComplete]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {stage === 0 && (
        <Stage0Confirm
          onPlay={() => setStage(1)}
          onSkip={onComplete}
        />
      )}
      {stage === 1 && <Stage1Form onComplete={() => setStage(2)} />}
      {stage === 2 && <Stage2Interactive onComplete={() => setStage(3)} />}
      {stage === 3 && <Stage3Platformer onComplete={() => setStage(4)} />}
      {stage === 4 && <Stage4Password onComplete={() => setStage(5)} />}
      {stage > 4 && <h1>CAPTCHA Terminé ! 🎉</h1>}
    </div>
  );
};

export default Captcha;
