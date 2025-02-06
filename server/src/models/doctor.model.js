import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const doctorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, "Password must be at least 8 characters"]
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minLength: [10, "enter valid phone number"],
        maxLength: [13, "enter valid phone number"]
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    specialisation: {
        type: String,
        required: true,
    },
    doctorDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    docAvatar: {
        required: true,
        type: String
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    }

}, {timestamps:true})

doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next;
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

doctorSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// now write function for jwt tokens
doctorSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
            _id:this._id,
            email: this.email,
            fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.log(error);
        
    }
}

doctorSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            {
            _id:this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export const Doctor = mongoose.model('Doctor', doctorSchema)