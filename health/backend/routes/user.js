import { handleRestrictUserLocation } from "../controller/userController.js";
import { geoLimiter } from "../middleware/rateLimiter.js";
import express from "express";

const router = express.Router();

router.get("/geo-check", geoLimiter, handleRestrictUserLocation);

export default router;
