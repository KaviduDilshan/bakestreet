import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRouter from "./src/routes/categories.js";
import itemRouter from "./src/routes/item.js";
import customerRouter from "./src/routes/customer.js";
import orderRouter from "./src/routes/order.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

app.use(cors({ origin: true })); // allow frontend access
app.use(express.json());

// Routes
app.use("/api/v1/e-commerce", categoriesRouter);
app.use("/api/v1/e-commerce", itemRouter);
app.use("/api/v1/e-commerce", customerRouter);
app.use("/api/v1/e-commerce", orderRouter);


app.listen(port, host, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
});
