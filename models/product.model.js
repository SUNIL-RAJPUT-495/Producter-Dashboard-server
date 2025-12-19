import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    MRP: {
      type: String,
      required: true,
    },
    SellingPrice: {
      type: String,
      required: true,
    },
    BrandName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      default: "",
    },
    productType: {
      type: String,
      required: true,
    },
    ExchangeReturnEligibility: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
