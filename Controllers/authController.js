const user = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signupController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).send("!! Either name,email or password missing !!");
        }
        const existing_user = await user.findOne({ email });
        if (existing_user) {
            res.status(409).send("!! User already exists !!");
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const User = await user.create({
            name,
            email,
            password: hashedpassword
        })
        return res.status(201).json({
            User,
        })
    } catch (error) {
        console.log(error);
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("!! Either name,email or password missing !!");
        }
        const existing_user = await user.findOne({ email });
        if (!existing_user) {
            res.status(404).send("!! User not found !!");
        }
        const matched = await bcrypt.compare(password, existing_user.password);
        if (!matched) {
            res.status(203).send("!! Wrong email id or password !!");
        }
        const accesstoken = generateAccessToken({
            email: existing_user.email,
            id: existing_user.id,
        })
        return res.status(200).json({
            accesstoken,
        })
    } catch (error) {
        console.log(error);
    }
}
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, "abcdefghijklmnopqrstuvwxyz", {
            expiresIn: '20s'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    signupController,
    loginController

}