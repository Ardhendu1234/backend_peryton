import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Add a new product (admin)
const addProduct = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { name, description, price, productType, stock } = req.body;
  
    // Check if all required fields are provided
    if (!name || !description || !price || !productType || !stock) {
      throw new ApiError(400, "All fields are required");
    }

    const productExist=await Product.findOne({name})
    if(productExist){
      throw new ApiError(400, "Product already exist");
    }

    const imageLocalPath=req.file?.path


    if(!imageLocalPath){
      throw new ApiError(400, "Image is required");
    }

    const imageUrls=await uploadOnCloudinary(imageLocalPath)

  
    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      productType,
      stock,
      imageUrls:imageUrls?.url
    });

    
    // Save the new product
    const savedProduct = await newProduct.save();

    if(!savedProduct){
        throw new ApiError(400, "There is error while saving product ,Please try again");
    }
  
    // Return the saved product
    return res
      .status(201)
      .json(
        new ApiResponse(201, savedProduct, "Product added successfully")
      );
  });

  
  // Update a product (admin)
const updateProduct = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { _id ,name, description, price, productType, stock } = req.body
    console.log(req.body)
  
    // Find the product by ID
    const product = await Product.findById(_id);
  
    // If product is not found, throw an error
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
  
    // Update the product fields
    product.name = name || product.name
    product.description = description || product.description;
    product.price = price || product.price;
    product.productType = productType || product.productType;
    product.stock = stock || product.stock;
  
    // Save the updated product
    const updatedProduct = await product.save();
  
    // Return the updated product
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
      );
  });

  
  // Delete a product (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const {_id}=req.body
    // Delete the product
    await Product.findByIdAndDelete(_id)
  
    // Return a success message
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully"));
  });

  
  // Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    // Find all products
    const products = await Product.find();
  
    // Return the products
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  });

  
  // Get a single product
const getProduct = asyncHandler(async (req, res) => {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
  
    // If product is not found, throw an error
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
  
    // Return the product
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  });

  
  // Update stock of a product (admin)
const updateStock = asyncHandler(async (req, res) => {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
  
    // If product is not found, throw an error
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
  
    // Update the stock
    product.stock = req.body.stock;
  
    // Save the updated product
    const updatedProduct = await product.save();
  
    // Return the updated product
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product stock updated successfully")
      );
  });


  // Get product type enums
const getProductTypeEnums = asyncHandler(async (req, res) => {
    try {
      const productTypeEnum = Product.schema.path('productType').enumValues;
      return res
        .status(200)
        .json(new ApiResponse(200, productTypeEnum, 'Product type enums fetched successfully'));
    } catch (err) {
      throw new ApiError(500, 'Internal Server Error');
    }
   });


//get all product names in backend
const getAllProductNames = asyncHandler(async (req, res) => {
    try {
      // Find all product names and select only the 'name' field
      const productNames = await Product.find({}, 'name');
  
      // Return the product names
      return res
        .status(200)
        .json(
          new ApiResponse(200, productNames, 'Product names fetched successfully')
        );
    } catch (err) {
      throw new ApiError(500, 'Internal Server Error');
    }
  });

  export {
    getProduct,
    updateStock,
    getAllProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    getProductTypeEnums,
    getAllProductNames,
  }