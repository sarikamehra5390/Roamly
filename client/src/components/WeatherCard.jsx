function WeatherCard({ weather, loading, error }) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900">
        Current Weather
      </h2>

      {loading && (
        <p className="mt-4 text-gray-500">
          Loading weather...
        </p>
      )}

      {error && !loading && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      {weather && !loading && (
        <div className="mt-6">
          <p className="text-5xl font-bold text-gray-900">
            {Math.round(weather.main.temp)}°C
          </p>

          <p className="mt-2 capitalize text-gray-600">
            {weather.weather?.[0]?.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Feels like
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Humidity
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {weather.main.humidity}%
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Wind
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {weather.wind.speed} m/s
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;