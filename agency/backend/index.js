import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

import connectMongoDb from "./connection.js"
connectMongoDb(process.env.DATABASE_URL)
    .then(() => console.log("Mongodb is connected"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://truleads-frontend.vercel.app",
  "https://www.truleads.agency"
];

// CORS middleware — place BEFORE routes
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Your API routes
app.use(router);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
