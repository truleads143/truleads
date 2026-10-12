import {generateLeads,getLeads} from "../controller/leadController.js";
import express from "express";

const router = express.Router();

router.post("/generate-leads", generateLeads);
router.get("/leads", getLeads);

export default router;
