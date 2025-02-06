import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { Staff } from "../models/staff.model.js";
import { Department } from "../models/department.model.js";

const registerStaffMember = asyncHandler( async (req, res, next) => {
    const { fullName, role, phone, department, shifts } = req.body;
    if (!fullName || !role || !phone || !shifts || !department ) {
        throw new ApiError(400, "All fields are required")
    }

    const newDepartment = await Department.findOne({departName: department})
    if (!newDepartment) {
        throw new ApiError(404, "No department found")
    }

    const staff = await Staff.create({
        fullName,
        role,
        phone,
        department: newDepartment._id,
        shifts
    })

    return res.status(201)
       .json(
            new ApiResponse(
                201,
                staff,
                "Staff registered successfully"
            )
        )
});

const deleteStaffMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let staffMember = await Staff.findById(id)
    if (!staffMember) {
        throw new ApiError(404, "Staff member not found")
    }

    staffMember = await staffMember.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Staff member deleted successfully"
        )
    )
});

const getAllStaffMembers = asyncHandler(async (req, res) => {
    const staffMembers = await Staff.find()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            staffMembers,
            "All staff members fetched successfully"
        )
    )
});

export { registerStaffMember, deleteStaffMember, getAllStaffMembers }