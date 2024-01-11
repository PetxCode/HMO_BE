import { Request, Response } from "express";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import { changeTokenEmail, hospitalVerifiedEmail } from "../utils/email";
import { streamUpload } from "../utils/streamifier";
import dotenv from "dotenv";
import hospitalModel from "../model/hospitalModel";
dotenv.config();

export const createHospital = async (req: Request, res: Response) => {
  try {
    const { email, hospitalName } = req.body;
    const token = crypto.randomBytes(3).toString("hex");
    const enrollmentID = crypto.randomBytes(4).toString("hex");

    const user = await hospitalModel.create({
      email,
      hospitalName,
      token,
      enrollmentID,
      status: "hospital",
    });

    hospitalVerifiedEmail(user);

    return res.status(200).json({
      message: "creating hospital",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const HospitalDetail = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;

    const hospital = await hospitalModel.findById(hospitalID);

    return res.status(200).json({
      message: "hospital detail",
      data: hospital,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const signHospital = async (req: any, res: Response) => {
  try {
    const { email, token } = req.body;

    const getHospital = await hospitalModel.findOne({ email });

    if (getHospital) {
      if (getHospital.token === token) {
        if (getHospital?.verify) {
          const encrypt = jwt.sign(
            { id: getHospital._id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            }
          );

          req.session.isAuth = true;
          req.session.hospitalID = getHospital._id;

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

export const viewAllHospital = async (req: Request, res: Response) => {
  try {
    const hospital = await hospitalModel.find();
    return res.status(200).json({
      message: "view all hospital",
      data: hospital,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const verifiedHospital = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedhospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          verify: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "verifying hospital",
        data: updatedhospital,
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

export const logOutHospital = async (req: any, res: Response) => {
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

export const updateHospitalName = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;
    const { hospitalName } = req.body;

    const user = await hospitalModel.findById(hospitalID);

    if (user) {
      const updatedUser = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          hospitalName,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital names added",
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

export const HospitalUpdateLocation = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;
    const { location } = req.body;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          location,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital location added",
        data: updatedHospital,
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

export const HospitalUpdateDescription = async (
  req: Request,
  res: Response
) => {
  try {
    const { hospitalID } = req.params;
    const { description } = req.body;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          description,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital location added",
        data: updatedHospital,
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

export const HospitalUpdateDetail = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;
    const { detail } = req.body;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          detail,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital location added",
        data: updatedHospital,
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

export const updateHospitalSpecialization = async (
  req: Request,
  res: Response
) => {
  try {
    const { hospitalID } = req.params;
    const { specialization } = req.body;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          specialization,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital phone number added",
        data: updatedHospital,
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

export const updateHospitalPhoneNumber = async (
  req: Request,
  res: Response
) => {
  try {
    const { hospitalID } = req.params;
    const { phoneContact } = req.body;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          phoneContact,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital phone number added",
        data: updatedHospital,
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

export const updateHospitalAvatar = async (req: any, res: Response) => {
  try {
    const { hospitalID } = req.params;

    const hospital = await hospitalModel.findById(hospitalID);

    if (hospital) {
      const { secure_url, public_id }: any = await streamUpload(req);

      const updatedHospital = await hospitalModel.findByIdAndUpdate(
        hospitalID,
        {
          avatar: secure_url,
          avatarID: public_id,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "hospital avatar has been, added",
        data: updatedHospital,
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
