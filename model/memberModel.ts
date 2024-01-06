import { Schema, Types, model } from "mongoose";
import { iMemberData } from "../utils/interfaces";

const memberModel = new Schema<iMemberData>(
  {
    phoneNumber: {
      type: String,
    },

    mainEmail: {
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
    relationship: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    status: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
    },

    medicalHistory: [
      {
        type: Types.ObjectId,
        ref: "medicalHistories",
      },
    ],

    appointments: [
      {
        type: Types.ObjectId,
        ref: "appointments",
      },
    ],
  },
  { timestamps: true }
);

export default model<iMemberData>("members", memberModel);
