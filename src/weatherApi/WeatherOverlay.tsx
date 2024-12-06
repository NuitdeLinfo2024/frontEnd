import React, { useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { fetchWeatherData } from "./WeatherController";

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

const WeatherOverlay: React.FC = () => {
    const [weatherCondition, setWeatherCondition] = useState<string>("");
    const [overLayElement, setOverLayElement] = useState<string | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData(5.7539, 45.1846);
                setWeatherCondition("Clouds");
                //setWeatherCondition(data?.weather[0]?.main || "Clear");
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherCondition("Error");
            }
        };
        getWeather();
    }, []);

    useEffect(() => {
        switch (weatherCondition) {
            case "Clouds":
                setOverLayElement("Clouds");
                break;
            default:
                setOverLayElement(null);
                break;
        }
    }, [weatherCondition]);

    return <>{overLayElement === "Clouds" && <Clouds />}</>;
};

export default WeatherOverlay;
