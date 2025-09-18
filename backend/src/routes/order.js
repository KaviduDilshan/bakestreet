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
  const {
    order_code,
    products,
    user_id,
    fullname,
    contact,
    addressStreet,
    addressCity,
    addressState,
    addressZip,
    paymentMethod,
  } = req.body;

  if (!products || !products.length) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  try {
    const now = dayjs();
    const date = now.format("YYYY-MM-DD");
    const time = now.format("HH:mm:ss");

    await pool.query("BEGIN");

    let customerId = user_id;
    // if (isExisting) {
    //   const customerRes = await pool.query(
    //     `SELECT customer_id, user_userpassword FROM e_pos_customers WHERE user_username = $1`,
    //     ["94" + phone]
    //   );

    //   if (!customerRes.rows.length) {
    //     await pool.query("ROLLBACK");
    //     return res
    //       .status(404)
    //       .json({ success: false, message: "Customer not found" });
    //   }

    //   const customer = customerRes.rows[0];
    //   const match = await bcrypt.compare(password, customer.user_userpassword);
    //   if (!match) {
    //     await pool.query("ROLLBACK");
    //     return res
    //       .status(401)
    //       .json({ success: false, message: "Invalid password" });
    //   }

    //   customerId = customer.customer_id;
    // } else {
    // const {
    //   fullname,
    //   contact,
    //   addressStreet,
    //   addressCity,
    //   addressState,
    //   addressZip,
    //   paymentMethod
    // } = billingDetails;

    // const updateCustomerRes = await pool.query(
    //   `update e_pos_customers
    //   set customer_name=$1,user_contact=$2,address_street=$3,address_city=$4,address_state=$5,address_zip=$6,last_login=$7
    //   where customer_id=$8`,
    //   [
    //            (user_username, customer_name, user_contact, address_street, address_city, address_state, address_zip, active, archived, created_at, user_lastlogin)
    //            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    //            RETURNING customer_id`,
    //   [
    //     "94" + contact || null,
    //     fullname || null,
    //     "94" + contact || null,
    //     addressStreet || null,
    //     addressCity || null,
    //     addressState || null,
    //     addressZip || null,
    //     true,
    //     false,
    //     now.toDate(),
    //     now.toDate(), //  FIX: Use dayjs variables
    //   ]
    // );
    await pool.query(
      `update e_pos_customers
        set customer_name=$1,user_contact=$2,address_street=$3,address_city=$4,address_state=$5,address_zip=$6, active=$7, archived=$8, created_at=$9, last_login=$10
        where customer_id=$11`,
      [
        fullname || null,
        "94" + contact || null,
        addressStreet || null,
        addressCity || null,
        addressState || null,
        addressZip || null,
        true,
        false,
        new Date(),
        new Date(), //  FIX: Use dayjs variables
        customerId,
      ]
    );
  

    // customerId = insertCustomerRes.rows[0].customer_id;
    // }

    // Insert order totals
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discount = 10;
    const shipping = 0;
    const total = subtotal * 0.9;

    const orderRes = await pool.query(
      `INSERT INTO e_pos_order
      (customer_id, order_code, order_discount, order_shipping_charg,
       order_sub_total, order_total, order_date, order_time, order_payment_type, order_payment_status, order_delivery_status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING o_id`,
      [customerId, order_code, discount, shipping, subtotal, total, date, time, paymentMethod, 0, 0]
    );

    const orderId = orderRes.rows[0].o_id;

    await pool.query("COMMIT");
console.log("Order placed with ID:", orderId);
    res.json({
      success: true,
      message: "Order placed successfully",
      orderId, // return orderId so frontend can call /order_row
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error inserting order:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// -------------Use the order_id sent by PayHere to update your table----------
router.post("/notify", express.json(), async (req, res) => {
  const { order_id } = req.body;

  if (!order_id)
    return res.status(400).json({ message: "order_id is required" });

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

router.get("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
  o.o_id,
  o.order_code,
  o.order_discount,
  o.order_sub_total,
  o.order_total,
  o.order_date,
  o.order_payment_status,
  o.order_delivery_status,
  o.order_payment_type
FROM e_pos_order o
JOIN e_pos_order_row r ON o.order_code = r.order_code
WHERE o.customer_id = $1 
ORDER BY o.o_id ASC`,
      [id]
    );
    //   AND r.item_id IS NOT NULL
    // AND r.item_prid IS NOT NULL

    if (!result.rows.length) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/order_rows/:order_code", async (req, res) => {
  const { order_code } = req.params;

  try {
    // const result = await pool.query(
    //   `SELECT i.item_name,i.item_sku,p.item_discount_val,r.or_item_sell,r.or_quantity,r.or_total,r.or_date,v.p1variation_name
    //   FROM e_pos_order_row r,e_pos_item i,e_pos_item_price p,e_pos_variation_mix vm,e_pos_variations v
    //   WHERE r.item_id = i.item_id AND r.item_prid = p.item_prid AND order_code = $1 AND p.item_prid = vm.item_prid AND vm.p1variation_id = v.p1variation_id`,
    //   [order_code]
    // );
    const result = await pool.query(
      `SELECT 
     i.item_name,
     i.item_sku,
     p.item_discount_val,
     r.or_item_sell,
     r.or_quantity,
     r.or_total,
     r.or_date,
     STRING_AGG(v.p1variation_name, '  ') AS variations
   FROM e_pos_order_row r
   JOIN e_pos_item i ON r.item_id = i.item_id
   JOIN e_pos_item_price p ON r.item_prid = p.item_prid
   JOIN e_pos_variation_mix vm ON p.item_prid = vm.item_prid
   JOIN e_pos_variations v ON vm.p1variation_id = v.p1variation_id
   WHERE r.order_code = $1
   GROUP BY 
     i.item_name, i.item_sku, p.item_discount_val,
     r.or_item_sell, r.or_quantity, r.or_total, r.or_date`,
      [order_code]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: "Order rows not found" });
    }
    res.json({ order_rows: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
