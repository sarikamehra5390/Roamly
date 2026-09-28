import express from "express";

import {
  getCoordinates,
  searchLocations,
} from "../controllers/geocodingController.js";

const router = express.Router();

router.get("/", getCoordinates);

router.get("/search", searchLocations);

export default router;