import mongoose, { Schema } from 'mongoose';

const staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Administrative', 'Nurse', 'Receptionist'],
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    shifts: {
        type: String,
        required: true,
    }
});

export const Staff = mongoose.model('Staff', staffSchema);