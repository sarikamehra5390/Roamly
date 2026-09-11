function PlacesSection({ places, loading, error, destination }) {
  return (
    <div className="mt-12">

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Popular Places
        </h2>

        <p className="mt-2 text-gray-500">
          Discover popular attractions around {destination}.
        </p>
      </div>

      {loading && (
        <p className="mt-6 text-gray-500">
          Loading popular places...
        </p>
      )}

      {error && !loading && (
        <p className="mt-6 text-red-500">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        places.length === 0 && (
          <p className="mt-6 text-gray-500">
            No popular places found.
          </p>
        )}

      {!loading &&
        !error &&
        places.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {places.map((place, index) => {
              const properties = place.properties;

              return (
                <div
                  key={properties.place_id || index}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {properties.name || "Unnamed attraction"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {properties.formatted ||
                      "Address unavailable"}
                  </p>

                  {properties.distance !== undefined && (
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      {properties.distance < 1000
                        ? `${Math.round(
                            properties.distance
                          )} m away`
                        : `${(
                            properties.distance / 1000
                          ).toFixed(1)} km away`}
                    </p>
                  )}
                </div>
              );
            })}

          </div>
        )}
    </div>
  );
}

export default PlacesSection;