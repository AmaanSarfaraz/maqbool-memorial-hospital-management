import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { Patient } from '../models/patient.model.js';
import { Doctor } from "../models/doctor.model.js";

const postAppointment = asyncHandler( async(req, res, next) => {
    const {patientName, doctor, appointmentDate, notes, address, patientPhone, patientEmail } = req.body;
    if (!appointmentDate || !notes || !address || !patientName || !doctor || !patientPhone || !patientEmail) {
        throw new ApiError(400, "All fields are required")
    }

    const newPatient = await Patient.findOne({username: patientName })
    if (!newPatient) {
        throw new ApiError(400, "patient not found")
    }

    const newDoctor = await Doctor.findOne({ fullName: doctor });
    if (!newDoctor) {
        throw new ApiError(400, 'doctor not found')
    }

    const appointment = await Appointment.create({
        patientName: newPatient._id,
        doctor: newDoctor._id,
        appointmentDate,
        notes,
        address,
        patientPhone: newPatient._id,
        patientEmail: newPatient._id
    })

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            appointment,
            "Appointment sent successfully"
        )
    )

});

const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find()
        .populate('patientName', 'username fullName')
        .populate('doctor', 'fullName')
        .populate('patientEmail', 'email')
        .populate('patientPhone', 'phone');

    if (appointments.length === 0) {
        throw new ApiError(404, "No appointments found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            appointments,
            "All appointments fetched successfully"
        )
    );
});

const updateAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id)
    if (!appointment) {
        throw new ApiError(404, "Appointment not found")
    }

    appointment = await Appointment.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            appointment,
            "Appointment updated successfully"
    ))
});

const deleteAppointment = asyncHandler(async (req, res) => {

    const { id } = req.params;
    let appointment = await Appointment.findById(id)
    
    if (!appointment) {
        throw new ApiError(404, "Appointment not found")
    }

    appointment = await Appointment.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Appointment deleted successfully"
        )
    )
});

const getPatientAppointments = asyncHandler( async (req, res) => {

    const {id} = req.params;
    const appointments = await Appointment.find({ patientName: id })
    .populate("patientName", "fullName")
    .populate("doctor", "fullName")
    .populate("patientEmail", "email")
    .populate("patientPhone", "phone")

    return res.status(200).json(
        new ApiResponse(200, appointments, "Patient appointments fetched successfully")
    );
});


export { postAppointment, getAllAppointments, updateAppointment, deleteAppointment, getPatientAppointments }