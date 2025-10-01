import express from "express";
import pkg from "pg";
import mysql from "mysql2/promise";

const { Pool } = pkg;
const router = express.Router();

// =======================
// 🔹 Database Connections
// =======================
const eSystemDB = new Pool({
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.qldqfcrbgrqwyentjwrg",
  password: "#Ba$58*61kErst",
});

const hotelSystemDB = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "hotel",
  user: "root",
  password: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// =======================
// 🔹 Helper: Clean Points (preserves negative values)
// =======================
function cleanPoints(value) {
  try {
    if (value === null || value === undefined) return 0;
    const pointsStr = String(value).trim();
    if (pointsStr === "" || pointsStr === "null") return 0;

    // Preserve the negative sign
    const isNegative = pointsStr.startsWith('-');
    const cleanStr = pointsStr.replace(/[^\d.]/g, "");
    const parts = cleanStr.split(".");
    const validStr = parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
    const result = parseFloat(validStr);

    return isNaN(result) ? 0 : (isNegative ? -result : result);
  } catch (e) {
    console.warn(`Failed to clean points value: ${value}`, e);
    return 0;
  }
}

// =======================
// 🔹 Migration Function
// =======================
export async function migrateHotelToESystem() {
  try {
    const hotelQuery =
      "SELECT customer_mobile, customer_update_points FROM customer WHERE status = 0";
    const [hotelCustomers] = await hotelSystemDB.query(hotelQuery);

    if (hotelCustomers.length === 0) {
      return { inserted: 0, updated: 0, skipped: 0 };
    }

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const customer of hotelCustomers) {
      const mobileStr = String(customer.customer_mobile).trim();
      const customerUpdatePoints = cleanPoints(customer.customer_update_points);

      if (!mobileStr || mobileStr === "null" || mobileStr === "undefined") {
        console.warn(`Skipping invalid mobile: ${customer.customer_mobile}`);
        skipped++;
        continue;
      }

      try {
        const checkQuery =
          "SELECT user_username, customer_points FROM e_pos_customers WHERE user_username = $1";
        const existingCustomer = await eSystemDB.query(checkQuery, [mobileStr]);

        const now = new Date();
        const dateStr = now.toISOString().split("T")[0];
        const timeStr = now.toISOString().replace("T", " ").split(".")[0];

        if (existingCustomer.rows.length > 0) {
          const currentPoints = cleanPoints(existingCustomer.rows[0].customer_points);
          // This handles both positive and negative values automatically
          const newTotalPoints = currentPoints + customerUpdatePoints;

          await eSystemDB.query(
            "UPDATE e_pos_customers SET customer_points = $1 WHERE user_username = $2",
            [newTotalPoints, mobileStr]
          );

          await eSystemDB.query(
            "INSERT INTO e_pos_points (user_username, have_points, get_points, date, time, total_points) VALUES ($1, $2, $3, $4, $5, $6)",
            [mobileStr, currentPoints, customerUpdatePoints, dateStr, timeStr, newTotalPoints]
          );

          updated++;
          // console.log(`✅ Updated ${mobileStr}: ${currentPoints} ${customerUpdatePoints >= 0 ? '+' : ''} ${customerUpdatePoints} = ${newTotalPoints}`);
        } else {
          // For new customers, use the update points as starting balance
          await eSystemDB.query(
            "INSERT INTO e_pos_customers (user_username, customer_points) VALUES ($1, $2)",
            [mobileStr, customerUpdatePoints]
          );

          await eSystemDB.query(
            "INSERT INTO e_pos_points (user_username, have_points, get_points, date, time, total_points) VALUES ($1, $2, $3, $4, $5, $6)",
            [mobileStr, 0, customerUpdatePoints, dateStr, timeStr, customerUpdatePoints]
          );

          inserted++;
          // console.log(`✅ Inserted ${mobileStr}: 0 ${customerUpdatePoints >= 0 ? '+' : ''} ${customerUpdatePoints} = ${customerUpdatePoints}`);
        }

        await hotelSystemDB.query(
          "UPDATE customer SET status = 1 WHERE customer_mobile = ?",
          [mobileStr]
        );
      } catch (err) {
        console.error(`❌ Error processing ${mobileStr}:`, err.message);
      }
    }

    return { inserted, updated, skipped };
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    return { error: error.message };
  }
}


// =======================
// 🔹 Bulk Update Function
// =======================
export async function bulkupdatehotelpoints() {
  try {
    const pointsQuery = `
      SELECT DISTINCT ON (user_username) 
        user_username, total_points 
      FROM e_pos_points 
      ORDER BY user_username, date DESC, time DESC
    `;
    const pointsResult = await eSystemDB.query(pointsQuery);

    if (pointsResult.rows.length === 0) {
      return { updated: 0, total_records: 0 };
    }

    let updated = 0;
    let errors = [];

    for (const record of pointsResult.rows) {
      const mobileStr = String(record.user_username).trim();
      const totalPoints = cleanPoints(record.total_points);

      try {
        const [updateResult] = await hotelSystemDB.query(
          "UPDATE customer SET customer_points = ?, status = 1 WHERE customer_mobile = ?",
          [totalPoints, mobileStr]
        );

        if (updateResult.affectedRows > 0) {
          updated++;
        }
      } catch (err) {
        console.error(`Error updating ${mobileStr}:`, err);
        errors.push({ customer_mobile: mobileStr, error: err.message });
      }
    }

    return { updated, total_records: pointsResult.rows.length, errors };
  } catch (error) {
    console.error("Bulk update error:", error.message);
    return { error: error.message };
  }
}

// =======================
// 🔹 API Endpoints
// =======================
router.post("/migrate-hotel-to-esystem", async (req, res) => {
  const result = await migrateHotelToESystem();
  res.json(result);
});

router.post("/bulkupdatehotelpoints", async (req, res) => {
  const result = await bulkupdatehotelpoints();
  res.json(result);
});

// =======================
// 🔹 Graceful Shutdown
// =======================
process.on("SIGINT", async () => {
  await eSystemDB.end();
  await hotelSystemDB.end();
  process.exit(0);
});

export default router;




// ✅ API endpoint to check and sync customer points
// router.post("/sync-customer-points", async (req, res) => {
//   const { customer_mobile } = req.body;

//   if (!customer_mobile) {
//     return res.status(400).json({
//       status: 0,
//       message: "customer_mobile is required",
//     });
//   }

//   try {
//     const mobileStr = String(customer_mobile).trim();

//     const eSystemQuery =
//       "SELECT user_username, customer_points FROM e_pos_customers WHERE user_username = $1";
//     const eSystemResult = await eSystemDB.query(eSystemQuery, [mobileStr]);

//     const hotelSystemQuery =
//       "SELECT customer_mobile, customer_points FROM customer WHERE customer_mobile = ?";
//     const [hotelSystemRows] = await hotelSystemDB.query(hotelSystemQuery, [mobileStr]);

//     if (eSystemResult.rows.length === 0 && hotelSystemRows.length === 0) {
//       return res.json({
//         status: 0,
//         message: "Customer not found in any system",
//         customer_mobile: mobileStr,
//       });
//     }

//     const eSystemPoints = cleanPoints(eSystemResult.rows[0]?.customer_points);
//     const hotelSystemPoints = cleanPoints(hotelSystemRows[0]?.customer_points);
//     const totalPoints = eSystemPoints + hotelSystemPoints;

//     // Get current timestamp
//     const now = new Date();
//     const dateStr = now.toISOString().split("T")[0];
//     const timeStr = now.toISOString().replace('T', ' ').split('.')[0]; // Full timestamp format

//     if (eSystemResult.rows.length > 0) {
//       await eSystemDB.query(
//         "UPDATE e_pos_customers SET customer_points = $1 WHERE user_username = $2",
//         [totalPoints, mobileStr]
//       );

//       // ✅ INSERT INTO e_pos_points to track the sync (using user_username)
//       await eSystemDB.query(
//         "INSERT INTO e_pos_points (user_username, have_points, get_points, date, time, total_points) VALUES ($1, $2, $3, $4, $5, $6)",
//         [mobileStr, eSystemPoints, hotelSystemPoints, dateStr, timeStr, totalPoints]
//       );
//     }

//     if (hotelSystemRows.length > 0) {
//       await hotelSystemDB.query(
//         "UPDATE customer SET customer_points = ? WHERE customer_mobile = ?",
//         [totalPoints, mobileStr]
//       );
//     }

//     return res.json({
//       status: 11,
//       message: "Customer points synced successfully",
//       customer_mobile: mobileStr,
//       e_system_points: eSystemPoints,
//       hotel_system_points: hotelSystemPoints,
//       synced_points: totalPoints,
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     return res.status(500).json({
//       status: 0,
//       message: "Database error occurred",
//       error: error.message,
//     });
//   }
// });



// // ✅ API endpoint to just check customer status without syncing
// router.get("/check-customer/:mobile", async (req, res) => {
//   const { mobile } = req.params;

//   try {
//     const mobileStr = String(mobile).trim();

//     const eSystemQuery =
//       "SELECT user_username, customer_points FROM e_pos_customers WHERE user_username = $1";
//     const eSystemResult = await eSystemDB.query(eSystemQuery, [mobileStr]);

//     const hotelSystemQuery =
//       "SELECT customer_mobile, customer_points FROM customer WHERE customer_mobile = ?";
//     const [hotelSystemRows] = await hotelSystemDB.query(hotelSystemQuery, [mobileStr]);

//     const existsInESystem = eSystemResult.rows.length > 0;
//     const existsInHotelSystem = hotelSystemRows.length > 0;

//     if (!existsInESystem && !existsInHotelSystem) {
//       return res.json({
//         status: 0,
//         message: "Customer not found",
//       });
//     }

//     return res.json({
//       status: 11,
//       message: "Customer found",
//       customer_mobile: mobileStr,
//       e_system: {
//         exists: existsInESystem,
//         points: cleanPoints(eSystemResult.rows[0]?.customer_points),
//       },
//       hotel_system: {
//         exists: existsInHotelSystem,
//         points: cleanPoints(hotelSystemRows[0]?.customer_points),
//       },
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     return res.status(500).json({
//       status: 0,
//       message: "Database error occurred",
//       error: error.message,
//     });
//   }
// });



// // ✅ API endpoint to update hotelSystemDB points from eSystemDB
// router.post("/update-hotel-points", async (req, res) => {
//   const { customer_mobile } = req.body;

//   if (!customer_mobile) {
//     return res.status(400).json({ 
//       status: 0,
//       message: "customer_mobile is required",
//     });
//   }

//   try {
//     const mobileStr = String(customer_mobile).trim();

//     // ✅ Fixed: use user_username instead of customer_mobile
//     const pointsQuery =
//       "SELECT have_points FROM e_pos_points WHERE user_username = $1 ORDER BY date DESC, time DESC LIMIT 1";
//     const pointsResult = await eSystemDB.query(pointsQuery, [mobileStr]);

//     if (pointsResult.rows.length === 0) {
//       return res.json({
//         status: 0,
//         message: "No points record found in e_system for this customer",
//         customer_mobile: mobileStr,
//       });
//     }

//     const havePoints = cleanPoints(pointsResult.rows[0].have_points);

//     const [updateResult] = await hotelSystemDB.query(
//       "UPDATE customer SET customer_points = ?, status = 1 WHERE customer_mobile = ?",
//       [havePoints, mobileStr]
//     );

//     if (updateResult.affectedRows === 0) {
//       return res.json({
//         status: 0,
//         message: "Customer not found in hotel system",
//         customer_mobile: mobileStr,
//       });
//     }

//     return res.json({
//       status: 11,
//       message: "Hotel system points updated successfully",
//       customer_mobile: mobileStr,
//       updated_points: havePoints,
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     return res.status(500).json({
//       status: 0,
//       message: "Update failed",
//       error: error.message,
//     });
//   }
// });