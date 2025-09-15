// src/routes/customer.js
import express from "express";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch"; 
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";
const JWT_EXPIRES_IN = "7d";

// Temporary OTP store
const otpStore = new Map(); 

// Normalize phone number to 947XXXXXXXX format
function normalizePhone(phoneNumber) {
  let trimmed = phoneNumber.trim();

  // If starts with +94 or 94
  if (trimmed.startsWith("+94")) return trimmed.slice(1); // remove '+'
  if (trimmed.startsWith("94")) return trimmed;           // already correct

  // If starts with 0, replace with 94
  if (trimmed.startsWith("0")) return `94${trimmed.slice(1)}`;

  // If user entered 7XXXXXXXX (9 digits only)
  if (/^[0-9]{9}$/.test(trimmed) && trimmed.startsWith("7")) {
    return `94${trimmed}`;
  }

  return trimmed;
}


// -------------------- SEND OTP --------------------
router.post("/customers/send-otp", async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, password } = req.body;
    if (!phoneNumber || !firstName || !lastName || !password)
      return res.status(400).json({ isSuccess: false, message: "All fields required" });

    const normalizedPhone = normalizePhone(phoneNumber);

    // Check if user exists
    const exists = await pool.query(
      "SELECT customer_id FROM e_pos_customers WHERE user_username=$1 AND active=true AND archived=false",
      [normalizedPhone]
    );
    if (exists.rows.length)
      return res.status(400).json({ isSuccess: false, message: "Phone number already registered" });

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP temporarily
    otpStore.set(normalizedPhone, {
      otp,
      firstName,
      lastName,
      password,
      expires: Date.now() + 5 * 60 * 1000, // 5 min
    });

    // -------------------- SMSAPI.LK POST --------------------
    const smsApiUrl = "https://dashboard.smsapi.lk/api/v3/sms/send";
    const smsResponse = await fetch(smsApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SMSAPI_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        recipient: normalizedPhone,
        sender_id: process.env.SMSAPI_SENDER,
        type: "plain",
        message: `Your OTP is ${otp}`,
      }),
    });

    const smsData = await smsResponse.json();
    if (smsData.status !== "success") {
      console.error("SMSAPI Error:", smsData);
      return res.status(500).json({ isSuccess: false, message: "Failed to send OTP", details: smsData });
    }

    res.json({ isSuccess: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ isSuccess: false, message: "Failed to send OTP" });
  }
});

// -------------------- VERIFY OTP --------------------
router.post("/customers/verify-otp", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const normalizedPhone = normalizePhone(phoneNumber);

    const record = otpStore.get(normalizedPhone);
    if (!record)
      return res.status(400).json({ isSuccess: false, message: "No OTP found. Please request again." });
    if (record.expires < Date.now())
      return res.status(400).json({ isSuccess: false, message: "OTP expired. Please request again." });
    if (record.otp !== otp)
      return res.status(400).json({ isSuccess: false, message: "Invalid OTP" });

    // Hash password and insert user
    const hashedPassword = await bcrypt.hash(record.password, 12);
    const result = await pool.query(
      `INSERT INTO e_pos_customers 
        (user_username, user_userpassword, user_first_name, user_last_name, active, archived, user_contact, branch_id)
        VALUES ($1,$2,$3,$4,true,false,$5,1)
        RETURNING customer_id, user_first_name, user_last_name, user_contact`,
      [normalizedPhone, hashedPassword, record.firstName, record.lastName, normalizedPhone]
    );

    otpStore.delete(normalizedPhone);

    // Generate JWT token
    const token = jwt.sign(
      { customer_id: result.rows[0].customer_id, phone: normalizedPhone },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      isSuccess: true,
      message: "Registered successfully",
      token,
      value: result.rows[0],
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ isSuccess: false, message: "Failed to verify OTP" });
  }
});

// -------------------- LOGIN --------------------
router.post("/customers/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password)
      return res.status(400).json({ isSuccess: false, message: "Phone and password required" });

   const normalizedPhone = normalizePhone(phoneNumber);  // ✅


    const result = await pool.query(
      `SELECT * FROM e_pos_customers WHERE user_username=$1`,
      [normalizedPhone]
    );
    if (!result.rows.length)
      return res.status(401).json({ isSuccess: false, message: "Invalid credentials" });

    const customer = result.rows[0];
    const validPassword = await bcrypt.compare(password, customer.user_userpassword);
    if (!validPassword)
      return res.status(401).json({ isSuccess: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { customer_id: customer.customer_id, phone: customer.user_contact },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      isSuccess: true,
      message: "Login successful",
      token,
      customer,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ isSuccess: false, message: "Server error" });
  }
});

export default router;
