import { Service } from "../models/services.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Add a new Service (admin)
const addService = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { name, description } = req.body;
    console.log(name,description)
  
    // Check if all required fields are provided
    if (!name || !description ) {
      throw new ApiError(400, "All fields are required");
    }

    const serviceExist=await Service.findOne({name})
    if(serviceExist){
      throw new ApiError(400, "Service already exist");
    }

    const imageLocalPath=req.file?.path


    if(!imageLocalPath){
      throw new ApiError(400, "Image is required");
    }

    const imageUrls=await uploadOnCloudinary(imageLocalPath)

  
    // Create a new Service instance
    const newService = new Service({
      name,
      description,
      imageUrls:imageUrls?.url
    });

    
    // Save the new Service
    const savedService = await newService.save();

    if(!savedService){
        throw new ApiError(400, "There is error while saving Service ,Please try again");
    }
  
    // Return the saved Service
    return res
      .status(201)
      .json(
        new ApiResponse(201, savedService, "Service added successfully")
      );
  });

  
  // Update a Service (admin)
const updateService = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { _id ,name, description } = req.body
    console.log(req.body)
  
    // Find the Service by ID
    const service = await Service.findById(_id);
  
    // If Service is not found, throw an error
    if (!service) {
      throw new ApiError(404, "Service not found");
    }
  
    // Update the Service fields
    service.name = name || service.name
    service.description = description || service.description;
    
  
    // Save the updated Service
    const updatedService = await Service.save();
  
    // Return the updated Service
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedService, "Service updated successfully")
      );
  });

  
  // Delete a Service (admin)
const deleteService = asyncHandler(async (req, res) => {
  const { _id }=req.query
       // Delete the service
      const deleted=await Service.findByIdAndDelete(_id)
    // Return a success message
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Service deleted successfully"));
  });

  
  // Get all Services

const getAllServices = asyncHandler(async (req, res) => {
    // Find all Services
    const service = await Service.find();
  
    // Return the Services
    return res
      .status(200)
      .json(new ApiResponse(200, service, "Services fetched successfully"));
  });

  
  // Get a single Service
const getService = asyncHandler(async (req, res) => {
    // Find the Service by ID
    const service = await Service.findById(req.params.id);
  
    // If Service is not found, throw an error
    if (!service) {
      throw new ApiError(404, "Service not found");
    }
  
    // Return the Service
    return res
      .status(200)
      .json(new ApiResponse(200, service, "Service fetched successfully"));
  });





  export {
    getService,
    getAllServices,
    deleteService,
    updateService,
    addService,
  }