import { handleping } from "../controller/ping.js";
import { geoLimiter } from "../middleware/rateLimiter.js";
import express from "express";

const router = express.Router();

router.get("/", geoLimiter, handleping);

export default router;
