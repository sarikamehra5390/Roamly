import { Link } from "react-router-dom";

function Home() {
    return (
        <main>

            {/* Hero Section */}
            <section className="bg-gray-50">

                <div className="mx-auto max-w-7xl px-6 py-24 text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Your journey starts here
                    </p>

                    <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
                        Explore the world.
                        <br />
                        Plan your journey.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                        Discover amazing destinations, check real-time travel
                        information, and create personalized itineraries with Roamly.
                    </p>

                    {/* Search */}
                    <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-xl border border-gray-200 bg-white p-2 shadow-sm">

                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="flex-1 px-4 py-3 text-gray-700 outline-none"
                        />

                        <Link
                            to="/explore"
                            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                        >
                            Explore
                        </Link>

                    </div>

                </div>

            </section>

            {/* Popular Destinations */}
            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Popular destinations
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Start exploring some of the world's most exciting places.
                    </p>

                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    <DestinationCard
                        name="Paris"
                        country="France"
                    />

                    <DestinationCard
                        name="Goa"
                        country="India"
                    />

                    <DestinationCard
                        name="Tokyo"
                        country="Japan"
                    />

                    <DestinationCard
                        name="Dubai"
                        country="UAE"
                    />

                </div>

            </section>

        </main>
    );
}


function DestinationCard({ name, country }) {
    return (
        <Link
            to="/explore"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
        >

            <div className="flex h-48 items-center justify-center bg-gray-100 text-5xl">
                🌍
            </div>

            <div className="p-5">

                <h3 className="text-xl font-semibold text-gray-900 group-hover:underline">
                    {name}
                </h3>

                <p className="mt-1 text-gray-500">
                    {country}
                </p>

            </div>

        </Link>
    );
}

export default Home;