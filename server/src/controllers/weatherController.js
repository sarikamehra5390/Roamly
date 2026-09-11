import weatherService from "../services/weatherService.js";

export const getWeather = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                message: "City is required",
            });
        }

        const weather = await weatherService.getWeatherByCity(city);

        res.status(200).json(weather);

    } catch (error) {
        console.error("Weather API error:", error.message);

        res.status(500).json({
            message: "Failed to fetch weather data",
        });
    }
};