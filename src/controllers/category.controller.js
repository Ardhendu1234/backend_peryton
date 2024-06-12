import { Service } from "../models/services.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Add a new Service (admin)
const addService = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { name } = req.body;
    
  
    // Check if all required fields are provided
    if (!name ) {
      throw new ApiError(400, "Name is required");
    }

    const serviceExist=await Service.findOne({name})
    if(serviceExist){
      throw new ApiError(400, "Service already exist");
    }


    // Create a new Service instance
    const newService = new Service({
      name,
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

const deleteService = asyncHandler(async (req, res) => {
    const { _id }=req.query
      // Delete the Service
      const deleted=await Service.findByIdAndDelete(_id)
    if(!deleted){
        throw new ApiError(400, "Service is not deleted");
    }

      // Return a success message
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Service deleted successfully"));
    });


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
        deleteService,
        addService,
      } 