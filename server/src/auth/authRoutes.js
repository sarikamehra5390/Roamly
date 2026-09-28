import express from "express";

import {
  registerUser,
} from "./authController.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;