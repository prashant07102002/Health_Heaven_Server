import { success } from "../Utils/responseWrapper.js";
import User from '../Models/User.js';

export const setBodyInfo = async (req, res) => {
    try {
        const {
            height,
            weight, 
            age,
            gender,
            activity,
            calculatedCalory
        } = req.body;

        console.log(req.body);

        const { _id } = req.params;
        console.log(_id);

        const updatedUser = await User.findByIdAndUpdate(_id, {
            height: height,
            weight: weight,
            age: age,
            gender: gender,
            calculatedCalories: calculatedCalory,
            activityLevel: activity,
        });
        
        console.log(updatedUser);
        res.send(success(200, updatedUser));
    } catch (error) {
        console.log(error);
    }
}