function CurrencyCard({ currency, loading, error }) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900">
        Currency
      </h2>

      {loading && (
        <p className="mt-4 text-gray-500">
          Loading currency...
        </p>
      )}

      {error && !loading && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      {currency && !loading && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Indian Rupee
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                ₹ INR
              </p>
            </div>

            <div className="text-2xl text-gray-400">
              →
            </div>

            <div>
              <p className="text-sm text-gray-500">
                {currency.currency.name}
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {currency.currency.symbol} {currency.currency.code}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Current exchange rate
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              1 INR ≈ {currency.rate} {currency.currency.code}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Rate date: {currency.date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyCard;