import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Add a new Category (admin)
const addCategory = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { name } = req.body;
    
  
    // Check if all required fields are provided
    if (!name ) {
      throw new ApiError(400, "Name is required");
    }

    const categoryExist=await Category.findOne({name})
    if(categoryExist){
      throw new ApiError(400, "Category already exist");
    }


    // Create a new Category instance
    const newCategory = new Category({
      name,
    });

    
    // Save the new Category
    const savedCategory = await newCategory.save();

    if(!savedCategory){
        throw new ApiError(400, "There is error while saving Category ,Please try again");
    }
  
    // Return the saved Category
    return res
      .status(201)
      .json(
        new ApiResponse(201, savedCategory, "Category added successfully")
      );
  });

const deleteCategory = asyncHandler(async (req, res) => {
    const { _id }=req.query
    console.log(_id)
      // Delete the Category
      const deleted=await Category.findByIdAndDelete(_id)
    if(!deleted){
        throw new ApiError(400, "Category is not deleted");
    }

      // Return a success message
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Category deleted successfully"));
    });


    const getAllCategory = asyncHandler(async (req, res) => {
      // Find all Category
      const category = await Category.find();

      // Return the Category
      return res
        .status(200)
        .json(new ApiResponse(200, category, "Category fetched successfully"));
    });


    export {
        getAllCategory,
        deleteCategory,
        addCategory,
      } 