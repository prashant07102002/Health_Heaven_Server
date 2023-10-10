import { success } from "../Utils/responseWrapper.js";
import User from '../Models/User.js';

export const userdataController = async (req, res) => {
    try {
        const userData = await User.find({_id});
        console.log(userData);
        res.send(success(200, userData));
    } catch (error) {
        console.log(error);
    }
}