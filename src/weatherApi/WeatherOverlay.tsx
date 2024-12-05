import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { fetchWeatherData } from "./WeatherController";

const WeatherOverlay: React.FC = () => {
  const [weatherCondition, setWeatherCondition] = useState<string>("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        // Data should be WeatherData
        const data = await fetchWeatherData(5.7539, 45.1846 );
        console.log("Weather data:", data);
        //setWeatherCondition(data?.weather?.main || "Clear"); // Default to "Clear"
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherCondition("Error"); // Handle errors gracefully
      }
    };

    getWeather();
  }, []);

  const getOverlayStyle = (condition: string) => {
    switch (condition) {
      case "Thunderstorm":
        return { backgroundColor: "rgba(0, 0, 128, 0.7)" }; // Dark blue
      case "Drizzle":
      case "Rain":
        return { backgroundColor: "rgba(0, 0, 255, 0.5)" }; // Light blue
      case "Snow":
        return { backgroundColor: "rgba(255, 255, 255, 0.8)" }; // White
      case "Mist":
      case "Fog":
      case "Haze":
        return { backgroundColor: "rgba(192, 192, 192, 0.5)" }; // Light gray
      case "Smoke":
      case "Dust":
      case "Ash":
      case "Sand":
        return { backgroundColor: "rgba(255, 165, 0, 0.5)" }; // Orange
      case "Squall":
        return { backgroundColor: "rgba(128, 128, 128, 0.7)" }; // Gray
      case "Tornado":
        return { backgroundColor: "rgba(128, 0, 128, 0.7)" }; // Purple
      case "Clear":
        return { backgroundColor: "rgba(135, 206, 250, 0.3)" }; // Sky blue
      case "Clouds":
        return { backgroundColor: "rgba(169, 169, 169, 0.5)" }; // Dark gray
      default:
        return { backgroundColor: "rgba(0, 0, 0, 0.5)" }; // Default black
    }
  };

  const overlayStyle = getOverlayStyle(weatherCondition);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        ...overlayStyle,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {weatherCondition || "Loading..."}
      </Typography>
    </Box>
  );
};

export default WeatherOverlay;
