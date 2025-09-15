import express from "express";
import crypto from "crypto";
import pool from "../config/db.js";
import { encryptId, decryptId } from "../utils/crypto.js";



const router = express.Router();

// ====== CONFIG ======
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
const PAYHERE_RETURN_URL = process.env.PAYHERE_RETURN_URL;
const PAYHERE_CANCEL_URL = process.env.PAYHERE_CANCEL_URL;
const PAYHERE_NOTIFY_URL = process.env.PAYHERE_NOTIFY_URL;
const PAYHERE_MODE = process.env.PAYHERE_MODE || "sandbox";

const PAYHERE_URL =
  PAYHERE_MODE === "live"
    ? "https://www.payhere.lk/pay/checkout"
    : "https://sandbox.payhere.lk/pay/checkout";

// ====== HELPERS ======

function generateHash(merchantId, orderId, amount, currency, merchantSecret) {
  const formattedAmount = parseFloat(amount)
    .toLocaleString("en-us", {
      minimumFractionDigits: 2,
      useGrouping: false,
    })
    .replace(",", "");

  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  return crypto
    .createHash("md5")
    .update(merchantId + orderId + formattedAmount + currency + hashedSecret)
    .digest("hex")
    .toUpperCase();
}

function verifyMd5Sig(data, merchantSecret) {
  const localMd5 = crypto
    .createHash("md5")
    .update(
      data.merchant_id +
        data.order_id +
        data.payhere_amount +
        data.payhere_currency +
        data.status_code +
        crypto
          .createHash("md5")
          .update(merchantSecret)
          .digest("hex")
          .toUpperCase()
    )
    .digest("hex")
    .toUpperCase();

  return localMd5 === data.md5sig;
}

router.get("/pay", async (req, res) => {
  try {
    // 1️⃣ Get the last inserted order
    const orderResult = await pool.query(`
      SELECT *
      FROM e_pos_order
      ORDER BY o_id DESC
      LIMIT 1
    `);

    if (!orderResult.rows.length) {
      return res.status(404).send("No orders found");
    }

    const order = orderResult.rows[0];

    // 2️⃣ Get the customer details for this order
    const customerResult = await pool.query(`
      SELECT *
      FROM e_pos_customers
      WHERE customer_id = $1
    `, [order.customer_id]);

    if (!customerResult.rows.length) {
      return res.status(404).send("Customer not found");
    }

    const customer = customerResult.rows[0];

    // 3️⃣ Prepare PayHere data
    const first_name = customer.user_first_name || "NoName";
    const last_name = customer.user_last_name || "";
    const email = customer.user_username || "noemail@example.com";
    const phone = customer.user_contact || "0000000000";
    const amount = order.order_total || 0;
    const orderId = order.o_id;
    const currency = "LKR";

    const hash = generateHash(
      PAYHERE_MERCHANT_ID,
      orderId,
      amount,
      currency,
      PAYHERE_MERCHANT_SECRET
    );

    // 4️⃣ Render auto-submitting PayHere form
    const formHtml = `
      <html>
        <body onload="document.forms[0].submit()">
          <form method="post" action="${PAYHERE_URL}">
            <input type="hidden" name="merchant_id" value="${PAYHERE_MERCHANT_ID}">
            <input type="hidden" name="return_url" value="${PAYHERE_RETURN_URL}">
            <input type="hidden" name="cancel_url" value="${PAYHERE_CANCEL_URL}">
            <input type="hidden" name="notify_url" value="${PAYHERE_NOTIFY_URL}">

            <input type="hidden" name="order_id" value="${orderId}">

            <input type="hidden" name="items" value="Order #${orderId}">
            <input type="hidden" name="currency" value="${currency}">
            <input type="hidden" name="amount" value="${amount}">

            <input type="hidden" name="first_name" value="${first_name}">
            <input type="hidden" name="last_name" value="${last_name}">
            <input type="hidden" name="email" value="${email}">
            <input type="hidden" name="phone" value="${phone}">
            <input type="hidden" name="address" value="${customer.address_street || ""}">
            <input type="hidden" name="city" value="${customer.address_city || ""}">
            <input type="hidden" name="country" value="${customer.address_country || ""}">

            <input type="hidden" name="hash" value="${hash}">
          </form>
        </body>
      </html>
    `;

    res.send(formHtml);

  } catch (err) {
    console.error("Error fetching last order:", err);
    res.status(500).send("Server error");
  }
});


router.post("/notify", express.urlencoded({ extended: true }), (req, res) => {
  const data = req.body;

  const isValid = verifyMd5Sig(data, PAYHERE_MERCHANT_SECRET);

  if (isValid && data.status_code === "2") {
    //success
  } else {
    //failed
  }

  res.sendStatus(200);
});




export default router;
