class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const  errorHandler = (err, req, res, next) => {
    err.message = err.message || "internal server error"
    err.statusCode = err.statusCode || 500

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ApiError(400, message);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Jsonwebtoken is invalid, please try again`
        err = new ApiError(400, message);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Token Expired, please try again`
        err = new ApiError(400, message);
    }

    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`
        err = new ApiError(400, message);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
}

export  {ApiError}