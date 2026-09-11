import axios from "axios";
import countryCurrencies from "../data/currencies.js";

const getCurrencyByCountry = async (country) => {
  const currency = countryCurrencies[country];

  if (!currency) {
    throw new Error("Currency not found for this country");
  }

  const response = await axios.get(
    `https://api.frankfurter.dev/v2/rate/inr/${currency.code}`
  );

  return {
    country,
    currency,
    rate: response.data.rate,
    date: response.data.date,
  };
};

export default {
  getCurrencyByCountry,
};