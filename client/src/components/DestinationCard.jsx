import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <img
                src={destination.image}
                alt={destination.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {destination.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {destination.country}
                        </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {destination.category}
                    </span>

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                    {destination.description}
                </p>

                <Link
                    to={`/destination/${destination.id}`}
                    className="mt-5 inline-block rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    View destination
                </Link>

            </div>

        </div>
    );
}

export default DestinationCard;