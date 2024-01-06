import { Schema, model } from "mongoose";
import { iAppointmentData } from "../utils/interfaces";

const appointmentModel = new Schema<iAppointmentData>(
  {
    appointmentID: {
      type: String,
    },
    fullName: {
      type: String,
    },
    sponsorTies: {
      type: String,
    },

    enrollmentID: {
      type: String,
    },

    hospitalName: {
      type: String,
    },

    approve: {
      type: Boolean,
      default: false,
    },

    reason: {
      type: String,
    },

    appointmentDate: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iAppointmentData>("appointments", appointmentModel);
