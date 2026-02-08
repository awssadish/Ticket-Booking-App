import express from "express";
import pool from "../database.js";

const router = express.Router();

router.get("/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const [tickets] = await pool.query(
      "SELECT * FROM tickets WHERE event_id=?",
      [eventId]
    );
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

export default router;
