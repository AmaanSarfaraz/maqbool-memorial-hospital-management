import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiError} from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadOnCloudinary } from "../utilis/Cloudinary.js";
import { Admin } from "../models/admin.model.js";
import { Department } from "../models/department.model.js";

const generateAccessAndRefreshToken = async (doctorId) => {
    try {
        const doctor = await Doctor.findById(doctorId);
        const doctorAccessToken = doctor.generateAccessToken();
        const doctorRefreshToken = doctor.generateRefreshToken();

        doctor.doctorRefreshToken = doctorRefreshToken;
        await doctor.save({validateBeforeSave: false});

        return { doctorAccessToken, doctorRefreshToken };

    } catch (error) {
        throw new ApiError(500, `something went wrong when generating access and refresh token ${error}`);
    }
}

const registerDoctor = asyncHandler(async (req, res, next) => {
    const {
        fullName,
        email,
        password,
        phone,
        gender,
        dob,
        specialisation,
        doctorDepartment,
        qualification,
        experience
    } = req.body;

    if ([fullName, email, password, phone, gender, dob, specialisation, doctorDepartment, qualification, experience].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please enter all fields")
    }

    const existedDoctor = await Doctor.findOne({
        $or: [{email}, {phone}]
    })

    if (existedDoctor) {
        throw new ApiError(400, "Doctor already exists")
    }

    const docAvatarLocalPath = req.files?.docAvatar?.[0]?.path
    if (!docAvatarLocalPath) {
        throw new ApiError(400, "Doctor avatar is required")
    }

    const avatar = await uploadOnCloudinary(docAvatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Doctor avatar is required");
    }

    const fetchDepartment = await Department.findOne({departName: doctorDepartment})
    if (!fetchDepartment) {
        throw new ApiError(400, "Department not found")
    }

    const doctor = await Doctor.create({
        fullName,
        email,
        password,
        phone,
        gender,
        dob,
        specialisation,
        doctorDepartment: fetchDepartment._id,
        qualification,
        experience,
        docAvatar: avatar.url,
        role: "Doctor"
    })

    const createdDoctor = await Doctor.findById(doctor._id)
       .select("-password -doctorRefreshToken")
    if (!createdDoctor) {
        throw new ApiError(400, "Something went wrong while registering the doctor")
    }

    return res.status(201).json(
        new ApiResponse(200, createdDoctor, "Doctor registered successfully")
    )
})

const doctorLogin = asyncHandler(async (req, res) => {
    const { email, password, phone } = req.body;
    if (!(email || phone)) {
        throw new ApiError(400, "email or phone is required")
    }

    const doctor = await Doctor.findOne({
        $or: [{email}, {phone}]
    })
    if (!doctor) {
        throw new ApiError(404, "Doctor not found")
    }

    const isMatch = await doctor.matchPassword(password)
    if (!isMatch) {
        throw new ApiError(400, "incorrect password")
    }

    const { doctorAccessToken, doctorRefreshToken } = await generateAccessAndRefreshToken(doctor._id);
    const loggedInDoctor = await Doctor.findById(doctor._id).select("-password -doctorRefreshToken");

    return res.status(200)
    .json(
        new ApiResponse (
            200,
            {
                doctor: loggedInDoctor,
                doctorAccessToken,
                doctorRefreshToken
            },
            "Doctor logged in successfully"
        )
    )
})

const doctorLogout = asyncHandler(async (req, res) => {
    await Doctor.findByIdAndUpdate(
        req.doctor._id,
        {
            $unset: {
                doctorRefreshToken: 1
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
            "Doctor logged out successfully"
        )
    )
});

const getCurrentDoctor = asyncHandler(async (req, res) => {
    const doctor = req.doctor
    return res.status(200)
    .json(
        new ApiResponse (
            200,
            doctor,
            "current doctor fetched successfully"
        )
    )
})

const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find()
    return res.status(200)
    .json(
        new ApiResponse (
            200,
            doctors,
            "All doctors fetched successfully"
        )
    )
});

const removeDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let doctor = await Doctor.findById(id);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found")
    }
    doctor = await doctor.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse (
            200,
            {},
            "Doctor removed successfully"
        )
    )
});

export { registerDoctor, doctorLogin, getCurrentDoctor, doctorLogout, getAllDoctors, removeDoctor }