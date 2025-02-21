import express from "express";
import { PORT } from "./config/env.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import sensordataRoutes from "./routes/sensordata.routes.js";

// Middleware
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import authenticate from "./middleware/clerkAuth.middleware.js";
import cors from 'cors';

// Controllers
import { getCurrentUser } from "./controllers/user.controller.js"; // ✅ FIXED

const app = express();

// Middleware Setup
app.use(cors({
    origin: '*', // Allow all origins (for development only)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sensor-data", sensordataRoutes);


// Clerk Authentication Route
app.get("/api/v1/me", authenticate, getCurrentUser);

// Global Error Handling Middleware
app.use(errorMiddleware);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to front API!");
});

// Start Server
const startServer = async () => {
    app.listen(PORT, async () => {
        console.log(`🚀 Server started on http://localhost:${PORT}`);
        await connectToDatabase();
    });
};

startServer();

export default app;