import { Admin } from '../models/admin.model.js';
import { asyncHandler } from '../utilis/asyncHandler.js';
import { ApiError } from '../utilis/ApiError.js';
import { ApiResponse } from '../utilis/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from '../utilis/Cloudinary.js'


const generateAccessAndRefreshToken = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const adminAccessToken = admin.generateAccessToken();
        const adminRefreshToken = admin.generateRefreshToken();

        admin.adminRefreshToken = adminRefreshToken;
        await admin.save({validateBeforeSave: false});

        return { adminAccessToken, adminRefreshToken };

    } catch (error) {
        throw new ApiError(500, `something went wrong when generating access and refresh token`);
    }
}

const adminRegister = asyncHandler(async (req, res, next) => {
    const { username, email, password, fullName, phone, gender, dob } = req.body;

    if ([username, email, password, fullName, phone, gender, dob].some(field => field?.trim() === "")) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedAdmin = await Admin.findOne({
        $or: [{ email }, { username }]
    });

    if (existedAdmin) {
        throw new ApiError(400, 'Admin already exists');
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is required');
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new ApiError(400, 'Avatar upload failed');
    }

    const admin = await Admin.create({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
        phone,
        gender,
        dob,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        role: 'Admin'
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken -coverImage");

    if (!createdAdmin) {
        throw new ApiError(400, 'Something went wrong while registering admin');
    }

    // Generate tokens
    const { adminAccessToken, adminRefreshToken } = await generateAccessAndRefreshToken(admin._id);

    return res.status(201).json(
        new ApiResponse(200, {
            admin: createdAdmin,
            adminAccessToken,
            adminRefreshToken
        }, "Admin registered successfully")
    );
});

const adminLogin = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, 'Username or email is required');
    }

    const admin = await Admin.findOne({
        $or: [{ email }, { username }]
    });

    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
        throw new ApiError(400, 'Password is incorrect');
    }

    // Generate tokens
    const { adminAccessToken, adminRefreshToken } = await generateAccessAndRefreshToken(admin._id);
    const loggedInAdmin = await Admin.findById(admin._id).select('-password -refreshToken');

    return res.status(200).json(
        new ApiResponse(200, {
            admin: loggedInAdmin,
            adminAccessToken,
            adminRefreshToken
        }, "Admin logged in successfully")
    );
});


const adminLogout = asyncHandler(async (req, res, next) => {
        await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true,
        }
    )

    return res.status(200)
   .json(
        new ApiResponse (
            200,
            {},
            "Admin logged out successfully"
        ))
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Access token missing")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const admin = await Admin.findById(decodedToken?._id)
    
        if (!admin) {
            throw new ApiError(401, "invalid refresh token")
        }
    
        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true,
        path:process.env.CLIENT_URI

        }
    
        const {newRefreshToken, accessToken} = await generateAccessAndRefreshToken(admin._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(200, {accessToken, newRefreshToken}, "Access  token refreshed")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})
const changeCurrentPassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword, confirmNewPassword} = req.body

    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "new password and confirm new password does not match")
    }

    const admin = await Admin.findById(req.admin?._id)

    if (!admin) {
        throw new ApiError(404, "admin not found")
    }
    const isPasswordCorrect = await admin.matchPassword(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect old password")
    }
    admin.password = newPassword
    await admin.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password updated successfully")
    )

})

const getCurrentAdmin = asyncHandler(async (req, res) => {
    const admin = req.admin
    return res
    .status(200)
    .json(
        new ApiResponse(200, admin, "current admin fetched successfully")
    )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullName, dob, phone} = req.body
    if(!fullName || !dob || !phone){
        throw new ApiError(400, "all fields are required")
    }

    const admin = await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            fullName,
            dob,
            phone
        },
        {new: true}
        ).select("-password")

        return res
        .status(200)
        .json(
            new ApiResponse(200, admin, "Account details updated successfully")
        )
})

const updateAdminAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError (400, "avatar is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading avatar")
    }

    const admin = await Admin.findByIdAndUpdate(req.admin?._id,
        {
            $set: {
                avatar: avatar.url,
            }
        },
        {new:true}).select("-password")

        return res
        .status(200)
        .json(
            new ApiResponse(200, admin, "Avatar updated successfully")
        )
})
const updateAdminCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError (400, "cover image is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading cover image")
    }

    const admin = await Admin.findByIdAndUpdate(req.admin?._id,
        {
            $set: {
                avatar: coverImage.url,
            }
        },
        {new:true}).select("-password")

        return res
        .status(200)
        .json(
            new ApiResponse(200, admin, "Cover image updated successfully")
        )
});

const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find()
    return res.status(200)
    .json(
        new ApiResponse(200, admins, "All admins fetched successfully")
    )
})

const removeAdmin = asyncHandler(async(req, res) => {
    const { id } = req.params
    let admin = await Admin.findById(id)
    if (!admin) {
        throw new ApiError(404, "Admin not found")
    }

    admin = await Admin.findByIdAndDelete(id)
    return res.status(200)
    .json(
        new ApiResponse(200, {}, "Admin deleted successfully")
    )
})

export {
    adminRegister,
    adminLogin,
    adminLogout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    updateAccountDetails,
    updateAdminAvatar,
    updateAdminCoverImage,
    getAllAdmins,
    removeAdmin,
}

