import React, { useState } from 'react';

interface Stage1FormProps {
  onComplete: () => void;
}

const Stage1Form: React.FC<Stage1FormProps> = ({ onComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Array of image URLs for the captcha challenge
  const images = [
    { src: '/images/image1.jpg', alt: 'Image 1', id: '1' },
    { src: '/images/image2.jpg', alt: 'Image 2', id: '2' },
    { src: '/images/image3.jpg', alt: 'Image 3', id: '3' },
    { src: '/images/image4.jpg', alt: 'Image 4', id: '4' },
  ];

  const handleImageClick = (id: string) => {
    setSelectedImage(id);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onComplete(); // Move to the next stage if an image is selected
    } else {
      alert("Selectionnez une image svp!");
    }
  };

  return (
    <div>
      <h1>Niveau 1 : Quel est selon vous l'image qui vous représente le moins ?</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              margin: '10px',
              border: selectedImage === image.id ? '3px solid #1976D2' : '3px solid #ddd',
              padding: '5px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(image.id)}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Confirmer le choix
      </button>
    </div>
  );
};

export default Stage1Form;
