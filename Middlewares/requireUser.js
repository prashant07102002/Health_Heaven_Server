import jwt from 'jsonwebtoken';
import { error } from '../Utils/responseWrapper.js';
export default async (req, res, next) => {
    try {
        if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.send(error(401, "Authorization header is required!!"))
            // return res.send("Authorization header required");
        }
    } catch (error) {
        console.log(error);
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    try {
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decode._id;
        next();
    } catch (e) {
        return res.send(error(401, "Invalid Access Key!!"))
        // return res.send("!! Invalid Access Key !!")
    }
}