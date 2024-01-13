import { Router } from "express";
import {
  creatAppointment,
  creatAppointmentByUser,
  hospitalAppointmentApproved,
  viewHospitalAppointment,
  viewMembersAppointment,
  viewUserAppointment,
} from "../controller/appointmentController";

const router: Router = Router();

router.route("/create-appointment/:memberID").post(creatAppointment);
router.route("/create-appointment-user/:userID").post(creatAppointmentByUser);

router.route("/view-member-appointment/:memberID").get(viewMembersAppointment);
router.route("/view-user-appointment/:userID").get(viewUserAppointment);
router
  .route("/view-hospital-appointment/:hospitalID")
  .get(viewHospitalAppointment);

router
  .route("/appointment-approved/:hospitalID/:appointmentID ")
  .patch(hospitalAppointmentApproved);

export default router;
