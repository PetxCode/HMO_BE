import { Document } from "mongoose";

interface iMedical {
  doctorName: string;
  hospitalName: string;
  cost: number;
  diagnosis: string;
  member: {};
}

interface iMember {
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
}

interface iUser {
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
}

export interface iMemberData extends iMember, Document {}
export interface iMedicalData extends iMedical, Document {}
export interface iUserData extends iUser, Document {}
