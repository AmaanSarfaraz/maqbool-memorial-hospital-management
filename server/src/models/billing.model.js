import mongoose, { Schema } from "mongoose";

const billingSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Paid', 'Free', 'Unpaid', 'Pending'],
        default: 'Pending'
    }
});

export const Billing = mongoose.model('Billing', billingSchema);