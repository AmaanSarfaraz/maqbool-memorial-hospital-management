import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({
    patientName: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled", "Pending"],
        default: "Pending"
    },
    notes: {
        type: String,
        required: true
    },
    patientEmail: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    patientPhone: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    address: {
        type: String,
        required: true
    }
},{timestamps:true}) 

export const Appointment = mongoose.model("Appointment", appointmentSchema)