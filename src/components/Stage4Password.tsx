// Stage4Password.tsx
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';




interface Stage4PasswordProps {
  onComplete: () => void;
}

const Stage4Password: React.FC<Stage4PasswordProps> = ({ onComplete }) => {
  
  const [valueButton1, setValueButton1] = useState(1);
  const [valueButton2, setValueButton2] = useState(2);
  const [valueButton3, setValueButton3] = useState(3);
  const [finished, setFinished] = useState(false);
  

  useEffect(() => {
    BasicButtonGroup();

  }, [valueButton1, finished]);
  useEffect(() => {
    BasicButtonGroup();
  }, [valueButton2, finished]);
    useEffect(() => {
      BasicButtonGroup();
  }, [valueButton3, finished]);

  function BasicButtonGroup() {
    return (
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => generateValue(valueButton1, 1)}>{valueButton1}</Button>
        <Button onClick={() => generateValue(valueButton2, 2)}>{valueButton2}</Button>
        <Button onClick={() => generateValue(valueButton3, 3)}>{valueButton3}</Button>
      </ButtonGroup>
    );
  }

  function DisplayPassword() {
    return (
      <div>
        <h2>Entrez le mot de passe ci-dessous : {table}</h2>
      </div>
    )
  }
  
  const generateTable = () => {
    const row = [];
      for(let j=0; j<3; j++) {
        row.push(Math.floor(Math.random() * 9) +1)
      }
    return row;
  }

  function generateValue(value: number, cpt : number) {
    if(cpt == 1) {
      value = Math.floor(Math.random() * 9) + 1;
    setValueButton1(value);
    console.log(value);
    } else if(cpt == 2) {
      value = Math.floor(Math.random() * 9) + 1;
    setValueButton2(value);
    console.log(value);
    } else {
      value = Math.floor(Math.random() * 9) + 1;
    setValueButton3(value);
    console.log(value);
    }
    
  }

  const [table, setTable] = useState(generateTable);

  const handleCompletion = () => {
    setFinished(true);
    onComplete();
  };

  
  return (
    <div>
      <h1>Niveau 4: Password Game</h1>
      <DisplayPassword/>
      <BasicButtonGroup/>
      {valueButton1 === table[0] && (
        <h3>La première valeur est bonne !</h3>
      )}
      {valueButton2 === table[1] && (
        <h3>La deuxième valeur est bonne !</h3>
      )}
      {valueButton3 === table[2] && (
        <h3>La troisième valeur est bonne !</h3>
      )}
      {valueButton1 === table[0] && valueButton2 === table[1] && valueButton3 === table[2] && (
        <Button onClick={handleCompletion}>Finir le captcha ! 🎉 Wouuuuuuu (clique, y a pas de piège 😉)</Button>
      )}
    </div>
  );
};

export default Stage4Password;
