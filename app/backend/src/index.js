import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import eventRoutes from "./routes/events.js";
import ticketRoutes from "./routes/tickets.js";
import bookingRoutes from "./routes/bookings.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/bookings", bookingRoutes);

// test
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// error handler (LAST)
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
