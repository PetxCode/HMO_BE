import { Request, Response } from "express";
import userModel from "../model/userModel";
import memberModel from "../model/memberModel";
import { Types } from "mongoose";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, relationship } = req.body;

    const getUser = await userModel.findById(userID);

    if (getUser) {
      const user = await memberModel.create({
        firstName,
        status: "member",
        relationship,
      });

      getUser.members.push(new Types.ObjectId(user._id));
      getUser.save();

      return res.status(200).json({
        message: "creating user",
        data: user,
      });
    } else {
      return res.status(404).json({
        message: "Error creating user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const viewMyMembers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const getUser = await userModel.findById(userID).populate({
      path: "members",
    });

    return res.status(200).json({
      message: "reading user",
      data: getUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const loginMembers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, token } = req.body;

    const getUser: any = await userModel.findById(userID).populate({
      path: "members",
    });

    let getMember = getUser?.members.some(
      (el: any) => el.firstName === firstName
    );

    if (getMember && getUser.token === token) {
      return res.status(200).json({
        message: "welcoming member in",
        data: getUser,
      });
    } else {
      return res.status(404).json({
        message: "You can't be allowed in",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const updateMemberNames = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { firstName, middleName, lastName } = req.body;

    const user = await memberModel.findById(memberID);

    if (user) {
      const updatedUser = await memberModel.findByIdAndUpdate(
        memberID,
        {
          firstName,
          middleName,
          lastName,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "user names added",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};