import { Schema, Types, model } from "mongoose";
import { iHospitalData, iMedicalData } from "../utils/interfaces";

interface iHospital {
  location: string;
  hospitalName: string;
  phoneContact: string;
  doctors: Array<{}>;
  usageHistory: Array<{}>;
  detail: string;
  specialization: string;
}

const hospitalModel = new Schema<iHospitalData>(
  {
    location: {
      type: String,
    },
    token: {
      type: String,
    },

    hospitalName: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    verify: {
      type: Boolean,
      unique: false,
    },

    phoneContact: {
      type: String,
    },

    detail: {
      type: String,
    },

    description: {
      type: String,
    },

    specialization: {
      type: String,
    },

    avatar: {
      type: String,
    },

    avatarID: {
      type: String,
    },

    doctors: [
      {
        type: Types.ObjectId,
        ref: "doctors",
      },
    ],

    appointments: [
      {
        type: Types.ObjectId,
        ref: "appointments",
      },
    ],

    usageHistory: [
      {
        type: Types.ObjectId,
        ref: "doctors",
      },
    ],
  },
  { timestamps: true }
);

export default model<iHospitalData>("hospital", hospitalModel);
