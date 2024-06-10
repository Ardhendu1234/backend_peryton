import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'


//register user
const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend
    //validation
    //check if user already exist
    // check for images,check for avatar
    //upload them to cloudinary
    //create user object- create entry in db
    //remove refresh token and
    // check for user creation
    // return res
  
    const { email , password } = req.body;
  
    if (
      [ email, password].some((field) => field.trim === "")
    ) {
      throw new ApiError(400, "All field is required");
    }
  
    //  User.findOne({email})  for checking single field
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with this username or email already exist");
    }
  
    //accessing files
  
    //const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath =req.files?.coverImage[0]?.path
  //   console.log(req.files);
  
   
  
    const user = await User.create({     
      password,
      email,
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered"));
  });


  


  export {registerUser}