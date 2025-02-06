import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { Inventory } from "../models/inventory.model.js";

const addProduct = asyncHandler(async(req, res)=> {
    const { productName, quantity, supplier, expirationDate, unitCost} = req.body;
    if (!productName || !quantity || !supplier || !expirationDate || !unitCost) {
        throw new ApiError (400, "All fields are required")
    }

    const product = await Inventory.create({
        productName,
        quantity,
        supplier,
        expirationDate,
        unitCost
    })

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            product,
            "Product added successfully"
        )
    )
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let product = await Inventory.findById(id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    product = await product.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Product deleted successfully"
        )
    )
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let product = await Inventory.findById(id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    product = await product.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
        }
    )
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                product,
                "Product updated successfully"
            )
        )

});

export {addProduct, deleteProduct, updateProduct}