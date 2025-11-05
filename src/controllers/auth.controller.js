import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateOtp } from "../utils/generateOtp.js";
import { generateOtpMail } from "../middlewares/otpMail.middleware.js";
import { transporter } from "../config/mailer.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    // Generate OTP
    const otp = generateOtp();

    // Send OTP email
    const mailOptions = generateOtpMail(otp, email);
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error sending OTP email", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      otp,
      otpExpiresAt,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      data: { email: newUser.email, otp: otp },
    });
  } catch (error) {
    console.log("Error in register User", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log(email, otp);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or OTP",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }
    if (
      user.otp.toString() !== otp.toString() ||
      user.otpExpiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
    user.isVerified = true;
    user.otp = "";
    user.otpExpiresAt = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("Error in verify Email", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is not verified",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("newsAggregator", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    console.error("Error in login User", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("newsAggregator", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error in logout User", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
