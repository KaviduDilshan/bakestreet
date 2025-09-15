import CryptoJS from "crypto-js";

// Secret key (keep this safe!)
const SECRET_KEY = "my_super_secret_key_123"; // change this in production

// Encrypt a plain number (e.g., product ID)
export function encryptId(id) {
  return CryptoJS.AES.encrypt(String(id), SECRET_KEY).toString();
}

// Decrypt an encrypted string back to ID
export function decryptId(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return Number(originalText);
  } catch (err) {
    console.error("Failed to decrypt ID:", err);
    return null;
  }
}

