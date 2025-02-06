import { Patient } from '../models/patient.model.js';
import { ApiError } from '../utilis/ApiError.js'
import { asyncHandler } from '../utilis/asyncHandler.js';
import jwt from 'jsonwebtoken';

const patientVerifyJWT = asyncHandler (async (req, _, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new ApiError(401, 'Unauthorized request')
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const patient = await Patient.findById(decodedToken?._id).select('-password -refreshToken')

        if (!patient) {
            throw new ApiError(401, 'invalid access token')
        }

        req.patient = patient
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid method')
    }
})

export { patientVerifyJWT }