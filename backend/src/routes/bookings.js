import express from "express";
import pool from "../database.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const { ticket_id } = req.body;
    const { id: user_id, email } = req.user;

    if (!ticket_id) {
      return res.status(400).json({ message: "Ticket required" });
    }

    // atomic seat lock
    const [result] = await pool.query(
      "UPDATE tickets SET is_booked=true WHERE id=? AND is_booked=false",
      [ticket_id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // insert booking
    await pool.query(
      "INSERT INTO bookings (user_id, ticket_id, user_email) VALUES (?, ?, ?)",
      [user_id, ticket_id, email]
    );

    res.json({ message: "Booking successful" });
  } catch (err) {
    next(err);
  }
});

router.get("/my", auth, async (req, res, next) => {
  try {
    const email = req.user.email;

    const [rows] = await pool.query(
      `
      SELECT 
        e.title,
        e.location,
        t.seat_number,
        b.booked_at
      FROM bookings b
      JOIN tickets t ON b.ticket_id = t.id
      JOIN events e ON t.event_id = e.id
      WHERE b.user_email = ?
      `,
      [email]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
});


export default router;
