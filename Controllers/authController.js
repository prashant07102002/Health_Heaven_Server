import user from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { error, success } from "../Utils/responseWrapper.js";
import transporter from "../Utils/emailSetup.js";
import { info } from "console";

const signupController = async (req, res) => {
  try {
    const { email, password, firstName, lastName, generatedOtp, enteredOtp } =
      req.body;
    if (!email || !password || !firstName || !lastName || !enteredOtp) {
      // res.status(400).send("!! Either name,email or password missing !!");
      res.send(error(400, "All fields are required"));
      return;
    }
    const existing_user = await user.findOne({ email });
    if (existing_user) {
      res.send(error(409, "User already exist!!"));
      return;
      // res.status(409).send("!! User already exists !!");
    }
    console.log(enteredOtp, "and ", generatedOtp);
    if (enteredOtp != generatedOtp) {
      res.send(error(203, "Wrong OTP"));
      return;
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });
    await User.save();
    // return res.status(201).json({
    //     User,
    // })
    return res.send(success(201, "Sign Up Successfull"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      res.send(error(400, "Either email or password missing!!"));
      return;
      // res.status(400).send("!! Either name,email or password missing !!");
    }
    const existing_user = await user.findOne({ email });
    if (!existing_user) {
      res.send(error(409, "User doesn't exist!!"));
      return;
      // res.status(404).send("!! User not found !!");
    }
    console.log("hello");
    const matched = await bcrypt.compare(password, existing_user.password);
    if (!matched) {
      res.send(error(203, "Incorrect email Id or password!!"));
      return;
      // res.status(203).send("!! Wrong email id or password !!");
    }
    const accessToken = generateAccessToken({
      _id: existing_user._id,
    });
    const refreshToken = generateRefreshToken({
      _id: existing_user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { user: existing_user, accessToken }));
    // return res.status(200).json({
    //     accessToken
    // })
  } catch (error) {
    console.log(error);
  }
};
const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "You logged Out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const generateRefreshTokenController = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) {
      // return res.send("!! Cannot find refresh token in the cookie !!");
      res.send(error(401, "Refresh token in cookie is required!!"));
    }
    const refreshToken = cookies.jwt;
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decode._id;
    const accessToken = generateAccessToken({ _id });
    // return res.send({ accessToken });
    res.send(
      success(201, {
        accessToken,
      })
    );
  } catch (e) {
    // console.log(error);
    // return res.status(401).send("Invalid Refresh Token");
    console.log(e);
    return res.send(error(401, "Invalid Refresh Access Key!!"));
  }
};
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
function makeOtp() {
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min) + min);
  return otp;
}
const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("user email is ", email);
    if (!email) {
      res.send(error(400, "Either name or email, password or name missing!!"));
      return;
    }
    const otp = makeOtp();
    console.log("otp is ", otp);
    const mailOptions = {
      from: "healthheavenpw1@gmail.com",
      to: `${email}`,
      subject: "Email Verification",
      text: `You email verification code is : ${otp}. Please enter these otp while sign up`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending mail : ", error);
      } else {
        console.log("Email sent : ", info.response);
        res.send(success(200, otp));
      }
    });
  } catch (e) {
    console.log("error from try catch", e);
  }
};
export default {
  signupController,
  loginController,
  generateRefreshTokenController,
  logoutController,
  generateOTP,
};
