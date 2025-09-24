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

// Get wishlist with product details
router.get("/wishlist/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
          w.wishlist_id,
          w.customer_id,
          w.date,
          w.time,
          i.item_id,
          i.item_name,
          i.item_image_1,
          p.item_prid,
          p.item_sell AS price,
          p.item_stock AS stock
      FROM e_pos_wishlist w
      JOIN e_pos_item i ON w.item_id = i.item_id
      JOIN e_pos_item_price p ON w.item_prid = p.item_prid
      WHERE w.customer_id = $1
      ORDER BY w.date DESC, w.time DESC;
      `,
      [customerId]
    );

    res.json({ success: true, wishlist: result.rows });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/wishlist/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
          w.wishlist_id,
          w.customer_id,
          w.date,
          i.item_id,
          i.item_name,
          i.item_image_1,
          p.item_prid,
          p.item_sell AS price,
          p.item_stock AS stock
      FROM e_pos_wishlist w
      JOIN e_pos_item i ON w.item_id = i.item_id
      JOIN e_pos_item_price p ON w.item_prid = p.item_prid
      WHERE w.customer_id = $1
      ORDER BY w.date DESC;
      `,
      [customerId]
    );

    // Respond with wishlist array
    res.json({
      success: true,
      wishlist: result.rows.map(item => ({
        wishlist_id: item.wishlist_id,
        item_id: item.item_id,
        item_prid: item.item_prid,
        item_name: item.item_name,
        item_image_1: item.item_image_1,
        price: item.price,
        stock: item.stock,
        date: item.date,
      })),
    });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE wishlist item
router.delete("/wishlist/:itemId/:customerId", async (req, res) => {
  const { itemId, customerId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM e_pos_wishlist 
       WHERE item_id = $1 AND customer_id = $2
       RETURNING *`,
      [itemId, customerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Error deleting wishlist item:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// DELETE ALL wishlist items for a customer
router.delete("/wishlist/all/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    await pool.query(
      `DELETE FROM e_pos_wishlist WHERE customer_id = $1`,
      [customerId]
    );

    res.json({ success: true, message: "All wishlist items removed" });
  } catch (err) {
    console.error("Error deleting all wishlist items:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
