import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

function Explore() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [category, setCategory] = useState("All");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        destination.country
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        destination.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = search.trim();

    if (query.length < 2) {
      setSearchError("Please enter at least 2 characters.");
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");

      const response = await api.get("/geocoding/search", {
        params: {
          query,
        },
      });

      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error("Destination search failed:", error);

      setSearchError(
        "Unable to search destinations. Please try again."
      );

      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleResultClick = (result) => {
    const name =
      result.name ||
      result.city ||
      result.country ||
      "Unknown destination";

    const country = result.country || "";

    const params = new URLSearchParams({
      name,
      country,
      lat: result.lat,
      lon: result.lon,
    });

    navigate(`/destination/search?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Explore the World
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-gray-500">
          Search for any destination and discover weather,
          popular places and currency information.
        </p>
      </div>


      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setSearchError("");
          }}
          placeholder="Search any destination, city or country..."
          className="flex-1 rounded-xl border border-gray-300 px-5 py-3.5 text-gray-900 outline-none transition focus:border-black"
        />

        <button
          type="submit"
          disabled={searchLoading}
          className="rounded-xl bg-black px-7 py-3.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {searchLoading ? "Searching..." : "Search"}
        </button>
      </form>


      {/* Search Error */}
      {searchError && (
        <p className="mt-4 text-sm text-red-500">
          {searchError}
        </p>
      )}


      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Search Results
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select a destination to explore it.
              </p>
            </div>

            <button
              onClick={() => setSearchResults([])}
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Clear
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((result, index) => {
              const name =
                result.name ||
                result.city ||
                result.country ||
                "Unknown location";

              const location =
                result.formatted ||
                [result.city, result.state, result.country]
                  .filter(Boolean)
                  .join(", ");

              return (
                <button
                  key={result.place_id || index}
                  onClick={() => handleResultClick(result)}
                  className="text-left rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {location}
                  </p>

                  <p className="mt-4 text-sm font-medium text-gray-900">
                    Explore destination →
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}


      {/* Popular Destinations */}
      <section className="mt-16">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Popular Destinations
            </h2>

            <p className="mt-2 text-gray-500">
              Explore some of our featured destinations.
            </p>
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="All">All</option>
            <option value="Beach">Beach</option>
            <option value="City">City</option>
            <option value="Mountain">Mountain</option>
          </select>
        </div>


        {/* Count */}
        <p className="mt-6 text-sm text-gray-500">
          {filteredDestinations.length} destinations found
        </p>


        {/* Cards */}
        {filteredDestinations.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No featured destinations found
            </h3>

            <p className="mt-2 text-gray-500">
              Try searching for a destination above.
            </p>
          </div>
        )}

      </section>
    </div>
  );
}

export default Explore;