import db from './db.js';


export const getProducts = async (columns) => { 
  const { filterCategory, search, limit = 10, offset = 0 } = columns; 

  let sql = `
    SELECT p.*, c.category
    FROM products p
    INNER JOIN category c ON p.category_id = c.category_id
  `;

  if (filterCategory && search) {
    columns.search = `%${search}%`;
    sql += `
      WHERE ${filterCategory}::text ILIKE \${search}
      ORDER BY p.id DESC
      LIMIT \${limit} OFFSET \${offset}`;
  } else {
    sql += `
      ORDER BY p.id DESC
      LIMIT \${limit} OFFSET \${offset}`;
  }

  return db.manyOrNone(sql, columns);
};



// Create product
export const createProduct = async (columns) => {
  const { name, category_id, mrp, sp, cp, classification, size } = columns
  const sql = `
    INSERT INTO products 
    (product_name, category_id, mrp, sp, cp, classification, size) VALUES 
    (\${name}, \${category_id}, \${mrp}, \${sp}, \${cp}, \${classification}, \${size}) 
    RETURNING * `
  const result = await db.one(sql, columns);
  return result;
};

// Get product by ID
export const getProductById = async (id) => {
  const sql = `
    SELECT p.*, c.category
    FROM products p
    INNER JOIN category c ON p.category_id = c.category_id
    WHERE p.id = $1
  `;
  return db.oneOrNone(sql, [id]);
};


// Update product
export const updateProduct = async (id, product) => {
  const { name, category_id, mrp, sp, cp, classification, size } = product;
  const sql = `
    UPDATE products SET 
      product_name = \${name}, 
      category_id = \${category_id}, 
      mrp = \${mrp}, 
      sp = \${sp}, 
      cp = \${cp}, 
      classification = \${classification}, 
      size = \${size} 
    WHERE id = \${id} RETURNING *`;
  const result = await db.one(sql, { ...product, id })
  return result;
};

// Delete product
export const deleteProduct = async ({ id }) => {
  const sql = `DELETE FROM products WHERE id = \${id} RETURNING *`;
  return db.oneOrNone(sql, { id });
};

