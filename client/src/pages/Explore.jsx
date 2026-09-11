import { useMemo, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

function Explore() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredDestinations = useMemo(() => {
        return destinations.filter((destination) => {

            const matchesSearch =
                destination.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                destination.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="border-b bg-white">

                <div className="mx-auto max-w-7xl px-6 py-12">

                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Discover
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-gray-900">
                        Explore destinations
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-600">
                        Discover places around the world and find your next adventure.
                    </p>

                </div>

            </section>

            {/* Search + Filters */}
            <section className="mx-auto max-w-7xl px-6 py-8">

                <div className="flex flex-col gap-4 md:flex-row">

                    {/* Search */}
                    <div className="flex flex-1 items-center rounded-xl border border-gray-200 bg-white px-4">

                        <span className="mr-3 text-gray-400">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search destinations..."
                            className="w-full py-3 outline-none"
                        />

                    </div>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Beach">Beach</option>
                        <option value="City">City</option>
                        <option value="Mountain">Mountain</option>
                    </select>

                </div>

            </section>

            {/* Results */}
            <section className="mx-auto max-w-7xl px-6 pb-16">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Destinations
                    </h2>

                    <p className="text-sm text-gray-500">
                        {filteredDestinations.length} destinations
                    </p>

                </div>

                {filteredDestinations.length > 0 ? (

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredDestinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">

                        <p className="text-lg font-medium text-gray-700">
                            No destinations found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Try searching for another destination.
                        </p>

                    </div>

                )}

            </section>

        </main>
    );
}

export default Explore;