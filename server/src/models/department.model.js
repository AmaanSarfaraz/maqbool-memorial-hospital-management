import mongoose, {Schema} from "mongoose";

const departmemtSchema = new Schema({
    departName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    headOfDepartment: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    }
});

export const Department = mongoose.model('Department', departmemtSchema)