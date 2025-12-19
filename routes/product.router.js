import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
} from "../controllers/uploadProduct.js";

const productRouter = express.Router();

productRouter.post("/add-product", addProduct);

productRouter.get("/get-product", getProducts);

productRouter.delete("/delete-product/:id", deleteProduct);

productRouter.put("/edit-product/:id", updateProduct);

export default productRouter;
