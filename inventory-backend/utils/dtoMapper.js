// export const ProductDTO = {
//   name: null,
//   category_id: null,
//   mrp: null,
//   sp: null,
//   cp: null,
//   classification: null,
//   size: null
// };

export const mapToDTO = (input, dto) => { //acts as a blueprint
    //const productData = mapToDTO(req.body, ProductDTO);
  const output = {};

  for (const key in dto) { //looping over DTO KEYS ONLY, not input keys.
    if (input[key] !== undefined) {  //Does input contain this key?
      // First key = "name" → input["name"] is "Shirt" → not undefined → ✅ copy it.
      // Next key = "category_id" → input["category_id"] is undefined → ❌ skip it.
      // Next key = "mrp" → input["mrp"] is 500 → not undefined → ✅ copy it.
      output[key] = input[key];
      // output["name"] = "Shirt";
      // output["mrp"] = 500;

    }
  }

  return output;
};
