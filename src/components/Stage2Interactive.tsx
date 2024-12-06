import React, { useState, useEffect } from 'react';

interface Stage2Props {
  onComplete: () => void;
}

const Stage2: React.FC<Stage2Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [clickedButtons, setClickedButtons] = useState<boolean[]>([false, false, false, false, false]);
  const [positions, setPositions] = useState<{ top: string, left: string }[]>([]);
  const [buttonState, setButtonState] = useState<'fake' | 'stop' | 'real'>('fake');
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Function to move to the next step
  const goToNextStep = () => {
    if (step == 3) {
      onComplete();
    }
    setStep((prev) => prev + 1);
  };

  // Function to handle clicking a button in Step 2
  const handleSecondStep = (index: number) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[index] = true;
    setClickedButtons(updatedClickedButtons);

    // Check if all buttons have been clicked
    if (updatedClickedButtons.every((clicked) => clicked)) {
      goToNextStep();
    }
  };

  // Generate random positions for the buttons
  useEffect(() => {
    const generateRandomPositions = () => {
      return Array.from({ length: 5 }, () => ({
        top: `${Math.random() * 70}vh`,
        left: `${Math.random() * 70}vw`,
      }));
    };
    setPositions(generateRandomPositions());
  }, [step]); // Add step as a dependency to regenerate positions when going back to Step 2

  // Handle button hover for Step 3
  const handleHover = () => {
    if (buttonState === 'fake') {
      setButtonState('stop');
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      // Set a timeout to change the state after 3 seconds
      const timeout = setTimeout(() => {
        setButtonState('real');
      }, 3000);
      setHoverTimeout(timeout);
    }
  };

  // Handle button click for Step 3
  const handleClickStep3 = () => {
    if (buttonState === 'stop') {
      // Reset all buttons when clicked in 'stop' state
      const resetClickedButtons = new Array(clickedButtons.length).fill(false);
      setClickedButtons(resetClickedButtons);
      setStep(1); // Revert to Step 1
      setButtonState('fake'); // Reset button state to 'fake'
      clearTimeout(hoverTimeout!); // Clear any existing timeout
    } else if (buttonState === 'real') {
      goToNextStep(); // Go to the next stage if clicked in 'real' state
    }
  };

  // Reset the state when going back to Step 3
  useEffect(() => {
    if (step === 3) {
      setButtonState('fake');
      clearTimeout(hoverTimeout!);
    }
  }, [step]);

  return (
    <div style={{ position: 'relative', height: '80vh', width: '100vw', overflow: 'hidden' }}>
      <h1>Stage 2: Challenge Intéractif</h1>
      
      {/* Step 1: Initial click to proceed */}
      {step === 1 && (
        <div>
          <h2>Appuyez sur le bouton</h2>
          <button
            onClick={goToNextStep}
            style={{
              padding: '10px 20px',
              fontSize: '20px',
              backgroundColor: 'lightblue',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ✔
          </button>
        </div>
      )}

      {/* Step 2: Randomized buttons */}
      {step === 2 && (
        <div>
          <h2>J'ai dit appuyez sur les boutons</h2>
          {positions.map((position, index) => (
            <button
              key={index}
              onClick={() => handleSecondStep(index)}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                padding: '10px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: clickedButtons[index] ? 'lightgreen' : '#ddd',
                border: 'none',
                borderRadius: '5px',
              }}
              disabled={clickedButtons[index]}
            >
              {clickedButtons[index] ? '✔' : '✔'}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Button with different states */}
      {step === 3 && (
        <div>
          <h2>C'est presque fini</h2>
          <button
            onMouseEnter={handleHover}
            onClick={handleClickStep3}
            style={{
              padding: '10px 20px',
              fontSize: '20px',
              backgroundColor:
                buttonState === 'fake' ? 'lightblue' :
                buttonState === 'stop' ? 'lightgreen' : 'lightgreen',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {buttonState === 'fake' ? 'Cliquez ici' :
             buttonState === 'stop' ? 'Attendez' : 'Cliquez pour continuer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Stage2;
