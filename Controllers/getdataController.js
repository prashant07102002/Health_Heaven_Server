import { success } from "../Utils/responseWrapper.js";

const userdataController = (req, res) => {
    try {
        console.log("the id is", req._id);
        res.send(success(200, "this is the user data"));

    } catch (error) {
        console.log(error);
    }
}
export default {
    userdataController,
}