import {exportLeads} from "../controller/exportLeads.js";
import express from "express";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

router.get("/leads", authenticateUser, exportLeads);

export default router;
