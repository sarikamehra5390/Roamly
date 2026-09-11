import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DestinationDetails from "./pages/DestinationDetails";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

           <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/explore" element={<Explore />} />

    <Route
        path="/destination/:id"
        element={<DestinationDetails />}
    />

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<Signup />} />

    <Route path="/dashboard" element={<Dashboard />} />

</Routes>
        </BrowserRouter>
    );
}

export default App;