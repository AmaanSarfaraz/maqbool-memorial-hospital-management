import mongoose, {Schema} from "mongoose";
import validator from "validator";

const messageSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "phone number must contain exact 10 Digits"],
        maxLength: [10, "phone number must contain exact 10 Digits"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain atleast 3 chracters"]
    },
}, {timestamps:true})

export const Message = mongoose.model('Message', messageSchema)