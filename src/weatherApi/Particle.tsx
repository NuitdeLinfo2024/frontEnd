// ParticleCloud.js
import { motion } from 'framer-motion';

const generateParticles = (count:any) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: Math.random() * 200 - 100, // Random position between -100 and 100
    y: Math.random() * 200 - 100,
    scale: Math.random() * 0.8 + 0.2, // Scale between 0.2 and 1
    delay: Math.random() * 2, // Delay up to 2 seconds
  }));
};

const ParticleCloud = ({ particleCount = 50 }) => {
  const particles = generateParticles(particleCount);

  return (
    <div style={{ position: 'relative', width: "100%", height: "100%" }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: particle.scale }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: particle.scale,
            transition: {
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 2,
              delay: particle.delay,
            },
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 100,
            height: 100,
            backgroundColor: "red", //'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            zIndex: 1000,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleCloud;
