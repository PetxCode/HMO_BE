import { Request, Response } from "express";
import userModel from "../model/userModel";
import { Types } from "mongoose";
import paymentsModel from "../model/paymentsModel";
import crypto from "crypto";
import moment from "moment";

export const creatUserPayment = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID);
    let defaultCost: number = 2000;
    let mainCost: number = user.members.length + 1;
    let myPlan: string;

    if (user.members.length === 1) {
      myPlan = "You Plan";
    } else if (user.members.length > 1) {
      myPlan = "Family Plan";
    }

    if (user) {
      const paymentReferenceID = crypto.randomBytes(5).toString("hex");

      const dateStart = new Date();
      const started = dateStart.getTime();
      const dateEnded = dateStart.setFullYear(dateStart.getFullYear() + 1);

      const millisecondsInSecond = 1000;
      const secondsInMinute = 60;
      const minutesInHour = 60;
      const hoursInDay = 24;
      const daysInYear = 365;

      const millisecondsInYear =
        millisecondsInSecond *
        secondsInMinute *
        minutesInHour *
        hoursInDay *
        daysInYear;

      const sixHour =
        millisecondsInSecond * secondsInMinute * minutesInHour * 6;

      const payment: any = await paymentsModel.create({
        startDate: moment(started).format("LLLL"),
        endDate: moment(dateEnded).format("LLLL"),
        paymentReferenceID,
        userID,
        cost: defaultCost * mainCost * 12,
        subscriptionPlan: myPlan!,
      });

      user.payments.push(new Types.ObjectId(payment._id));
      user!.save();

      await userModel.findByIdAndUpdate(
        userID,
        { plan: "active" },
        { new: true }
      );

      const timer = setTimeout(async () => {
        await userModel.findByIdAndUpdate(
          userID,
          { plan: "expires" },
          { new: true }
        );

        clearTimeout(timer);
      }, sixHour);

      return res.status(200).json({
        message: "payment made",
        data: payment,
      });
    } else {
      return res.status(404).json({
        message: "Error finding user",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error establishing user's payment",
      data: error.message,
    });
  }
};

export const viewUserPayment = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const getUser = await userModel.findById(userID).populate({
      path: "payments",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "reading user payment history",
      data: getUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user's payment history",
      data: error,
    });
  }
};
