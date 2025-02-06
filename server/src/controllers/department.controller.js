import { ApiError } from '../utilis/ApiError.js';
import { ApiResponse } from '../utilis/ApiResponse.js';
import { asyncHandler } from '../utilis/asyncHandler.js';
import { Department } from '../models/department.model.js';
import { Doctor } from '../models/doctor.model.js';

const registerDepartment = asyncHandler( async (req, res, next) => {
    const { departName, description, headOfDepartment } = req.body;
    if (!departName || !description || !headOfDepartment) {
        throw new ApiError(400, "Please fill all fields")
    }

    const doctor = await Doctor.findOne({ fullName: headOfDepartment });
    if (!doctor) {
        throw new ApiError(400, 'doctor not found')
    }

    const department = await Department.create({
        departName,
        description,
        headOfDepartment: doctor._id
    })

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            department,
            "Department registered successfully"
        )
    )
});

const updateDepartment = asyncHandler ( async (req, res) => {
    const { departName, description, headOfDepartment } = req.body;
    if (!departName || !description || !headOfDepartment) {
        throw new ApiError(400, "Please fill all fields")
    }

    const doctor = await Doctor.findOne({ fullName: headOfDepartment });
    if (!doctor) {
        throw new ApiError(400, 'doctor not found')
    }

    const department = await Department.findByIdAndUpdate(
        req.params.id,
        {
            departName,
            description,
            headOfDepartment: doctor._id
        },
        {
            new: true,
            runValidators: true
        }
    )

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            department,
            "Department updated successfully"
        )
    )
});

const getAllDepartments = asyncHandler( async (req, res) => {
    const departments = await Department.find()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            departments,
            "All departments fetched successfully"
        )
    )
} );

const deleteDepartment = asyncHandler( async (req, res) => {
    const { id } = req.params;
    let department = await Department.findById(id);
    if (!department) {
        throw new ApiError(404, "Department not found")
    }
    department = await department.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse (
            200,
            {},
            "Department Deleted successfully"
        )
    )
} );

export { registerDepartment, getAllDepartments, deleteDepartment, updateDepartment }
