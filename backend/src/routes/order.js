// src/routes/order.js
import express from "express";
import pool from "../config/db.js";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";


const router = express.Router();

//order rows
router.post("/order_row", async (req, res) => {
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
  (o_row_id, order_code, item_id, item_prid, or_item_sell, or_quantity, or_total, or_date, or_time)
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
        time,
      ]);
    }

    await pool.query("COMMIT");
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error inserting order rows:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});


router.post("/order", async (req, res) => {
  const { order_code, products, phone, password, isExisting, billingDetails } = req.body;

  if (!products || !products.length) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  try {
    const now = dayjs();
    const date = now.format("YYYY-MM-DD");
    const time = now.format("HH:mm:ss");

    await pool.query("BEGIN");

    let customerId;

    if (isExisting) {
      const customerRes = await pool.query(
        `SELECT customer_id, user_userpassword FROM e_pos_customers WHERE user_username = $1`,
        ['94' + phone]
      );

      if (!customerRes.rows.length) {
        await pool.query("ROLLBACK");
        return res.status(404).json({ success: false, message: "Customer not found" });
      }

      const customer = customerRes.rows[0];
      const match = await bcrypt.compare(password, customer.user_userpassword);
      if (!match) {
        await pool.query("ROLLBACK");
        return res.status(401).json({ success: false, message: "Invalid password" });
      }

      customerId = customer.customer_id;
    } else {
      const { fullname, phone, addressStreet, addressCity, addressState, addressZip } = billingDetails;

      const insertCustomerRes = await pool.query(
       `INSERT INTO e_pos_customers
                 (user_username, customer_name, user_contact, address_street, address_city, address_state, address_zip, active, archived, created_at, user_lastlogin)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING customer_id`,
                [
                    '94' + phone || null,
                    fullname || null,
                    '94' + phone || null,
                    addressStreet || null,
                    addressCity || null,
                    addressState || null,
                    addressZip || null,
                    true, false, now.toDate(), now.toDate() // ✅ FIX: Use dayjs variables
                ]
      );

      customerId = insertCustomerRes.rows[0].customer_id;
    }

    // Insert order totals
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discount = 10;
    const shipping = 0;
    const total = subtotal * 0.9;

    const orderRes = await pool.query(
      `INSERT INTO e_pos_order
      (customer_id, order_code, order_discount, order_shipping_charg,
       order_sub_total, order_total, order_date, order_time, order_payment_status, order_delivery_status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,0)
      RETURNING o_id`,
      [customerId, order_code, discount, shipping, subtotal, total, date, time]
    );

    const orderId = orderRes.rows[0].o_id;

    await pool.query("COMMIT");

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId, // return orderId so frontend can call /order_row
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error inserting order:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// -------------Use the order_id sent by PayHere to update your table----------
router.post("/notify", express.json(), async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) return res.status(400).json({ message: "order_id is required" });

  try {
    // Update order_payment_status
    const result = await pool.query(
      `UPDATE e_pos_order
       SET order_payment_status = 1
       WHERE o_id = $1
       RETURNING order_payment_status`,
      [order_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order_payment_status: result.rows[0].order_payment_status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
