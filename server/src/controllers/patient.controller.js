import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiResponse } from "../utilis/ApiResponse.js";


const generateAccessAndRefreshToken = async (patientId) => {
    try {
        const patient = await Patient.findById(patientId);
        const patientAccessToken = patient.generateAccessToken();
        const patientRefreshToken = patient.generateRefreshToken();

        patient.patientRefreshToken = patientRefreshToken;
        await patient.save({ validateBeforeSave: false });

        return { patientAccessToken, patientRefreshToken };

    } catch (error) {
        throw new ApiError(500, 'Something went wrong when generating access and refresh token');
    }
};

const patientRegister = asyncHandler(async (req, res, next) => {
    const {
        fullName,
        email,
        password,
        username,
        phone,
        gender,
        dob,
        bloodGroup,
        address,
        medicalHistory
    } = req.body;

    if ([fullName, email, password, username, phone, gender, dob, bloodGroup, address, medicalHistory].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please enter all fields");
    }

    const existedPatient = await Patient.findOne({
        $or: [{ email }, { username }]
    });
    if (existedPatient) {
        throw new ApiError(400, "Patient already exists");
    }

    const patient = await Patient.create({
        fullName,
        email,
        password,
        username,
        phone,
        gender,
        dob,
        bloodGroup,
        address,
        medicalHistory,
        role: "Patient"
    });

    const createdPatient = await Patient.findById(patient._id).select("-password -patientRefreshToken");

    if (!createdPatient) {
        throw new ApiError(400, 'Something went wrong while registering the patient');
    }

    // Generate tokens and set cookies
    const { patientAccessToken, patientRefreshToken } = await generateAccessAndRefreshToken(patient._id);

    return res.status(201).json(
        new ApiResponse(200, {
            patient: createdPatient, 
            patientAccessToken,
            patientRefreshToken
        },"Patient registered successfully")
    );
});

const patientLogin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!(username || email)) {
        throw new ApiError(400, 'username or email is required')
    }

    const patient = await Patient.findOne({
        $or: [{email}, {username}]
    })
    if (!patient) {
        throw new ApiError(404, 'patient not found')
    }

    const isMatch = await patient.matchPassword(password)
    if (!isMatch) {
        throw new ApiError(400, 'incorrect password')
    }

    const { patientAccessToken, patientRefreshToken} = await generateAccessAndRefreshToken(patient._id)
    const loggedInPatient = await Patient.findById(patient._id).select("-password -patientRefreshToken")

    return res.status(200)
    .json(
        new ApiResponse (200,{
                patient: loggedInPatient, 
                patientAccessToken, 
                patientRefreshToken
            },"patient logged in successfully"
        )
    )
})

const patientLogout = asyncHandler(async (req, res) => {
    await Patient.findByIdAndUpdate(
        req.patient._id,
        {
            $unset: {
                patientRefreshToken: 1
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
            "patient logged out successfully"
        )
    )
})

const getCurrentPatient = asyncHandler(async (req, res) => {
    const patient = req.patient
    return res.status(200)
    .json(
        new ApiResponse (
            200,

            patient,

            "current patient fetched successfully"
        )
    )
});

const getAllPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            patients,
            "All patients fetched successfully"
        )
    )
});

const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let getPatient = await Patient.findById(id)
    if (!getPatient) {
        throw new ApiError(404, "Patient not found")
    }

    getPatient = await Patient.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Patient deleted successfully"
        )
    )
});

const changeCurrentPassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword, confirmNewPassword} = req.body

    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "new password and confirm new password does not match")
    }

    const patient = await Patient.findById(req.patient?._id)

    if (!patient) {
        throw new ApiError(404, "patient not found")
    }
    const isPasswordCorrect = await patient.matchPassword(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect old password")
    }
    patient.password = newPassword
    await patient.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password updated successfully")
    )

});


export { patientRegister, patientLogin, patientLogout, getCurrentPatient, deletePatient, getAllPatients, changeCurrentPassword }