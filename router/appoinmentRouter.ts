import { Router } from "express";
import {
  creatAppointment,
  hospitalAppointmentApproved,
  viewHospitalAppointment,
  viewMembersAppointment,
  viewUserAppointment,
} from "../controller/appointmentController";

const router: Router = Router();

router.route("/create-appointment/:memberID").post(creatAppointment);

router.route("/view-member-appointment/:memberID").get(viewMembersAppointment);
router.route("/view-user-appointment/:userID").get(viewUserAppointment);
router
  .route("/view-hospital-appointment/:hospitalID")
  .get(viewHospitalAppointment);

router
  .route("/appointment-approved/:hospitalID/:appointmentID ")
  .patch(hospitalAppointmentApproved);

export default router;
