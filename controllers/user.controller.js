import UserModel from "../models/User.model.js";
import sendEmail from "../config/senEmail.js";
import generatedOtp from "../utils/generatedOtp.js";
import { response } from "express";





export async function sendOtpController(req, res) {
  try {
    const { userData } = req.body;

    if (!userData) {
      return res.status(400).json({
        message: "Provide email or phone number",
        error: true,
      });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData);
    const isPhone = /^\d{10}$/.test(userData);

    if (!isEmail && !isPhone) {
      return res.status(400).json({
        message: "Enter valid email or 10-digit phone number",
        error: true,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const query = isEmail
      ? { email: userData.toLowerCase().trim() }
      : { mobile: userData.trim() };

    const update = {
      email_otp: otp,
      otp_expiry: otpExpiry,
    };

    const user = await UserModel.findOneAndUpdate(query, update, {
      upsert: true,
      new: true,
    });

    if (isEmail) {
      await sendEmail({
        sendTo: user.email,
        subject: "Your OTP",
        html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
      });
    }

    console.log("DB OTP:", otp);

    return res.json({
      message: "OTP sent successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
}







export async function verifyOtpController(req, res) {
  try {
    const { userData, otp } = req.body;

    if (!userData || !otp) {
      return res.status(400).json({
        message: "Email/phone & OTP required",
        error: true,
      });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData);

    const query = isEmail
      ? { email: userData.toLowerCase().trim() }
      : { mobile: userData.trim() };

    const user = await UserModel.findOne(query);

    if (!user || !user.email_otp || !user.otp_expiry) {
      return res.status(400).json({
        message: "OTP not found. Please resend OTP",
        error: true,
      });
    }

    console.log("DB OTP:", user.email_otp);
    console.log("INPUT OTP:", otp);
    console.log("EXPIRY:", user.otp_expiry);

    if (new Date() > user.otp_expiry) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
      });
    }

    if (user.email_otp !== otp.toString()) {
      return res.status(400).json({
        message: "Incorrect OTP",
        error: true,
      });
    }

    user.verify_email = isEmail;
    user.verify_phone = !isEmail;
    user.email_otp = null;
    user.otp_expiry = null;

    await user.save();

    return res.json({
      message: "OTP verified successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
}
