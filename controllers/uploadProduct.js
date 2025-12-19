import ProductModel  from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      stock,
      MRP,
      SellingPrice,
      BrandName,
      productImage,
      ExchangeReturnEligibility,
    } = req.body;

    if (
      !productName ||
      !productType ||
      !stock ||
      !MRP ||
      !SellingPrice ||
      !BrandName ||
      !productImage ||
      !ExchangeReturnEligibility
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const newProduct = await ProductModel.create({
      productName,
      productType,
      stock,
      MRP,
      SellingPrice,
      BrandName,
      productImage,
      ExchangeReturnEligibility,
    });

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Product Updated Successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
