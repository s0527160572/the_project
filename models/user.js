import joi from "joi";
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email: String,
    userName: String,
    password: String,
    role: { type: String, default: "user" },
    DateOfRegistration: { type: Date, default: Date.now() }
})
export const userModel = mongoose.model("user", userSchema);

export const userValidatorForLogin = (_user) => {
    const schema = joi.object({
        userName: joi.string().min(3).max(30).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(_user);
}

export const userValidatorForSignUp = (_user) => {
    const schema = joi.object({
        role: joi.string(),

        email: joi.string().email().required(),
        userName: joi.string().min(3).max(30).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(_user);
}