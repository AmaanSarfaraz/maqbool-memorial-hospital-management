import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiError} from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";


export const messageSend = asyncHandler (async (req, res, next) => {
    const {fullName, email, phone, message} = req.body;

    if (!fullName || !email || !phone || !message) {
        throw new ApiError(400, "Please Fill All Fields")
    }
        await Message.create({fullName, email, phone, message});

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Message sent successfully"
            )
        )
})

export const getAllMessages = asyncHandler (async (req, res, next) => {
    const messages = await Message.find();
     return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "All messages fetched successfully"
        )
     )
});

export const deleteMessage = asyncHandler( async (req, res, next) => {

    const { id } = req.params;
    let getMessage = await Message.findById(id)

    if (!getMessage) {
        throw new ApiError(404, "Message not found")
    }

    getMessage = await Message.deleteOne()
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Message deleted successfully"
        )
    )
})