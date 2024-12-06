// Interfaces for weather data are already defined
export interface WeatherData {
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

export type WEATHER_TYPES = [
"Thunderstorm"|
"Drizzle"|
"Rain"|
"Snow"|
"Mist"|
"Smoke"|
"Haze "|
"Dust"|
"Fog"|
"Sand"|
"Dust"|
"Ash"|
"Squall"|
"Tornado"|
"Clear"|
"Clouds"
];

// List of weather types
export const weatherTypesList = [
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
    "Clear",
    "Clouds",
];

const templateWeatherData: WeatherData = {
            coord: { lon: 5.7539, lat: 45.1846 },
            weather: [{ 
                id: 804, 
                // Take a rancom main value from the list of weather types
                main: weatherTypesList[Math.floor(Math.random() * weatherTypesList.length)],
                description: "overcast clouds", 
                icon: "04n" 
            }],
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

export const fetchWeatherData = async (
    lat: number,
    lon: number
): Promise<WeatherData> => {
    try {
        if (import.meta.env.VITE_USE_CACHING === 'true') {
            console.log('Using cached data to return weather data');
            const cachedData = localStorage.getItem('weatherData');
            if (cachedData) {
                const { timeOfDay, weatherData } = JSON.parse(cachedData);
                if (timeOfDay >= new Date().getTime() - 1000 * 60 * 60) {
                    return weatherData;
                }
                localStorage.removeItem('weatherData');
            }
        }

        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
            throw new Error('API key is missing');
        }

        let response = null;
        if(import.meta.env.VITE_USE_API === 'true') {   
            response = await fetch(
                "http://api.openweathermap.org/data/2.5/weather?q=Grenoble,fr&APPID="+apiKey
            );
            response = await response.json();
            if( response.cod !== 200) {
                throw new Error(`Failed to fetch weather data: ${response.cod}`);
            } 
            

        } else {
            // Mock response for demonstration purposes
            response = templateWeatherData;
    
        }
        const weatherData = response as WeatherData;
        localStorage.setItem(
            'weatherData',
            JSON.stringify({ timeOfDay: new Date().getTime(), weatherData })
        );

        return weatherData;
    } catch (err: unknown) {
        throw err instanceof Error ? err : new Error('An unexpected error occurred');
    }
};

export default fetchWeatherData;
