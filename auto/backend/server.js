import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import connectDB from './config/dbConnect.js';
import corsOptions from './config/corsOptions.js';

import Employee from "./models/employee.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("trust proxy", 1);
app.use(cookieParser())
app.use(cors(corsOptions));

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use(router);


// helper: random 8-char password
// const generateRandomPassword = (length = 8) => {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return password;
// };

// export const resetEmployeePasswordByEmail = async () => {
//   try {
//     const email = "employee@truauto.com";
//     const newPassword = generateRandomPassword(8);

//     const user = await Employee.findOneAndUpdate(
//       { email },
//       { password: newPassword },
//       { new: true }
//     );

//     if (!user) {
//       throw new Error("User not found with this email");
//     }

//     return {
//       success: true,
//       message: "Password updated successfully",
//       newPassword, // so you can display/send it
//     };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };

// console.log("Resetting employee password...");
// resetEmployeePasswordByEmail()

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});