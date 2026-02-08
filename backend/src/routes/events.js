import express from "express";
import pool from "../database.js";
import { auth } from "../middlewares/auth.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

/* ========= CREATE EVENT (ADMIN ONLY) ========= */
router.post("/", auth, adminOnly, async (req, res, next) => {
  try {
    const { title, location, event_date, total_seats } = req.body;
    if(total_seats>0){
    const [result] = await pool.query(
      "INSERT INTO events (title, location, event_date, total_seats, created_by) VALUES (?, ?, ?, ?, ?)",
      [title, location, event_date, total_seats, req.user.id]
    );
      for (let i = 1; i <= total_seats; i++) {
      await pool.query(
        "INSERT INTO tickets (event_id, seat_number, price) VALUES (?, ?, ?)",
        [result.insertId, i, 300]
      );
    }

    res.json({ message: "Event created" });
  }
  else{
      res.json({message:"failed to create"});
  }

    // auto-generate tickets
  } catch (err) {
    next(err);
  }
});

/* ========= GET EVENTS ========= */
router.get("/", async (req, res, next) => {
  try {
    const [events] = await pool.query("SELECT * FROM events");
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next)=>{
  try{
    const[events] = await pool.query("delete from events where events.id=?", [id]);
    res.json({message: "deleted"});
  }
  catch(err){
    next(err);
  }
})
export default router;
