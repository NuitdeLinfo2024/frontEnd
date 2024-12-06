import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { fetchWeatherData } from "./WeatherController";

const WeatherOverlay: React.FC = () => {
    const [weatherCondition, setWeatherCondition] = useState<string>("");
    const [particleCount, setParticleCount] = useState<number>(0);
    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData(5.7539, 45.1846);
                setWeatherCondition(data?.weather[0]?.main || "Clear");
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherCondition("Error");
            }
        };
        getWeather();
    }, []);

    useEffect(() => {
        // Update particle count based on weather condition
        switch (weatherCondition) {
            case "Clouds":
                setParticleCount(2);
                break;
            default:
                setParticleCount(0);
                break;
        }
    }, [weatherCondition]);

    const Particle: React.FC<{ key: string }> = ({ key }) => {
        return (
            <Box
                key={key}
                component="img"
                sx={{
                height: 160 * 5,
                width: 160 * 5,
                imageRendering: 'pixelated', // Makes the image sharp
                }}
                alt="AAAAAAAAAa"
                src="/src/assets/image.png"
                />
        );
    }

    return (
        <>
            <Particle key="1" />
        </>
    );
};

export default WeatherOverlay;
