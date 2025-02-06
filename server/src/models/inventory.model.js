import mongoose, {Schema} from "mongoose";

const inventorySchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true,
    }
})

export const Inventory = mongoose.model('Inventory', inventorySchema)