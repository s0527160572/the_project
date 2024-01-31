import mongoose from "mongoose";
import bcrypt, { hash, compare } from "bcrypt";
import { userModel, userValidatorForLogin, userValidatorForSignUp } from "../models/user.js";
import { genrateToken } from "../config/genrateToken.js";

const getAlluser = async (req, res) => {
    try {
        const alluser = await userModel.find({}, "-password");
        res.json(alluser);
    }
    catch (err) {
        res.status(400).send("A timeout occurred while retrieving the data" + err.message);
    }

}

const login = async (req, res) => {

    let validate = userValidatorForLogin(req.body);
    if (validate.error)
    return res.status(400).send("Error The data you sent is invalid" + validate.error.details[0].message);    
    let { password, userName } = req.body;
    try {

        let user = await userModel.findOne({ userName: userName });
        if (!user || ! await compare(password, user.password))
            res.status(404).send("No user was found with such a password pliss sign up");
        let token = genrateToken(user);
    
        return res.json({ token, userName: user.userName, email: user.email });
        
    }
    catch (err) {
        res.status(400).send("A timeout occurred while retrieving the data" + err.message);
    }

}


const adduser = async (req, res) => {

    let validate = userValidatorForSignUp(req.body);
    if (validate.error)
    return res.status(400).send("Error The data you sent is invalid" + validate.error.details[0].message);    
    let { email, userName, password, role, DateOfRegistratione } = req.body;
    try {
        let sameuser = await userModel.findOne({ $or: [{ email: email }, { userName: userName }] });
        if (sameuser)
            return res.status(409).send(" user with similar credentails already exists");
        let hashPassword = await hash(password, 15);
        let newuser = new userModel({ email, userName, password: hashPassword, role, DateOfRegistratione });
        let token = genrateToken(newuser);
        await newuser.save();
        return res.json({ token, userName: newuser.userName, email: newuser.email });

    }
    catch (err) {
        res.status(400).send("A timeout occurred while add the data" + err.message);

    }
}

export { getAlluser, login, adduser };
