import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            
            <Link
                to="/"
                className="text-2xl font-bold"
            >
                Roamly 🌍
            </Link>

            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="hover:text-blue-600"
                >
                    Home
                </Link>

                <Link
                    to="/explore"
                    className="hover:text-blue-600"
                >
                    Explore
                </Link>

                <Link
                    to="/login"
                    className="hover:text-blue-600"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg bg-black text-white"
                >
                    Get Started
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;