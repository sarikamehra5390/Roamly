import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../services/api";
import destinations from "../data/destinations";

import WeatherCard from "../components/WeatherCard";
import PlacesSection from "../components/PlacesSection";
import CurrencyCard from "../components/CurrencyCard";

function DestinationDetails() {
  const { id } = useParams();

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [placesError, setPlacesError] = useState("");

  const [currency, setCurrency] = useState(null);
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [currencyError, setCurrencyError] = useState("");

  const destination = destinations.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/weather", {
          params: {
            city: destination.name,
          },
        });

        setWeather(response.data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError("Unable to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchWeather();
    }
  }, [destination]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setPlacesLoading(true);
        setPlacesError("");

        const response = await api.get("/places", {
          params: {
            city: destination.name,
          },
        });

        setPlaces(response.data.features || []);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setPlacesError("Unable to fetch popular places.");
      } finally {
        setPlacesLoading(false);
      }
    };

    if (destination) {
      fetchPlaces();
    }
  }, [destination]);

  useEffect(() => {
  const fetchCurrency = async () => {
    try {
      setCurrencyLoading(true);
      setCurrencyError("");

      const response = await api.get("/currency", {
        params: {
          country: destination.country,
        },
      });

      setCurrency(response.data);
    } catch (err) {
      console.error("Failed to fetch currency:", err);
      setCurrencyError("Unable to fetch currency data.");
    } finally {
      setCurrencyLoading(false);
    }
  };

  if (destination) {
    fetchCurrency();
  }
}, [destination]);

  if (!destination) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">
          Destination not found
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't find the destination you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Destination */}

      <img
        src={destination.image}
        alt={destination.name}
        className="h-96 w-full rounded-2xl object-cover"
      />

      <div className="mt-8">

        <div className="flex items-center justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {destination.name}
            </h1>

            <p className="mt-2 text-gray-500">
              {destination.country}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {destination.category}
          </span>

        </div>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          {destination.description}
        </p>

      </div>

     <WeatherCard
  weather={weather}
  loading={loading}
  error={error}
/>

<CurrencyCard
  currency={currency}
  loading={currencyLoading}
  error={currencyError}
/>

<PlacesSection
  places={places}
  loading={placesLoading}
  error={placesError}
  destination={destination.name}
/>
    </div>
  );
}

export default DestinationDetails;