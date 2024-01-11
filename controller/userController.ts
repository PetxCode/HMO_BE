import { Request, Response } from "express";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import { changeTokenEmail, verifiedEmail } from "../utils/email";
import { streamUpload } from "../utils/streamifier";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(3).toString("hex");
    const enrollmentID = crypto.randomBytes(4).toString("hex");

    const user = await userModel.create({
      email,
      token,
      enrollmentID,
      status: "main",
    });

    verifiedEmail(user);

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
            data: encrypt,
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

export const readUserCookie = async (req: any, res: Response) => {
  try {
    const readUser = req.session.userID;

    return res.status(200).json({
      message: "user cookie read successfully",
      data: readUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const readUserDetails = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);
    console.log(user);

    if (user) {
      return res.status(200).json({
        message: "user read",
        data: user,
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

// Choosing Hospital
export const familyHospiatl = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { choice1, choice2, choice3 } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          familyHospital: [choice1, choice2, choice3],
        },
        { new: true }
      );
      return res.status(200).json({
        message: "user hospital added successfully",
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
      const { secure_url, public_id }: any = await streamUpload(req);

      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
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

// reset Token

export const requestTokenReset = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { token, email } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      if (user.token === token && user.verify) {
        const newToken = crypto.randomBytes(3).toString("hex");
        const updatedUser = await userModel.findByIdAndUpdate(
          userID,
          {
            token: newToken,
          },
          { new: true }
        );

        changeTokenEmail(updatedUser);

        return res.status(200).json({
          message: "Your request has been updated",
          data: updatedUser,
        });
      } else {
        return res.status(404).json({
          message: "Please enter correct old token",
        });
      }
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
