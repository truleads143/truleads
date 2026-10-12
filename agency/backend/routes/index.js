import leadRouter from "./leadRoutes.js"
import acaSubsidyRouter from "./acaSubsidyRoute.js";
import insuranceRouter from "./insuranceLeads.js";
import express from "express";

const router = express.Router();

router.use("/api", leadRouter);
router.use("/api/aca",acaSubsidyRouter)
router.use("/api/insurance",insuranceRouter)

export default router;