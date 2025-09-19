// routes/wishlist.js
import express from "express";
import pool from "../config/db.js";  // your db connection
import dayjs from "dayjs";           // <-- ADD THIS

const router = express.Router();

// Add to wishlist
router.post("/wishlist", async (req, res) => {
  const { item_id, item_prid, customer_id } = req.body;

  try {
    const now = dayjs();
    const date = now.format("YYYY-MM-DD"); // string
    const time = now.format("HH:mm:ss");   // string

    const result = await pool.query(
      `
      INSERT INTO e_pos_wishlist (item_id, item_prid, customer_id, date, time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [item_id, item_prid, customer_id, date, time] // use formatted values
    );

    res.json({ success: true, wishlist: result.rows[0] });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




export default router;
