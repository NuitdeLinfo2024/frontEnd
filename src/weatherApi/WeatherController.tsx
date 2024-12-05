import React, { useState, useEffect } from 'react';

// Interfaces for weather data are already defined
interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number; // Optional since gust may not always be present
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}



export const fetchWeatherData = async (
    lat: number,
    lon: number
): Promise<WeatherData> => {
    try {
        const cachedData = localStorage.getItem('weatherData');
        if (cachedData) {
            const { timeOfDay, weatherData } = JSON.parse(cachedData);
            if (timeOfDay >= new Date().getTime() - 1000 * 60 * 60) {
                return weatherData;
            }
            localStorage.removeItem('weatherData');
        }

        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
            throw new Error('API key is missing');
        }

        // Uncomment for real API call
        // const response = await fetch(
        //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        // );

        // Mock response for demonstration purposes
        const response = {
            ok: true,
            data: {
                coord: { lon: 5.7539, lat: 45.1846 },
                weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" }],
                base: "stations",
                main: { temp: 281.39, feels_like: 281.39, temp_min: 280.57, temp_max: 281.39, pressure: 1025, humidity: 69, sea_level: 1025, grnd_level: 922 },
                visibility: 10000,
                wind: { speed: 0.44, deg: 47, gust: 0.33 },
                clouds: { all: 100 },
                dt: 1733424645,
                sys: { type: 2, id: 2004515, country: "FR", sunrise: 1733382028, sunset: 1733414121 },
                timezone: 3600,
                id: 6454071,
                name: "Grenoble",
                cod: 200
            }
        };

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.ok}`);
        }

        const weatherData = response.data as WeatherData;
        localStorage.setItem(
            'weatherData',
            JSON.stringify({ timeOfDay: new Date().getTime(), weatherData })
        );

        return weatherData;
    } catch (err: unknown) {
        throw err instanceof Error ? err : new Error('An unexpected error occurred');
    }
};

const WeatherController: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWeatherData = async () => {
            setLoading(true);
            try {
                const data = await fetchWeatherData(lat, lon);
                setWeatherData(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadWeatherData();
    }, [lat, lon]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>No weather data available</div>;
    }

    return (
        <div>
            <h1>Weather in {weatherData.name}</h1>
            <p>Temperature: {weatherData.main.temp}K</p>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
    );
};

export default WeatherController;
