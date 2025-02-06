import { Doctor } from '../models/doctor.model.js';
import { ApiError } from '../utilis/ApiError.js'
import { asyncHandler } from '../utilis/asyncHandler.js';
import jwt from 'jsonwebtoken';

const doctorVerifyJWT = asyncHandler (async (req, _, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'Unauthorized request')
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const doctor = await Doctor.findById(decodedToken?._id).select('-password -refreshToken')

        if (!doctor) {
            throw new ApiError(401, 'invalid access token')
        }

        req.doctor = doctor
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid method')
    }
})

export { doctorVerifyJWT }