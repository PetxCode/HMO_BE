import { Document } from "mongoose";
import { HTTP } from "./enums";

export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

interface iMedical {
  doctorName: string;
  hospitalName: string;
  cost: number;
  diagnosis: string;
  member: {};
}

interface iMember {
  mainEmail: string;
  enrollmentID: string;
  phoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
  avatarID: string;
  status: string;
  relationship: string;
  user: {};
  medicalHistory: Array<{}>;
  appointments: Array<{}>;
}

interface iDoctor {
  speciality: string;
  biography: string;
  hospitalName: string;
  hospitalID: string;
  phoneNumber: string;

  fullName: string;
  email: string;
  avatar: string;
  avatarID: string;
  status: string;
  relationship: string;
  hospital: {};
  patientTreated: Array<{}>;
  appointments: Array<{}>;
}

interface iUser {
  enrollmentID: string;
  location: string;
  phoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
  avatarID: string;
  token: string;
  verify: boolean;
  status: string;
  members: Array<{}>;
  medicalHistory: Array<{}>;
  familyHospital: Array<string>;
  appointments: Array<{}>;
}

interface iHospital {
  location: string;
  email: string;
  token: string;
  hospitalName: string;
  phoneContact: string;
  doctors: Array<{}>;
  usageHistory: Array<{}>;
  appointments: Array<{}>;

  detail: string;
  avatar: string;
  avatarID: string;
  description: string;
  verify: boolean;
  specialization: string;
}

interface iAppointment {
  sponsorTies: string;
  sponsorenrollmentID: string;
  fullName: string;
  hospitalName: string;
  enrollmentID: string;

  approve: boolean;

  reason: string;
  appointmentDate: string;
  appointmentID: string;

  user: {};
  member: {};
}

export interface iAppointmentData extends iAppointment, Document {}
export interface iDoctorData extends iDoctor, Document {}
export interface iHospitalData extends iHospital, Document {}
export interface iMemberData extends iMember, Document {}
export interface iMedicalData extends iMedical, Document {}
export interface iUserData extends iUser, Document {}
