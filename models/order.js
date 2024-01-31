import mongoose from "mongoose";
import { productModel } from "./product.js";
import joi from "joi";
// Get the current date
const currentDate = new Date();

// Calculate the new due date by adding 7 days (1 week)
const newDueDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

// Format the new due date as a string in the desired format
const formattedDueDate = `${newDueDate.getFullYear()}-${newDueDate.getMonth() + 1}-${newDueDate.getDate()}`;
const orderSchema = mongoose.Schema({
    DueDate: { type: Date, default: formattedDueDate },
    address: String,
    products: [productModel.name],
    startOff: { type: Boolean, default: false },
    ordDate: { type: Date, default: Date.now() },
    userId: String

})
export const orderModel = mongoose.model("order", orderSchema);

export const orderValidatorForAdd = (_order) => {
    const schema = joi.object({
        address: joi.string().required(),
        products: joi.array().items(joi.string().required()).required(),
        dueDate: joi.date().min(Date.now() + 7 * 24 * 60 * 60 * 1000).required()

    });
    return schema.validate(_order);
}