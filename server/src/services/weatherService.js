import axios from "axios";

const getWeatherByCity = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // This part calls OpenWeather's current-weather endpoint.
    const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: apiKey,
                units: "metric",
            },
        }
    );

    return response.data;
};

export default {
    getWeatherByCity,
};