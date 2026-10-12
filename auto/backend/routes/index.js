import insuranceRouter from "./insuranceLeads.js";
import employeeRouter from "./employee.js";
import exportRouter from "./exportLeads.js";
import userRouter from "./user.js"
import express from "express";
import pingRouter from "./ping.js";

const router = express.Router();

router.use("/api/insurance",insuranceRouter)
router.use("/api/employee",employeeRouter)
router.use("/api/export",exportRouter)
router.use("/api/user",userRouter)
router.use("/api/ping",pingRouter)


export default router;