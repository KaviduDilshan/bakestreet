import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Express endpoint
router.get("/most-sold-items", async (req, res) => {
  try {
    const result = await pool.query(`
      WITH sales_by_variant AS (
        SELECT 
          s.item_prid,
          SUM(s.sales_row_qty) AS total_sold
        FROM e_pos_sales_row s
        GROUP BY s.item_prid
      ),
      ranked_variants AS (
        SELECT 
          i.item_id,
          i.item_name,
          i.item_image_1,
          p.item_prid,
          p.item_sell AS latest_price,
          p.item_stock AS total_count,   -- <-- Include stock here
          COALESCE(sv.total_sold,0) AS total_sold,
          ROW_NUMBER() OVER (PARTITION BY i.item_id ORDER BY COALESCE(sv.total_sold,0) DESC) AS rn
        FROM e_pos_item_price p
        LEFT JOIN sales_by_variant sv ON sv.item_prid = p.item_prid
        JOIN e_pos_item i ON p.item_id = i.item_id
      )
      SELECT 
        item_id,
        item_name,
        item_image_1,
        item_prid,
        latest_price,
        total_count,
        total_sold
      FROM ranked_variants
      WHERE rn = 1
      ORDER BY total_sold DESC
      LIMIT 10;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching most sold items:", err);
    res.status(500).send("Server error");
  }
});

// shop all item (without price)
router.get("/items-with-brand", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        i.item_id,
        i.item_name,
        i.item_image_1,
        i.mcategory_id,
        i.scategory_id,        
        b.brand_name
      FROM e_pos_item i
      LEFT JOIN e_pos_brands b 
        ON i.brand_id = b.brand_id
      ORDER BY i.item_id ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Server error");
  }
});

// Get min and max prices per item
router.get("/item-prices", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        item_id, 
        MIN(item_sell) AS min_price, 
        MAX(item_sell) AS max_price
      FROM e_pos_item_price
      GROUP BY item_id
      ORDER BY item_id ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching item prices:", err);
    res.status(500).send("Server error");
  }
});


// Get single product details by ID with all prices and variations
router.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT 
        i.item_id,
        i.item_name,
        i.item_image_1,
        i.item_short_description,
        i.item_long_description,
        b.brand_name,
        m.mcategory_name,
        s1.scategory_name,
        s1.scategory_id,
        p.item_prid,
        p.item_sell,
        p.item_cost,
        p.item_stock,
        p.item_discount_per,
        p.item_discount_val,
        a.attribute_id,
        a.attribute_name,
        v.p1variation_id,
        v.p1variation_name
      FROM e_pos_item i
      LEFT JOIN e_pos_brands b ON i.brand_id = b.brand_id
      LEFT JOIN e_pos_item_maincategory m ON i.mcategory_id = m.mcategory_id
      LEFT JOIN e_pos_item_subcategory_p1 s1 ON i.scategory_id = s1.scategory_id
      LEFT JOIN e_pos_item_price p ON i.item_id = p.item_id
      LEFT JOIN e_pos_variation_mix vm ON p.item_prid = vm.item_prid
      LEFT JOIN e_pos_attribute a ON vm.attribute_id = a.attribute_id
      LEFT JOIN e_pos_variations v ON vm.p1variation_id = v.p1variation_id
      WHERE i.item_id = $1
      ORDER BY p.item_prid, a.attribute_id, v.p1variation_id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Transform rows into nested structure
    const product = {
      item_id: result.rows[0].item_id,
      item_name: result.rows[0].item_name,
      item_image_1: result.rows[0].item_image_1,
      item_short_description: result.rows[0].item_short_description,
      item_long_description: result.rows[0].item_long_description,
      brand_name: result.rows[0].brand_name,
      mcategory_name: result.rows[0].mcategory_name,
      scategory_name: result.rows[0].scategory_name,
      scategory_id: result.rows[0].scategory_id, //
      prices: [],
    };

    const priceMap = {};

    result.rows.forEach(row => {
      if (!priceMap[row.item_prid]) {
        priceMap[row.item_prid] = {
          item_prid: row.item_prid,
          item_sell: row.item_sell,
          item_cost: row.item_cost,
          item_stock: row.item_stock,
          item_discount_per: row.item_discount_per,
          item_discount_val: row.item_discount_val,
          attributes: {},
        };
      }

      if (row.attribute_id) {
        if (!priceMap[row.item_prid].attributes[row.attribute_id]) {
          priceMap[row.item_prid].attributes[row.attribute_id] = {
            attribute_id: row.attribute_id,
            attribute_name: row.attribute_name,
            variations: [],
          };
        }
        // Avoid duplicate variations
        const variations = priceMap[row.item_prid].attributes[row.attribute_id].variations;
        if (row.p1variation_id && !variations.find(v => v.p1variation_id === row.p1variation_id)) {
          variations.push({
            p1variation_id: row.p1variation_id,
            p1variation_name: row.p1variation_name,
          });
        }
      }
    });

    // Convert attributes object to array
    for (const priceId in priceMap) {
      const price = priceMap[priceId];
      price.attributes = Object.values(price.attributes);
      product.prices.push(price);
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get related products (same subcategory, exclude current product)
router.get("/products/related/:subcategoryId/:productId", async (req, res) => {
  const { subcategoryId, productId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        i.item_id,
        i.item_name,
        i.item_image_1,
        i.scategory_id,
        b.brand_name,
        MIN(p.item_sell) AS min_price,
        MAX(p.item_sell) AS max_price
      FROM e_pos_item i
      LEFT JOIN e_pos_brands b 
        ON i.brand_id = b.brand_id
      LEFT JOIN e_pos_item_price p 
        ON i.item_id = p.item_id
      WHERE i.scategory_id = $1
        AND i.item_id != $2
      GROUP BY i.item_id, i.item_name, i.item_image_1, i.scategory_id, b.brand_name
      ORDER BY i.item_id ASC
      LIMIT 20
      `,
      [subcategoryId, productId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Search items by name/description
router.get("/items/search", async (req, res) => {
  const { q } = req.query; // ?q=keyword
  if (!q || !q.trim()) return res.json([]);

  try {
    const result = await pool.query(
      `SELECT 
         i.item_id,
         i.item_name,
         i.item_image_1,
         i.item_short_description,
         b.brand_name
       FROM e_pos_item i
       LEFT JOIN e_pos_brands b ON i.brand_id = b.brand_id
       WHERE i.item_name ILIKE $1 OR i.item_short_description ILIKE $1
       ORDER BY i.item_id ASC
       LIMIT 20`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error searching items:", err);
    res.status(500).send("Server error");
  }
});


export default router;
