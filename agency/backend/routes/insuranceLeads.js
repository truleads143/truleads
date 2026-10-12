import {createInsuranceLead} from "../controller/insuranceLeadsController.js";
import express from "express";

const router = express.Router();

router.post("/leads", createInsuranceLead);
export default router;
