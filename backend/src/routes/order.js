// src/routes/order.js
import express from "express";
import pool from "../config/db.js";
import dayjs from "dayjs";

const router = express.Router();

router.post("/orders", async (req, res) => {
  const { order_code, products } = req.body;

  if (!products || !products.length) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  try {
    const now = dayjs();
    const date = now.format("YYYY-MM-DD");
    const time = now.format("HH:mm:ss");

    await pool.query("BEGIN"); // Start transaction

    const insertQuery = `
  INSERT INTO e_pos_order_row
  (o_row_id, order_code, item_id, item_prid, item_sell, quantity, total, date, time)
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
`;

    for (const product of products) {
      await pool.query(insertQuery, [
        order_code,
        product.id,
        product.item_prid,
        product.price,
        product.quantity,
        product.price * product.quantity,
        date,
        time
      ]);
    }

    await pool.query("COMMIT");
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error inserting order rows:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

export default router;
