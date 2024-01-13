import { Schema, Types, model } from "mongoose";
import { iUserData } from "../utils/interfaces";

const userModel = new Schema<iUserData>(
  {
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },

    plan: {
      type: String,
      default: "in-active",
    },

    familyHospital: [
      {
        type: String,
      },
    ],

    payments: [
      {
        type: Types.ObjectId,
        ref: "payments",
      },
    ],

    members: [
      {
        type: Types.ObjectId,
        ref: "members",
      },
    ],
    appointments: [
      {
        type: Types.ObjectId,
        ref: "appointments",
      },
    ],
    medicalHistory: [
      {
        type: Types.ObjectId,
        ref: "medicalHistories",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
