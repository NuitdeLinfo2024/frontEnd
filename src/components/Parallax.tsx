import React, { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import './Parallax.css';
import Bubble from './Bubble';

const Parallax: React.FC = () => {
    const { scrollY } = useScroll();
    const [maxScroll, setMaxScroll] = useState(0);
    const [showFishAndPlankton, setShowFishAndPlankton] = useState(false);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const updateMaxScroll = () => {
            setMaxScroll(document.body.scrollHeight - window.innerHeight);
        };
        updateMaxScroll();
        window.addEventListener('resize', updateMaxScroll);

        return () => window.removeEventListener('resize', updateMaxScroll);
    }, []);

    useEffect(() => {
        // Show fish and plankton at the end of the scroll
        const handleScroll = () => {
            if(scrollY.get() <= maxScroll -2500){
                setShowFishAndPlankton(false);
                setShowText(true);

            }
            else if (scrollY.get() >= maxScroll -2500 && scrollY.get() <= maxScroll -1500) { // Adjust threshold as needed
                setShowFishAndPlankton(true);
                setShowText(true);
                textOpacity4.set(0);

            } else if(scrollY.get() >= maxScroll ) {
                setShowFishAndPlankton(false);
                setShowText(true);

            }
        };
        
        const unsubscribe = scrollY.onChange(handleScroll);
        return () => unsubscribe();
    }, [scrollY, maxScroll]);

    const scrollFactor = 0.5;
    const maxBoatX = window.innerWidth - 200;
    const maxIslandX = window.innerWidth - 200;
    const maxSunX = window.innerWidth;

    const boatX = useTransform(scrollY, [0, maxScroll], [0, maxBoatX * scrollFactor]);
    const islandX = useTransform(scrollY, [0, maxScroll], [maxIslandX * scrollFactor, 0]);
    const sunX = useTransform(scrollY, [-10000, maxScroll], [maxSunX * scrollFactor, 0]);
    const textOpacity1 = useTransform(scrollY, [0, 700 * scrollFactor, 1500 * scrollFactor], [1, 1, 0]);
    const textOpacity2 = useTransform(scrollY, [1500 * scrollFactor, 2400 * scrollFactor, 3200 * scrollFactor], [0, 1, 0]);
    const textOpacity3 = useTransform(scrollY, [3200 * scrollFactor, 4100 * scrollFactor, 4900 * scrollFactor], [0, 1, 0]);
    const textOpacity4 = useTransform(scrollY, [4900 * scrollFactor, 5800 * scrollFactor, 6600 * scrollFactor], [0, 1, 0]);
    const textOpacity5 = useTransform(scrollY, [6600 * scrollFactor, 7500 * scrollFactor, 8300 * scrollFactor], [0, 1, 0]);
    const textOpacity6 = useTransform(scrollY, [8300 * scrollFactor, 9200 * scrollFactor, 10000 * scrollFactor], [0, 1, 0]);
    const textOpacity7 = useTransform(scrollY, [10000 * scrollFactor, 10900 * scrollFactor, 11700 * scrollFactor], [0, 1, 0]);
    const oceanHeight = useTransform(scrollY, [1500 * scrollFactor, maxScroll], ['45vh', '140vh']);
    const oceanColor = useTransform(scrollY, [1500 * scrollFactor, maxScroll], ['#76b6c4', '#032D39']);
    const boatY = useTransform(scrollY, [1500 * scrollFactor, maxScroll], ['50%', '-42%']);
    const islandY = useTransform(scrollY, [1500 * scrollFactor, maxScroll], ['0%', '120%']);
    const whaleY = useTransform(scrollY, [1500 * scrollFactor, maxScroll], ['0%', '90%']);
    const whaleOpacity = useTransform(scrollY, [1500 * scrollFactor, maxScroll], [1, 0]);
    const islandOpacity = useTransform(scrollY, [1500 * scrollFactor, maxScroll], [1, 0]);

    return (
     <div style={{ height: '800vh', position: 'relative', overflow: 'hidden' }}>
            {/* Sky background gradient */}
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '55vh',
                background: 'linear-gradient(to bottom, #87CEEB, #B0E0E6)',
                zIndex: 0,
            }} />
            {/* Sun */}
            <motion.div style={{
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
            }} />
            {/* Ocean with SVG wave animation */}
            <div className="ocean">
                <svg className="svg-wave" viewBox="0 0 1440 320">
                    <path className="wave" d="M0,192L30,186.7C60,181,120,171,180,170.7C240,171,300,181,360,160C420,139,480,85,540,74.7C600,64,660,96,720,128C780,160,840,192,900,186.7C960,181,1020,139,1080,138.7C1140,139,1200,181,1260,170.7C1320,160,1380,96,1410,64L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                </svg>
            </div>
            {/* Ocean rectangle with dynamic size and color */}
            <motion.div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                width: '100%',
                height: oceanHeight,
                backgroundColor: oceanColor,
                zIndex: 3,
            }} />
            {/* Boat */}
            <motion.div style={{
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
            }} />
            {/* Islands and other elements */}
            <motion.div style={{
                position: 'fixed',
                bottom: whaleY,
                right: '30%',
                x: islandX,
                width: '200px',
                height: '200px',
                backgroundImage: 'url("https://www.pngarts.com/files/3/Whale-PNG-Image-Background.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 4,
                opacity: whaleOpacity,
                transform: 'translate(50%, 0)',
            }} />
            <motion.div style={{
                position: 'fixed',
                bottom: '12%',
                right: '120%',
                x: islandX,
                width: '200px',
                height: '200px',
                backgroundImage: 'url("/ile.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 4,
                transform: 'translate(50%, 0)',
            }} />
            <motion.div style={{
                position: 'fixed',
                bottom: islandY,
                right: '45%',
                x: islandX,
                width: '200px',
                height: '200px',
                backgroundImage: 'url("./ile2.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 4,
                opacity: islandOpacity,
                transform: 'translate(50%, 0)',
            }} />

            {/* Texts */}
            <div className="text-container" style={{ top: '25%' }}>
                <motion.div style={{ opacity: textOpacity1 }}>
                    <h1>Mangrove</h1>
                    <p>
                        Comme vous le savez, les humains se protègent des petits envahisseurs communément appelés des “virus” ou “bactérie” grâce à leurs systèmes immunitaires. La mer a le même fonctionnement et son bouclier ce sont les mangroves. Elle protège les herbiers et les récifs coralliens en retenant les sédiments issus de l'érosion de la terre, limitant ainsi l'envasement, mais aussi en permettant une épuration de l'eau. Autrement dit, les mangroves et les zones humides côtières protègent les écosystèmes marins contre les polluants et les tempêtes.
                    </p>
                </motion.div>
            </div>

            <div className="text-container" style={{ top: '25%' }}>
                <motion.div style={{ opacity: textOpacity2 }}>
                    <h1>Surface de l'eau</h1>
                    <p>
                        Tout comme un être vivant, l’eau est en interaction constante avec son environnement. Les différentes activités humaines comme l’agriculture, l’urbanisation, les transports ou encore l’industrie, viennent modifier les propriétés de l’eau. Les actions anthropiques conduisent à la dégradation de l’environnement marin et à l’altération des propriétés physico-chimiques de l’eau, causant des problèmes de santé pour les organismes vivants qui l'habitent.
                    </p>
                </motion.div>
            </div>
            <div className="text-container" style={{ top: '25%' }}>
                <motion.div style={{ opacity: textOpacity3 }}>
                    <h1>Marée </h1>
                    <p>
                    Le cœur pompe le sang, grâce à ses contractions régulières, le propulse dans tout l'organisme et assure ainsi l'alimentation en oxygène du corps entier. C’est ce qui maintient le corps vivant en gardant les organes en bonne santé. Les marées ont ce même pouvoir avec la mer. Elles régulent le flux et le reflux de l'eau de mer, influençant l’équilibre des écosystèmes marins. Les courants de marée jouent par ailleurs un rôle global sur le climat en contribuant au mélange vertical de l'océan, qui refroidit la surface par le contact avec l'eau profonde.                     </p>
                </motion.div>
            </div>
            <div className="text-container" style={{ top: '25%', color: 'white' }}>
                <motion.div style={{ opacity: textOpacity4 }}>
                    <h1>Plancton</h1>
                    <p>
                    Les cellules sont les unités de base de la vie dans le corps humain. C’est à partir d’elles, que par le corps humain. Pour la mer, tout vient du plancton. Il est à la base de la chaîne alimentaire marine et de nombreux écosystèmes océaniques. Il est aussi vital à la mer que les cellules le sont pour nous.                    </p>
                </motion.div>
            </div>
                        
            {/* Fish and Plankton Display */}
            
                <div className="fish-and-plankton" style={{
                    
                    zIndex:20,
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                }}>
                                            <motion.img src="./plancton.png" alt="Fish" style={{opacity:textOpacity4,  position: 'fixed', width: '100px' , top:'60%',left:'10%'}} />
                        <motion.img src="./fish.png" alt="Plankton" style={{opacity:textOpacity4, position: 'fixed', width: '100px', top:'90%',left:'40%' }} />
                        <motion.img src="./fish2.png" alt="Plankton" style={{opacity:textOpacity4,  position: 'fixed', top:'50%', left:'50%',width: '100px',}} />
                        <motion.img src="./jellyfish.png" alt="Jellyfish" style={{opacity:textOpacity4,  position: 'fixed', top:'60%', left:'30%',width: '100px',}} />

                        <motion.img src="./fish.png" alt="Fish" style={{ opacity:textOpacity4,  position: 'fixed', width: '100px' , top:'40%',left:'10%'}} />
                        <motion.img src="./plancton.png" alt="Plankton" style={{opacity:textOpacity4, position: 'fixed', width: '100px', top:'20%',left:'90%' }} />
                        <motion.img src="./fish2.png" alt="Plankton" style={{opacity:textOpacity4,  position: 'fixed', top:'80%', left:'90%',width: '100px',}} />
                        <motion.img src="./jellyfish.png" alt="Jellyfish" style={{opacity:textOpacity4,  position: 'fixed', top:'60%', left:'70%',width: '100px',}} />
{/* Additional Wave SVGs */}
               </div>

{showFishAndPlankton && (
    <div className="fish-and-plankton" style={{}}>
<Bubble size={50} position={{ top: '60%', left: '10%' }} />
                    <Bubble size={30} position={{ top: '70%', left: '30%' }} />
                    <Bubble size={40} position={{ top: '50%', left: '50%' }} />
                    <Bubble size={60} position={{ top: '40%', left: '80%' }} />
                    <Bubble size={20} position={{ top: '80%', left: '60%' }} />
</div>
)   
}
            
            {showText && (
                <div className="text-container" style={{ top:'45%', color: 'white',position:'fixed' }}>
                    <motion.div style={{opacity: textOpacity5, top: '55%',}} >
                        <h1>Poissons </h1>
                        <p>
                        Les poissons dans la mer jouent un rôle essentiel. Si nous pouvions les comparer avec un organe dans le corps humain, ça serait les globules rouges. Ils transportent des nutriments, maintiennent l'équilibre écologique et relient différents niveaux de l'écosystème, tout comme les globules rouges transportent l'oxygène et assurent le bon fonctionnement des organes dans le corps.
                        </p>
                    </motion.div>
                    <motion.div style={{opacity: textOpacity5, top: '85%',}} >
                        <h1>Courant marin  </h1>
                        <p>
                        La mer et l’atmosphère sont en continuelle communication. Ensemble, ils constituent une machine thermique naturelle. Ils échangent en permanence du gaz, de l’eau, de la chaleur, que la mer redistribue autour du globe grâce aux courants marins. Cet échange est possible grâce aux courants marins. Ils jouent le même rôle que les veines, qui transportent les nutriments et nourrissent les organes du corps.                        </p>
                    </motion.div>
                    <motion.div style={{opacity: textOpacity5}} >
                    <motion.img src="./fish.png" alt="Fish" style={{ position: 'fixed', width: '100px', top: '80%', left: '10%' }} animate={{ x: window.innerWidth }} transition={{ duration: 10 }} />
            <motion.img src="./fish.png" alt="Plankton" style={{ position: 'fixed', top: '95%', left: '30%', width: '100px' }} animate={{ x: window.innerWidth }} transition={{ duration: 10}} />
            <motion.img src="./fish.png" alt="Jellyfish" style={{ position: 'fixed', top: '90%', left: '20%', width: '100px' }} animate={{ x: window.innerWidth }} transition={{ duration: 10}} />
                        <motion.img src="./fish.png" alt="Plankton" style={{  position: 'fixed', width: '100px', top:'90%',left:'125%' }} />
                        <motion.img src="./fish2.png" alt="Plankton" style={{   position: 'fixed', top:'50%', left:'145%',width: '100px',}} />
                        <motion.img src="./jellyfish.png" alt="Jellyfish" style={{   position: 'fixed', top:'60%', left:'135%',width: '100px',}} />

                        <motion.img src="./fish.png" alt="Fish" style={{    position: 'fixed', width: '100px' , top:'40%',left:'135%'}} />
                        <motion.img src="./fish2.png" alt="Plankton" style={{   position: 'fixed', top:'80%', left:'145%',width: '100px',}} />
                        <motion.img src="./jellyfish.png" alt="Jellyfish" style={{   position: 'fixed', top:'60%', left:'135%',width: '100px',}} />

            </motion.div>

                </div>
                
            )}
            <div className="text-container" style={{position:'fixed', top: '45%', color: 'white' , rowGap:'20px'}}>
                <motion.div style={{ opacity: textOpacity6 }}>
                    <h1>Algues </h1>
                    <p>
                    Les algues dans la mer sont comparables aux poumons. Elles produisent une grande partie de l'oxygène de la planète grâce à la photosynthèse et les poumons permettent aux humains de pouvoir absorber de l’oxygène. Tous les deux jouent un rôle vital dans la respiration et le maintien de l'équilibre global.                    </p>
                </motion.div>
                  <motion.div style={{ opacity: textOpacity6 }}>
                    <h1>Coraux </h1>
                    <p>
                    Les coraux forment la structure de base des récifs. Ils offrent un habitat à d'innombrables espèces marines. Ils peuvent être comparés au squelette humain, qui soutient et sert de base à l’ensemble du corps. De plus, les coraux, comme les os du squelette, participent à l'équilibre global. Les coraux jouent un rôle dans la protection des côtes et le cycle du carbone, tandis que les os stockent des minéraux essentiels et participent à la production de cellules sanguines. </p>               </motion.div>
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '-20%', width: '200px' }}  />

                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '0%', width: '200px' }}  />

                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '20%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '40%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '60%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '80%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '100%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '120%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '130%', width: '200px' }}  />
                <motion.img src="./coraux.png" alt="Coraux" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '-20%', width: '200px' }}  />

                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '0%', width: '200px' }}  />

                <motion.img src="./coraux.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '20%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '40%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '60%', width: '200px' }}  />
                <motion.img src="./coraux.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '80%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '100%', width: '200px' }}  />
                <motion.img src="./algues.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '120%', width: '200px' }}  />
                <motion.img src="./coraux.png" alt="Algues" style={{opacity: textOpacity6, position: 'fixed', top: '130%', left: '130%', width: '200px' }}  />


                </div>
                <div className="text-container" style={{position:'fixed', top: '45%', color: 'white' , rowGap:'20px'}}>
                <motion.div style={{ opacity: textOpacity7 }}>
                    <h1>Volcans </h1>
                    <p>
                    La chaleur corporelle est essentielle au fonctionnement des organes. Elle permet de maintenir une bonne croissance des cellules et le bon fonctionnement des organes. Cette chaleur est comparable aux volcans sous-marins qui eux, libèrent de la chaleur, influençant la vie marine environnante.     </p>           </motion.div>
                <motion.div style={{ opacity: textOpacity7 }}>
                    <h1>Les abysses  </h1>
                    <p>
                    Le cerveau est un centre de contrôle et de mystères de l’être humain. Il peut être comparé aux abysses, où résident des écosystèmes complexes et en grande partie inexplorés.             </p>   </motion.div>
                <motion.img src="./volcano.png" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '135%', left: '0%', width: '300px' }}  />
                <motion.img src="./volcano.png" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '135%', left: '50%', width: '300px' }}  />
                <motion.img src="./volcano.png" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '135%', left: '100%', width: '300px' }}  />
                <motion.img src="https://wallpapers.com/images/hd/volcano-with-rising-smoke-png-63-xwo8l7j1qngmihnl.jpg" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '120%', left: '25%', width: '300px' }}  />
                <motion.img src="https://wallpapers.com/images/hd/volcano-with-rising-smoke-png-63-xwo8l7j1qngmihnl.jpg" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '120%', left: '75%', width: '300px' }}  />
                
                <motion.img src="https://png.pngtree.com/png-vector/20230814/ourmid/pngtree-sticker-showing-an-underwater-creature-clipart-vector-png-image_6897948.png" alt="Volcan" style={{opacity: textOpacity7, position: 'fixed', top: '10%', left: '105%', width: '300px' }}  />


                </div>
        </div>
    );
};

export default Parallax;
