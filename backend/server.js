import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRouter from "./src/routes/categories.js";
import itemRouter from "./src/routes/item.js";
import customerRouter from "./src/routes/customer.js";
import orderRouter from "./src/routes/order.js";
import payhere from "./src/routes/payhere.js";
import wishlistRouter from "./src/routes/wishlist.js";
import pointsRouter, { migrateHotelToESystem, bulkupdatehotelpoints } from "./src/routes/cuspoints.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use("/api/v1/e-commerce", categoriesRouter);
app.use("/api/v1/e-commerce", itemRouter);
app.use("/api/v1/e-commerce", customerRouter);
app.use("/api/v1/e-commerce", orderRouter);
app.use("/api/v1/e-commerce", wishlistRouter);
app.use("/api/v1/e-commerce/payhere", payhere);
app.use("/api/v1/e-commerce", pointsRouter);


// 🔹 Background Polling Job
setInterval(async () => {
  // console.log("⏳ Running background migration...");
  await migrateHotelToESystem();
}, 30000); // every 30 sec

setInterval(async () => {
  // console.log("⏳ Running bulk update...");
  await bulkupdatehotelpoints();
}, 30000); // every 30 sec


// 🔹 Start Server

app.listen(port, host, () => {
  console.log(`🚀 Server running at http://${host}:${port}`);
});
