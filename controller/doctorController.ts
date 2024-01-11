import { Request, Response } from "express";
import { Types } from "mongoose";
import { streamUpload } from "../utils/streamifier";
import doctorModel from "../model/doctorModel";
import hospitalModel from "../model/hospitalModel";

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;
    const { fullName } = req.body;

    const getHospital: any = await hospitalModel.findById(hospitalID);

    if (getHospital) {
      const doctor = await doctorModel.create({
        hospitalID,
        fullName,
        status: "doctor",
        relationship: "staff",
        hospitalName: getHospital?.hospitalName!,
      });

      getHospital.doctors.push(new Types.ObjectId(doctor._id));
      getHospital.save();

      return res.status(200).json({
        message: "creating doctor",
        data: doctor,
      });
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

export const viewMyDoctor = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;

    const gethospital = await hospitalModel.findById(hospitalID).populate({
      path: "doctors",
    });

    return res.status(200).json({
      message: "reading hospital",
      data: gethospital,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
      data: error,
    });
  }
};

export const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { hospitalID } = req.params;
    const { firstName, lastName, token } = req.body;

    const getHospital: any = await hospitalModel.findById(hospitalID).populate({
      path: "doctors",
    });

    let getDoctorFirstName = getHospital?.doctors.some(
      (el: any) => el.firstName === firstName
    );

    let getDoctorLastName = getHospital?.doctors.some(
      (el: any) => el.lastName === lastName
    );

    if (
      getDoctorFirstName &&
      getDoctorLastName &&
      getHospital.token === token
    ) {
      return res.status(200).json({
        message: "welcoming doctor in",
        data: getHospital,
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

export const updateDoctorNames = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { fullName } = req.body;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          fullName,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor names added",
        data: updatedDoctor,
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

export const updateDoctorEmail = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { email } = req.body;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          email,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor names added",
        data: updatedDoctor,
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

export const updateDoctorBiography = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { biography } = req.body;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          biography,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor names added",
        data: updatedDoctor,
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

export const updateDoctorSpeciality = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { speciality } = req.body;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          speciality,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor names added",
        data: updatedDoctor,
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

export const updateDoctorPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { phoneNumber } = req.body;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          phoneNumber,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor phone number added",
        data: updatedDoctor,
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

export const viewMyDoctorDetail = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;

    const getDoctor = await doctorModel.findById(doctorID);

    return res.status(200).json({
      message: "reading doctor",
      data: getDoctor,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error viwing Doctor",
      data: error,
    });
  }
};

// profile avatar

export const updateDoctorAvatar = async (req: any, res: Response) => {
  try {
    const { doctorID } = req.params;

    const doctor = await doctorModel.findById(doctorID);

    if (doctor) {
      const { secure_url, public_id }: any = await streamUpload(req);

      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctorID,
        {
          avatar: secure_url,
          avatarID: public_id,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "doctor avatar has been, added",
        data: updatedDoctor,
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
