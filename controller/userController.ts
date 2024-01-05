import { Request, Response } from "express";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(3).toString("hex");

    const user = await userModel.create({
      email,
      token,
      status: "main",
    });

    return res.status(200).json({
      message: "creating user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const signUser = async (req: any, res: Response) => {
  try {
    const { email, token } = req.body;

    const getUser = await userModel.findOne({ email });

    if (getUser) {
      if (getUser.token === token) {
        if (getUser.verify) {
          const encrypt = jwt.sign(
            { id: getUser._id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            }
          );

          req.session.isAuth = true;
          req.session.userID = getUser._id;

          return res.status(200).json({
            message: "welcome back",
            dat: encrypt,
          });
        } else {
          return res.status(404).json({
            message: "Account has not yet been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "Error reading token",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error reading user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const verifiedUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          verify: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "verifying user",
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

export const logOutUser = async (req: any, res: Response) => {
  try {
    req.session.destroy();

    return res.status(200).json({
      message: "user has been logged out",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

// profile update

export const updateUserNames = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, middleName, lastName } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
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

export const updateUserLocation = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { location } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          location,
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

export const updateUserPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { phoneNumber } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
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

export const updateUserAvatar = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path
      );

      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          avatar: secure_url,
          avatarID: public_id,
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
