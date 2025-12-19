import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  email_otp: String,
  otp_expiry: Date,
  verify_email: {
    type: Boolean,
    default: false,
  },
  verify_phone: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
