import express from "express";
import bodyParser from "body-parser";
//import pg from "pg";
//import env from "dotenv";
import cors from "cors";
import { field_Validation, id_Validation } from "./middleware/validation.js";
import * as categoryModel from "./models/categoryModel.js";
import * as productModel from "./models/productModel.js";
import { success, failure } from "./utils/apiResponse.js";
import { ProductDTO } from "./dto/product.dto.js";
import { mapToDTO } from "./utils/dtoMapper.js";
import { mapProductToViewModel } from "./utils/productViewModelMapper.js";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/ProductList", async (req, res) => {
  try {
    //const { filterCategory, search, limit = 10, offset = 0 } = req.body;
    const products = await productModel.getProducts(req.body);
    const viewModels = products.map(mapProductToViewModel); // json
    // const viewModels = products.map(dbRow => mapToViewModel(dbRow, ProductViewModel));
    res.json(success(viewModels));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(failure(error.message));
  }
});

app.post("/getCategories", async (req, res) => {
  try {
    const categoryResp = await categoryModel.getAllCategories();
    //console.log(categoryResp);
    res.json(success(categoryResp));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(failure(error.message));
  }
});

app.post("/AddProduct", field_Validation, async (req, res) => {
  try {
    //const { name, category_id, mrp, sp, cp, classification, size } = req.body;
   // const result = await productModel.createProduct(req.body);

   const productData = mapToDTO(req.body, ProductDTO);
   // passing frontend fields, ProductDTO definiton(object)
   // mapToDTO returns Output obj (mapper)
   // productData conatains Output obj 
   const result = await productModel.createProduct(productData); // output obj from 
res.json(success({
  message: "Product added Successfully",
  product: mapProductToViewModel(result) //Passing db object to view model
}));
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json(failure(error.message));
  }
});

app.post("/EditProduct/:id", id_Validation, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productModel.getProductById(id);  

    if (!product) {
      return res.status(404).json(failure("Product not found"));
    }

    res.json(success(mapProductToViewModel(product)));  //Passing db object to view model
  } catch (error) {
    res.status(500).json(failure(error.message));
  }
});

app.post("/UpdateProduct/:id", id_Validation, field_Validation, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      //const { name, category_id, mrp, sp, cp, classification, size } = req.body;
      //const updatedProduct = await productModel.updateProduct(id, req.body);

      const productData = mapToDTO(req.body, ProductDTO)
         // passing frontend fields, ProductDTO definiton(object)
        // mapToDTO returns Output obj (mapper)
        // productData conatains Output obj 
      const updatedProduct = await productModel.updateProduct(id, productData);
res.json(success({
  message: "Product updated Successfully",
  product: mapProductToViewModel(updatedProduct)  //Passing db object to view model
}));

    } catch (error) {
      res.status(500).json(failure(error.message));
    }
  }
);

app.post("/DeleteProduct/:id", id_Validation, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteResp = await productModel.deleteProduct({id});
    res.json(success("Product Deleted Successfully"));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(failure(error.message));
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running on port: http://localhost:${port}`);
});
