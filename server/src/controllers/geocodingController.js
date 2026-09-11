import geocodingService from "../services/geocodingService.js";

export const getCoordinates = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const result = await geocodingService.getCoordinatesByCity(city);

    if (result.length === 0) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error(
      "Geocoding API error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch coordinates",
    });
  }
};