import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);
// Middleware

const allowedOrigins = [
  "http://localhost:3000",
  "https://digital-heroes-assessment-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests (no Origin header)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(cookieParser());
// Routes

app.use("/api", contactRoutes);
console.log("Mounting auth routes...");
app.use("/auth", userRoutes)

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
