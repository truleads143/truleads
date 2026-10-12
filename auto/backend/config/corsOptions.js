const allowedOrigin = [
  "http://localhost:5173",
  "https://truleads-auto-frontend.vercel.app",
  "https://www.truautoinsurify.com",
  "https://truautoinsurify.com"
];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // 🔥 THIS IS THE FIX
  optionsSuccessStatus: 200,
};

export default corsOptions;
