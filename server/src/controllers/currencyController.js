import currencyService from "../services/currencyService.js";

export const getCurrency = async (req, res) => {
  try {
    const { country } = req.query;

    if (!country) {
      return res.status(400).json({
        message: "Country is required",
      });
    }

    const currency =
      await currencyService.getCurrencyByCountry(country);

    res.status(200).json(currency);
  } catch (error) {
    console.error("Currency API error:", error.message);

    if (
      error.message ===
      "Currency not found for this country"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to fetch currency data",
    });
  }
};