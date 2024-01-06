import { Schema, Types, model } from "mongoose";
import { iDoctorData } from "../utils/interfaces";

const doctorModel = new Schema<iDoctorData>(
  {
    phoneNumber: {
      type: String,
    },

    fullName: {
      type: String,
    },
    hospitalName: {
      type: String,
    },

    speciality: {
      type: String,
    },

    hospitalID: {
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
    hospital: {
      type: Types.ObjectId,
      ref: "hospitals",
    },

    patientTreated: [
      {
        type: Types.ObjectId,
        ref: "patientTreateds",
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

export default model<iDoctorData>("doctors", doctorModel);
