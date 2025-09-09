import express from "express";
import crypto from "crypto";

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

router.get("/pay", (req, res) => {
  const { order } = req.query; // orderCode // Checkout.vue

  // VALIDATE USER WITH TOKEN

  // GET USER DETAILS & ORDER AMOUNT (WITH `order`)

  const first_name = "TEST";
  const last_name = "User";
  const email = "test@example.com";
  const phone = "0712345678";

  const amount = 500; // INT

  const orderId = "ORDER" + Date.now();
  const currency = "LKR";

  if (!PAYHERE_MERCHANT_ID || !PAYHERE_MERCHANT_SECRET) {
    return res.status(500).send("Merchant ID or Secret not configured");
  }
  if (!amount || !first_name || !last_name || !email || !phone) {
    return res.status(400).send("Missing required query parameters");
  }

  const hash = generateHash(
    PAYHERE_MERCHANT_ID,
    orderId,
    amount,
    currency,
    PAYHERE_MERCHANT_SECRET
  );

  const formHtml = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="${PAYHERE_URL}">
          <input type="hidden" name="merchant_id" value="${PAYHERE_MERCHANT_ID}">
          <input type="hidden" name="return_url" value="${PAYHERE_RETURN_URL}">
          <input type="hidden" name="cancel_url" value="${PAYHERE_CANCEL_URL}">
          <input type="hidden" name="notify_url" value="${PAYHERE_NOTIFY_URL}">

          <input type="hidden" name="order_id" value="${orderId}">
          <input type="hidden" name="items" value="Sample Item">
          <input type="hidden" name="currency" value="${currency}">
          <input type="hidden" name="amount" value="${amount}">

          <input type="hidden" name="first_name" value="${first_name}">
          <input type="hidden" name="last_name" value="${last_name}">
          <input type="hidden" name="email" value="${email}">
          <input type="hidden" name="phone" value="${phone}">
          <input type="hidden" name="address" value="Colombo">
          <input type="hidden" name="city" value="Colombo">
          <input type="hidden" name="country" value="Sri Lanka">

          <input type="hidden" name="hash" value="${hash}">
        </form>
      </body>
    </html>
  `;
  res.send(formHtml);
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
