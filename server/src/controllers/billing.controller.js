import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { Billing } from "../models/billing.model.js";
import { Patient } from "../models/patient.model.js";
import { Inventory } from "../models/inventory.model.js";

const postBilling = asyncHandler(async (req, res, next) => {
    const { patient, item, totalAmount, paymentStatus} = req.body;
    if (!patient || !item || !totalAmount || !paymentStatus) {
        throw new ApiError(400, "All fields are required")
    }

    const billinPatient = await Patient.findOne({fullName: patient})
    if (!billinPatient) {
        throw new ApiError(404, "Patient not found")
    }

    const billingItem = await Inventory.findOne({productName: item})
    if (!billingItem) {
        throw new ApiError(404, "Item not found")
    }

    const billing = await Billing.create({
        patient: billinPatient._id,
        item: billingItem._id,
        totalAmount,
        paymentStatus
    })

    return res.status(200)
   .json(
    new ApiResponse(
        200,
        billing,
        "Billing generated successfully"
    )
 
   )
});

const getAllBills = asyncHandler(async (req, res) => {
    const bills = await Billing.find()
    return res.status(200)
   .json(
    new ApiResponse(
        200,
        bills,
        "All bills fetched successfully"
    )
   )
});

const updateBill = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { patient, item, totalAmount, paymentStatus} = req.body;
    if (!patient || !item || !totalAmount || !paymentStatus) {
        throw new ApiError(400, "All fields are required")
    }

    const billinPatient = await Patient.findOne({fullName: patient})
    if (!billinPatient) {
        throw new ApiError(404, "Patient not found")
    }

    const billingItem = await Inventory.findOne({productName: item})
    if (!billingItem) {
        throw new ApiError(404, "Item not found")
    }

    const billing = await Billing.findByIdAndUpdate(id, {
        patient: billinPatient._id,
        item: billingItem._id,
        totalAmount,
        paymentStatus
    }, {
        new: true,
        runValidators: true
    })

    return res.status(200)
   .json(
    new ApiResponse(
        200,
        billing,
        "Billing updated successfully"
    ))

});

const deleteBill = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const billing = await Billing.findByIdAndDelete(id)
    if (!billing) {
        throw new ApiError(404, "Billing not found")
    }
    return res.status(200)
    .json(
         new ApiResponse(
             200,
             {},
             "Billing deleted successfully"
        ))
});

export { postBilling, getAllBills, updateBill, deleteBill }