import placesService from "../services/placesService.js";

export const getPlaces = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const places = await placesService.getPlacesByCity(city);

    res.status(200).json(places);
  } catch (error) {
    console.error("Places API error:", error.message);

    if (error.message === "City not found") {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(500).json({
      message: "Failed to fetch places",
    });
  }
};