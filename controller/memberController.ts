import { Request, Response } from "express";
import userModel from "../model/userModel";
import memberModel from "../model/memberModel";
import { Types } from "mongoose";
import { relationshipValues } from "../utils/enums";
import { addMemberEmail } from "../utils/email";
import { streamUpload } from "../utils/streamifier";
import crypto from "crypto";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, relationship } = req.body;

    const getUser = await userModel.findById(userID);

    if (getUser) {
      if (
        relationship.toLowerCase() === relationshipValues.WIFE ||
        relationship.toLowerCase() === relationshipValues.CHILD ||
        relationship.toLowerCase() === relationshipValues.HUSBAND
      ) {
        const enrollmentID = crypto.randomBytes(4).toString("hex");
        const user = await memberModel.create({
          mainEmail: getUser.email,
          firstName,
          enrollmentID,
          lastName: getUser?.lastName,
          status: "member",
          relationship: relationship.toLowerCase(),
        });

        getUser.members.push(new Types.ObjectId(user._id));
        getUser.save();

        addMemberEmail(user, getUser).then(() => {
          console.log("sent");
        });

        return res.status(200).json({
          message: "creating user",
          data: user,
        });
      } else {
        return res.status(404).json({
          message:
            "Relationship Error: Relationship must either be Husband, Wife or Child",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error reading user",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error adding member",
      data: error.message,
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

export const viewMyMemberDetail = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;

    const getUser = await memberModel.findById(memberID);

    return res.status(200).json({
      message: "reading member",
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

export const updateMemberPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { phoneNumber } = req.body;

    const user = await memberModel.findById(memberID);

    if (user) {
      const updatedUser = await memberModel.findByIdAndUpdate(
        memberID,
        {
          phoneNumber,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "user phone number added",
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

// profile avatar

export const updateMemberAvatar = async (req: any, res: Response) => {
  try {
    const { memberID } = req.params;

    const user = await userModel.findById(memberID);

    if (user) {
      const { secure_url, public_id }: any = await streamUpload(req);

      const updatedUser = await userModel.findByIdAndUpdate(
        memberID,
        {
          avatar: secure_url,
          avatarID: public_id,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "user avatar has been, added",
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
