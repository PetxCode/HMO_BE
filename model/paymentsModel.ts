import { Schema, Types, model } from "mongoose";
import { iPaymentData } from "../utils/interfaces";

const paymentModel = new Schema<iPaymentData>(
  {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    paymentReferenceID: {
      type: String,
    },
    cost: {
      type: Number,
    },
    subscriptionPlan: {
      type: String,
    },
    userID: {
      type: String,
    },

    user: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model<iPaymentData>("payments", paymentModel);
