import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// ---------------------- Get all main categories ----------------------
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT 
        m.mcategory_id,
        m.mcategory_name
      FROM e_pos_item i
      JOIN e_pos_item_maincategory m
        ON i.mcategory_id = m.mcategory_id
      ORDER BY m.mcategory_name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching main categories:", err);
    res.status(500).send("Server error");
  }
});


// Get all main categories
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT 
        m.mcategory_id,
        m.mcategory_name
      FROM e_pos_item i
      JOIN e_pos_item_maincategory m
        ON i.mcategory_id = m.mcategory_id
      ORDER BY m.mcategory_name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching main categories:", err);
    res.status(500).send("Server error");
  }
});
// Get all categories with their subcategories (nested structure)
router.get("/categories-all", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT
        m.mcategory_id,
        m.mcategory_name,
        s1.scategory_id,
        s1.scategory_name
      FROM e_pos_item i
      LEFT JOIN e_pos_item_maincategory m
        ON i.mcategory_id = m.mcategory_id
      LEFT JOIN e_pos_item_subcategory_p1 s1
        ON i.scategory_id = s1.scategory_id
        AND i.mcategory_id = m.mcategory_id
      WHERE m.mcategory_id IS NOT NULL
      ORDER BY m.mcategory_name, s1.scategory_name
    `);

    // Structure the data into nested format
    const categoriesMap = {};
    
    result.rows.forEach(row => {
      if (!categoriesMap[row.mcategory_id]) {
        categoriesMap[row.mcategory_id] = {
          mcategory_id: row.mcategory_id,
          mcategory_name: row.mcategory_name,
          subcategories: []
        };
      }
      
      if (row.scategory_id && !categoriesMap[row.mcategory_id].subcategories.some(s => s.scategory_id === row.scategory_id)) {
        categoriesMap[row.mcategory_id].subcategories.push({
          scategory_id: row.scategory_id,
          scategory_name: row.scategory_name
        });
      }
    });

    res.json(Object.values(categoriesMap));
  } catch (err) {
    console.error("Error fetching all categories:", err);
    res.status(500).send("Server error");
  }
});


// ---------------------- Shop categories (nested structure) ----------------------
router.get("/shopcategories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DISTINCT m.mcategory_id,
        m.mcategory_name,
        s1.scategory_id,
        s1.scategory_name,
        s2.spcategory_id,
        s2.spcategory_name
      FROM e_pos_item i
      LEFT JOIN e_pos_item_maincategory m
        ON i.mcategory_id = m.mcategory_id
      LEFT JOIN e_pos_item_subcategory_p1 s1
        ON i.scategory_id = s1.scategory_id
      LEFT JOIN e_pos_item_subcategory_p2 s2
        ON i.spcategory_id = s2.spcategory_id
      ORDER BY m.mcategory_name, s1.scategory_name, s2.spcategory_name
    `);

    const rows = result.rows;
    const shopCategories = [];

    rows.forEach(row => {
      if (!row.mcategory_id) return;

      // ---- Main category ----
      let mainCat = shopCategories.find(c => c.id === row.mcategory_id);
      if (!mainCat) {
        mainCat = {
          id: row.mcategory_id,
          title: row.mcategory_name,
          subcategories: []
        };
        shopCategories.push(mainCat);
      }

      // ---- Subcategory (P1) ----
      if (row.scategory_id) {
        let subCat = mainCat.subcategories.find(s => s.id === row.scategory_id);
        if (!subCat) {
          subCat = {
            id: row.scategory_id,
            title: row.scategory_name,
            subsubcategories: []
          };
          mainCat.subcategories.push(subCat);
        }

        // ---- Sub-subcategory (P2) ----
        if (row.spcategory_id && !subCat.subsubcategories.some(ss => ss.id === row.spcategory_id)) {
          subCat.subsubcategories.push({
            id: row.spcategory_id,
            title: row.spcategory_name
          });
        }
      }
    });

    res.json(shopCategories);
  } catch (err) {
    console.error("Error fetching shop categories:", err);
    res.status(500).send("Server error");
  }
});

// // ---------------------- Get all main/sub/sub-sub categories ----------------------
// router.get("/categories-all", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         m.mcategory_id,
//         m.mcategory_name,
//         s1.scategory_id,
//         s1.scategory_name,
//       FROM e_pos_item_maincategory m
//       LEFT JOIN e_pos_item_subcategory_p1 s1
//         ON s1.main_category_id = m.mcategory_id
//       ORDER BY m.mcategory_name, s1.scategory_name
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching all categories:", err);
//     res.status(500).send("Server error");
//   }
// });

export default router;
