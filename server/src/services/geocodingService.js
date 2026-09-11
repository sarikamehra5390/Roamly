import axios from "axios";

const getCoordinatesByCity = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        limit: 1,
        appid: apiKey,
      },
    }
  );

  return response.data;
};

export default {
  getCoordinatesByCity,
};