import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import weatherRoutes from "./routes/weatherRoutes.js";
import geocodingRoutes from "./routes/geocodingRoutes.js";
import placesRoutes from "./routes/placesRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to Roamly API 🌍"
    });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/geocoding", geocodingRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/currency", currencyRoutes);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});