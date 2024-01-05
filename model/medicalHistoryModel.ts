import { Schema, Types, model } from "mongoose";
import { iMedicalData } from "../utils/interfaces";

const medicalHistoryModel = new Schema<iMedicalData>(
  {
    doctorName: {
      type: String,
    },
    hospitalName: {
      type: String,
    },
    cost: {
      type: Number,
    },
    diagnosis: {
      type: String,
    },

    member: {
      type: Types.ObjectId,
      ref: "members",
    },
  },
  { timestamps: true }
);

export default model<iMedicalData>("medicalHistories", medicalHistoryModel);
