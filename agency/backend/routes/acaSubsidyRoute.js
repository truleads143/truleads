import {generateAcaSubsidy,getAcaSubsidy} from "../controller/acaSubsidyController.js";
import express from "express";

const router = express.Router();

router.post("/generate-acasubsidy", generateAcaSubsidy);
router.get("/acasubsidies",getAcaSubsidy)

export default router;
