import axios from "axios";
import geocodingService from "./geocodingService.js";

const getPlacesByCoordinates = async (lat, lon) => {
   
  const apiKey = process.env.GEOAPIFY_API_KEY;

  const response = await axios.get(
    "https://api.geoapify.com/v2/places",
    {
      params: {
        categories: "tourism.attraction,tourism.sights",
        filter: `circle:${lon},${lat},10000`,
        bias: `proximity:${lon},${lat}`,
        limit: 10,
        apiKey,
      },
    }
  );

  return response.data;
};

const getPlacesByCity = async (city) => {
  const coordinates =
    await geocodingService.getCoordinatesByCity(city);

  if (coordinates.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon } = coordinates[0];

  return getPlacesByCoordinates(lat, lon);
};

export default {
  getPlacesByCoordinates,
  getPlacesByCity,
};