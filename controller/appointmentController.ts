import { Request, Response } from "express";
import crypto from "crypto";
import appointmentModel from "../model/appointmentModel";
import memberModel from "../model/memberModel";
import hospitalModel from "../model/hospitalModel";
import { Types } from "mongoose";
import userModel from "../model/userModel";

export const creatAppointment = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;
    const { hospitalName, reason, appointmentDate } = req.body;

    const member: any = await memberModel.findById(memberID);
    const hospital: any = await hospitalModel.findOne({ hospitalName });
    const sponsor: any = await userModel.findOne({ email: member.mainEmail });

    if (member && sponsor && sponsor.email === member.mainEmail) {
      if (hospital) {
        const appointmentID = crypto.randomBytes(2).toString("hex");

        const user = await appointmentModel.create({
          appointmentID,
          sponsorTies: member.mainEmail,
          sponsorenrollmentID: sponsor?.enrollmentID,
          fullName:
            member.firstName + " " + member.middleName + " " + member.lastName,
          enrollmentID: member.enrollmentID,
          hospitalName,
          reason,
          appointmentDate,
        });

        hospital.appointments.push(new Types.ObjectId(user._id));
        hospital!.save();

        hospital.appointments.push(new Types.ObjectId(user._id));
        hospital!.save();

        member.appointments.push(new Types.ObjectId(user._id));
        member!.save();

        return res.status(200).json({
          message: "creating appointment",
          data: user,
        });
      } else {
        return res.status(404).json({
          message: "Error finding hospital",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error finding member",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const viewMembersAppointment = async (req: Request, res: Response) => {
  try {
    const { memberID } = req.params;

    const getMember = await memberModel.findById(memberID).populate({
      path: "appointments",
    });

    return res.status(200).json({
      message: "reading member",
      data: getMember,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const viewUserAppointment = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const getUser = await userModel.findById(userID).populate({
      path: "appointments",
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

export const viewHospitalAppointment = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;

    const getHospital = await hospitalModel.findById(hospitalID).populate({
      path: "appointments",
    });

    return res.status(200).json({
      message: "reading hospital",
      data: getHospital,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const hospitalAppointmentApproved = async (
  req: Request,
  res: Response
) => {
  try {
    const { hospitalID, appointmentID } = req.params;
    const { doctorName } = req.body;

    const getHospital = await hospitalModel.findById(hospitalID);
    const getAppointment = await appointmentModel.findById(appointmentID);
    const getDoctor = await hospitalModel
      .findOne({ hospitalName: getHospital?.hospitalName })
      .populate({
        path: "doctors",
      });

    if (getAppointment && getHospital) {
      let doctor = getDoctor?.doctors.some((el: any) => {
        return el.fullName === doctorName;
      });

      if (doctor) {
        const appointment = await appointmentModel.findByIdAndUpdate(
          appointmentID,
          { approve: true },
          { new: true }
        );

        return res.status(200).json({
          message: "updating hospital appointment successfully",
          data: appointment,
        });
      } else {
        return res.status(404).json({
          message: "Doctor couldn't be found",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error approving appointment",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};
