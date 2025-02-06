import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const patientSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
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
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, "Password must be at least 8 characters"]
    },
    address: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: String,
        required: true
    }

}, {timestamps:true})

patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

patientSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// now write function for jwt tokens
patientSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
            _id:this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error(error)
    }
}

patientSchema.methods.generateRefreshToken = function () {
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
        console.error(error)
    }
}

export const Patient = mongoose.model('Patient', patientSchema)