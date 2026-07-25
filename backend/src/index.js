import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
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