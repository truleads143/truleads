import rateLimit from "express-rate-limit";

export const geoLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1,             // 1 request per window per IP
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res.status(200).json({
      allowed: false,
      error: true,
      reason: "rate_limited",
      method: "ip",
    });
  },
});
