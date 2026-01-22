export const mapProductToViewModel = (dbRow) => {
  return {
    productId: dbRow.id,
    productName: dbRow.product_name,
    categoryId: dbRow.category_id,
    categoryName: dbRow.category,
    mrp: dbRow.mrp,
    sp: dbRow.sp,
    cp: dbRow.cp,
    classification: dbRow.classification,
    size: dbRow.size
  };
};


//Renaming DB columns doesn’t break UI