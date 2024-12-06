import React, { useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { fetchWeatherData, weatherTypesList } from "./WeatherController";

const Clouds: React.FC = () => {
    const { scrollY } = useScroll(); // Get the current scroll position
    const maxScrollHeight = document.body.scrollHeight - window.innerHeight;

    // Transform scrollY to a percentage for x-axis movement
    const cloudX = useTransform(scrollY, [0, maxScrollHeight], [0, 1000]); // Adjust range for desired movement

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="clouds"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <motion.img
                src="/cloudNoBg.png"
                alt="clouds"
                className="cloud"
                style={{
                    position: "absolute",
                    width: "15%",
                    height: "15%",
                    objectFit: "cover",
                    zIndex: -1000000,
                    x: -cloudX.get() + 100, // Horizontal movement linked to scroll
                    y: -cloudX.get() + 100, // Fixed vertical position
                }}
            />
            <motion.img
                src="/cloudNoBg.png"
                alt="clouds"
                className="cloud"
                style={{
                    position: "absolute",
                    width: "15%",
                    height: "15%",
                    objectFit: "cover",
                    zIndex: -10,
                    x: window.innerWidth/1.5 + cloudX.get(), // Horizontal movement linked to scroll
                    y: 200, // Fixed vertical position
                }}
            />
            <motion.img
                src="/cloudNoBg.png"
                alt="clouds"
                className="cloud"
                style={{
                    position: "absolute",
                    width: "15%",
                    height: "15%",
                    objectFit: "cover",
                    zIndex: -10,
                    x: useTransform(scrollY, [0, maxScrollHeight], [-100, 200]), // Different movement range for variety
                    y: 150,
                }}
            />
        </motion.div>
    );
};

const Rain: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="rain"
            style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <motion.img
                src="/rain.gif"
                alt="rain"
                className="rain"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -10,
                }}
            />
        </motion.div>
    );
}

const Snow: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="snow"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <motion.img
                src="/snow.gif"
                alt="snow"
                className="snow"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -10,
                }}
            />
        </motion.div>
    );
}

const ThunderStorm: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="thunder"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <motion.img
                src="/thunder.gif"
                alt="thunderstorm"
                className="thunderstorm"
                style={{
                    position: "absolute",
                    width: "80%",
                    height: "80%",
                    objectFit: "cover",
                    zIndex: -10,
                }}
            />
            <motion.img
                src="/thunder.gif"
                alt="thunderstorm"
                className="thunderstorm"
                style={{
                    x: "50vw",
                    position: "absolute",
                    width: "80%",
                    height: "80%",
                    objectFit: "cover",
                    zIndex: -10,
                }}
            />
        </motion.div>
    );
}

const Tornado: React.FC = () => {

    const { scrollY } = useScroll(); // Get the current scroll position

    const [tornadoCrazy, setTornadoCrazy] = useState(0);
    const [tornadoCrazy2, setTornadoCrazy2] = useState(0);

    setInterval(() => {
        setTornadoCrazy((Math.floor(Math.random() * window.innerWidth) / 4) - scrollY.get() * 2);
        setTornadoCrazy2((Math.floor(Math.random() * window.innerWidth) / 4)- scrollY.get() * 2);
    }
    , 1000);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="tornado"
            style={{
                position: "absolute",
                top: "5vh",
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <motion.img
                src="/tornado.gif"
                alt="tornado"
                className="tornado"
                style={{
                    position: "fixed",
                    // X needs to go crazy
                    x: tornadoCrazy,
                    top: '0',
                    left: '0',
                    width: "100%",
                    height: "100%",
                    scale: 0.1,
                    objectFit: "cover",
                    zIndex: -10,
                    transition: "all 1s",
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <motion.img
                src="/tornado.gif"
                alt="tornado"
                className="tornado"
                style={{
                    // X needs to go crazy
                    position: "fixed",
                    x: tornadoCrazy2,
                    top: '0',
                    left: '0',
                    scale: 0.1,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -10,
                    transition: "all 1s",
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </motion.div>
    );
}

const WeatherOverlay: React.FC = () => {
    const [weatherCondition, setWeatherCondition] = useState<string>("");
    const [overLayElement, setOverLayElement] = useState<string | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                if(localStorage.getItem('useApi') === 'true') {
                    const data = await fetchWeatherData();
                    setWeatherCondition(data?.weather[0]?.main || "Clear");
                } else {
                    const randCondition = weatherTypesList[Math.floor(Math.random() * weatherTypesList.length)];
                    setWeatherCondition(randCondition);
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherCondition("Error");
            }
        };
        getWeather();
    }, []);

    useEffect(() => {
        if (localStorage.getItem('useWeatherAnimations') === 'true') {
            switch (weatherCondition) {
                case "Clouds":
                    setOverLayElement("Clouds");
                    break;
                case "Rain":
                    setOverLayElement("Rain");
                    break;
                case "Snow":
                    setOverLayElement("Snow");
                    break;
                case "Thunderstorm":
                    setOverLayElement("Thunderstorm");
                    break;
                case "Tornado":
                    setOverLayElement("Tornado");
                    break;
                default:
                    setOverLayElement(null);
                    break;
            }
        } else {
            setOverLayElement(null);
        }

    }, [weatherCondition]);

    return <>{
        overLayElement === "Clouds" && <Clouds /> 
        || overLayElement === "Rain" && <Rain />
        || overLayElement === "Snow" && <Snow />
        || overLayElement === "Thunderstorm" && <ThunderStorm />
        || overLayElement === "Tornado" && <Tornado />
        || overLayElement === null && <></>
    }</>;
};

export default WeatherOverlay;