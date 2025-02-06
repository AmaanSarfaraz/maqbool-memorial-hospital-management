import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utilis/ApiError.js';
import { asyncHandler } from '../utilis/asyncHandler.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new ApiError(401, 'Unauthorized request - No token provided');
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch admin details excluding password and refreshToken
        const admin = await Admin.findById(decodedToken?._id).select('-password -adminRefreshToken');

        if (!admin) {
            throw new ApiError(401, 'Invalid access token - Admin not found');
        }

        req.admin = admin;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid token');
    }
});

export { verifyJWT };
