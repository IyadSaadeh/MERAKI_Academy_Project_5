//====================================================//Require
const express = require("express");

//====================================================//Require doctors Controllers
const {
  createNewDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctorById,
  deleteDoctorById,
  getDoctorByName,
  getDoctorByDepartment,
  DoctorProfileImageByID,
} = require("../controllers/Doctors");

const {
  setDoctorAppointement,
  setAppointmentIsBooking,
  setIsDeletedInAppointmentAvailable,
  getAppointmentByDoctorId,
  getAvalibleAppointment,
  getDoctorAppointmentByPatientId,
} = require("../controllers/DoctorAppointment");

const { authentication } = require("../middleware/authentication");

//====================================================//Create doctor Router
const doctorRouter = express.Router();

doctorRouter.post("/", createNewDoctor);
doctorRouter.get("/", getAllDoctors);
doctorRouter.put("/update", authentication, updateDoctorById);
doctorRouter.delete("/:id", deleteDoctorById);
doctorRouter.post("/Search", getDoctorByName);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/department", getDoctorByDepartment);

// doctors Appointment
doctorRouter.post("/setappointement", setDoctorAppointement);
doctorRouter.post(
  "/booking",
  setAppointmentIsBooking,
  setIsDeletedInAppointmentAvailable
);
doctorRouter.post("/appointement", getAvalibleAppointment);
doctorRouter.post("/getappointement", getAppointmentByDoctorId);
doctorRouter.post("/getappointementpatient", getDoctorAppointmentByPatientId);
// doctors Profile Image
doctorRouter.post("/profileimage", authentication, DoctorProfileImageByID);

DoctorProfileImageByID;
module.exports = doctorRouter;
