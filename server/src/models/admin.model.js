import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, "Password must be at least 8 characters"]
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        required: true,
        type: String,
    },
    coverImage: {
        type: String,
    },
    refreshToken: {
        type: String,
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
    phone: {
        type: String,
        unique: true,
        required: true,
        minLength: [10, "enter valid phone number"],
        maxLength: [13, "enter valid phone number"]
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Doctor', 'Receptionist', 'Pharmacist', 'Patient']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {timestamps: true});

// install bcrypt for password hash and write function for that
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next;
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// now write function for jwt tokens
adminSchema.methods.generateAccessToken = function () {
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

adminSchema.methods.generateRefreshToken = function () {
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

const Admin = mongoose.model('Admin', adminSchema);
export { Admin }