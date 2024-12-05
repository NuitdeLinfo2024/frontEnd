import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import './Parallax.css';

const Parallax: React.FC = () => {
    const { scrollY } = useScroll();
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const maxBoatX = window.innerWidth - 100;
    const maxIslandX = window.innerWidth - 200;
    const maxSunX = window.innerWidth;

    const boatX = useTransform(scrollY, [0, maxScroll], [0, maxBoatX]);
    const islandX = useTransform(scrollY, [0, maxScroll], [maxIslandX, 0]);
    const sunX = useTransform(scrollY, [-10000, maxScroll], [maxSunX, 0]);
    
    // Opacities for each text
    const textOpacity1 = useTransform(scrollY, [0, 200], [1, 0]); // Opacity of text 1
    const textOpacity2 = useTransform(scrollY, [200, 400], [0, 1]); // Opacity of text 2
    const textOpacity3 = useTransform(scrollY, [400, 600], [0, 1]); // Opacity of text 3

    // Dynamic height and color for the ocean rectangle
    const oceanHeight = useTransform(scrollY, [600, maxScroll], ['45vh', '100vh']); // Adjust max height as needed
    const oceanColor = useTransform(scrollY, [600, maxScroll], ['#76b6c4', '#064273']); // Darker ocean color

    // Dynamic position for the boat
    const boatY = useTransform(scrollY, [600, maxScroll], ['50%', '-5%']); // Adjust to raise the boat

    // Dynamic position for the island and whale
    const islandY = useTransform(scrollY, [600, maxScroll], ['0%', '90%']); // Adjust to raise the island
    const whaleY = useTransform(scrollY, [600, maxScroll], ['0%', '50%']); // Adjust to raise the whale

    // Opacity for the whale and island as they rise
    const whaleOpacity = useTransform(scrollY, [600, maxScroll], [1, 0]); // Whale opacity fades out
    const islandOpacity = useTransform(scrollY, [600, maxScroll], [1, 0]); // Island opacity fades out

    return (
        <div style={{ height: '200vh', position: 'relative', overflow: 'hidden' }}>
            {/* Sky background gradient */}
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '55vh',
                    background: 'linear-gradient(to bottom, #87CEEB, #B0E0E6)',
                    zIndex: 0,
                }}
            />

            {/* Sun */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: '10%',
                    x: sunX,
                    right: '10%',
                    width: '100px',
                    height: '100px',
                    backgroundImage: 'url("soleil.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 3,
                }}
            />

            {/* Ocean with SVG wave animation */}
            <div className="ocean">
                <svg className="svg-wave" viewBox="0 0 1440 320">
                    <path className="wave" d="M0,192L30,186.7C60,181,120,171,180,170.7C240,171,300,181,360,160C420,139,480,85,540,74.7C600,64,660,96,720,128C780,160,840,192,900,186.7C960,181,1020,139,1080,138.7C1140,139,1200,181,1260,170.7C1320,160,1380,96,1410,64L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                </svg>
            </div>

            {/* Ocean rectangle with dynamic size and color */}
            <motion.div
                style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: oceanHeight,
                    backgroundColor: oceanColor,
                    zIndex: 3,
                }}
            />

            {/* Boat */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: boatY,
                    left: '0',
                    x: boatX,
                    width: '300px',
                    height: '100px',
                    backgroundImage: 'url("https://clipart-library.com/images_k/man-fishing-boat-silhouette/man-fishing-boat-silhouette-19.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                }}
            />

            {/* Islands and other elements */}
            <motion.div style={{ position: 'fixed', bottom: whaleY, right: '200px', x: islandX, width: '200px', height: '200px', backgroundImage: 'url("https://www.pngarts.com/files/3/Whale-PNG-Image-Background.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 4, opacity: whaleOpacity, transform: 'translate(50%, 0)' }} />
            <motion.div style={{ position: 'fixed', bottom: islandY, right: '1000px', x: islandX, width: '200px', height: '200px', backgroundImage: 'url("/ile2.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 4, opacity: islandOpacity, transform: 'translate(50%, 0)' }} />
            <motion.div style={{ position: 'fixed', bottom: '120px', right: '2000px', x: islandX, width: '200px', height: '200px', backgroundImage: 'url("/ile.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 4, transform: 'translate(50%, 0)' }} />
            <motion.div style={{ position: 'fixed', bottom: '100px', right: '1200px', x: islandX, width: '200px', height: '200px', backgroundImage: 'url("/volcan2.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 4, transform: 'translate(50%, 0)' }} />

            {/* Texts */}
            <div style={{ position: 'fixed', top: '25%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
                <motion.div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2rem', color: 'black', opacity: textOpacity1 }}>
                    <h1 style={{ fontSize: '1.5rem' }}>Mangrove</h1>
                    <p style={{ fontSize: '1rem' }}>
                    Comme vous le savez, les humains se protègent des petits envahisseurs communément appelés des “virus” ou “bactérie” grâce à leurs systèmes immunitaires. La mer a le même fonctionnement et son bouclier ce sont les mangroves. Elle protège les herbiers et les récifs coralliens en retenant les sédiments issus de l'érosion de la terre, limitant ainsi l'envasement, mais aussi en permettant une épuration de l'eau. Autrement dit, les mangroves et les zones humides côtières protègent les écosystèmes marins contre les polluants et les tempêtes.                     </p>
                </motion.div>
            </div>
            <div style={{ position: 'fixed', top: '25%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
                <motion.div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2rem', color: 'black', opacity: textOpacity2 }}>
                    <h1 style={{ fontSize: '1.5rem' }}>Surface de l’eau</h1>
                    <p style={{ fontSize: '1rem' }}>
                    La peau protège le corps contre les agressions extérieures et régule la température, tout comme la surface de la mer agit comme une barrière et une interface entre l'atmosphère et les profondeurs océaniques. La surface de la mer est le lieu de transmission de l'énergie, la matière de l'océan vers l'atmosphère, et du milieu extérieur vers l'océan.                    </p>
                </motion.div>
            </div>
            <div style={{ position: 'fixed', top: '75%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
                <motion.div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2rem', color: 'black', opacity: textOpacity3 }}>
                    <h1 style={{ fontSize: '1.5rem' }}>Marée </h1>
                    <p style={{ fontSize: '1rem' }}>
                    Le cœur pompe le sang, grâce à ses contractions régulières, le propulse dans tout l'organisme et assure ainsi l'alimentation en oxygène du corps entier. C’est ce qui maintient le corps vivant en gardant les organes en bonne santé. Les marées ont ce même pouvoir avec la mer. Elles régulent le flux et le reflux de l'eau de mer, influençant l’équilibre des écosystèmes marins. Les courants de marée jouent par ailleurs un rôle global sur le climat en contribuant au mélange vertical de l'océan, qui refroidit la surface par le contact avec l'eau profonde.                     </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Parallax;
