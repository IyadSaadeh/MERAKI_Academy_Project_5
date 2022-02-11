//====================================================//Require

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DoctorProfile.css";
import {
  FaRegMoneyBillAlt,
  FaHandHoldingMedical,
  FaPhoneAlt,
} from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { AiFillFlag } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BsClockHistory, BsCalendarDay } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { HiOutlineIdentification } from "react-icons/hi";
import CommentsAndRate from "../CommentsAndRate/CommentsAndRate";
import GetCommentRate from "../CommentsAndRate/GetCommentRate";
const DoctorProfile = () => {
  const [doctor, setDoctor] = useState("");
  const [appointement, setAppointement] = useState([]);
  const [resultBooking, setResultBooking] = useState("");
  const [today, setToday] = useState("");
  const [date, setDate] = useState("");

  const state = useSelector((state) => {
    return {
      doctorId: state.doctorsReducer,
      userId: state.loginReducer.userId[0],
      userIdDoctor: state.loginReducer.userId,
      roleId: state.loginReducer.roleId,
    };
  });
  // ========================================

  useEffect(async () => {
    setToday(() => {
      return new Date().toISOString().substring(0, 10);
    });
    console.log(state.userId, state.roleId, state.userIdDoctor);
    console.log("state.doctorId", state.doctorId, state.doctorId.doctorId);
    try {
      const res = await axios.get(
        `http://localhost:5000/doctors/${window.localStorage.getItem(
          "doctorId"
        )}`
      );
      console.log("Doctor id", state.doctorId, res);
      setDoctor(res.data.result[0]);
      console.log("dd", res.data.result[0]);
      // ===================================================appointement
      console.log(today);
      const res2 = await axios.post(
        `http://localhost:5000/doctors/appointement`,
        {
          doctorId: state.doctorId,
          dateAppointment: date || new Date().toISOString().substring(0, 10),
        }
      );

      console.log(res2.data.result);
      setAppointement(res2.data.result);
    } catch (err) {
      console.log(err);
    }
  }, [resultBooking, date]);

  // ================================================== booking

  const booking = async (e) => {
    if (state.roleId == 2) {
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/doctors/booking`, {
        appointmentId: e.target.value,
        patientId: state.userId.id,
        doctorId: state.doctorId,
        dateAppointment: date || today,
      });

      console.log(res);
      setResultBooking(res);
    } catch (err) {
      console.log(err);
    }
  };
  // ===================================== set date appointement

  const setDateAppointement = (e) => {
    setDate(e.target.value.toString());
    // console.log(e.target.value.toString());
  };

  // ====================================

  return (
    <>
      <div className="profile">
        <div className="pictureAndTitle">
          <img src={doctor.profileImage} alt={doctor.fullName} />
          <h3>Dr.{doctor.fullName}</h3>
        </div>
        <div className="profileInformation">
          <h5>
            Department : <span>{doctor.Department}</span>
          </h5>
          <div className="profile-row">
            <FaHandHoldingMedical />
            <h5>
              specialization : <span>{doctor.specialization}</span>
            </h5>
          </div>
          <div className="profile-row">
            <GrCertificate />
            <h5>
              Scientific Certificate :
              <span>{doctor.ScientificCertificate}</span>{" "}
            </h5>
          </div>
          <div className="profile-row">
            <AiFillFlag />
            <h5>
              Nationality :<span>{doctor.Nationality}</span>
            </h5>
          </div>
          <div className="profile-row">
            <MdAlternateEmail />
            <h5>
              Email :<span>{doctor.email}</span>
            </h5>
          </div>
          <div className="profile-row">
            <FaPhoneAlt />
            <h5>
              {" "}
              Phone : <span>{doctor.phone}</span>
            </h5>
          </div>
          <div className="profile-row">
            <HiOutlineIdentification />
            <h5>
              careers License :<span>{doctor.careersLicense}</span>{" "}
            </h5>
          </div>
          <div className="profile-row">
            <ImLocation />
            <h5>
              Address:
              <span>
                {doctor.city},{doctor.address}
              </span>
            </h5>
          </div>
          <div className="profile-row">
            <BsClockHistory />
            <h5>
              {" "}
              waiting Time : <span>{doctor.waitingTime}</span>{" "}
            </h5>
          </div>
          <div className="profile-row">
            <BsCalendarDay />
            <h5>
              Days :<span>{doctor.workingDays}</span>{" "}
            </h5>
          </div>
          <div className="profile-row">
            <FaRegMoneyBillAlt />
            <h5>
              Consultation Fee : <span>{doctor.consultationFee}</span>{" "}
            </h5>
          </div>
        </div>
        <div className="appointement">
          <input
            type="date"
            onChange={setDateAppointement}
            defaultValue={new Date().toISOString().substring(0, 10)}
          />

          {appointement.map((element) => {
            return (
              <>
                <button onClick={booking} value={element.id}>
                  {element.time}
                </button>
              </>
            );
          })}
        </div>
      </div>
      <CommentsAndRate />
    </>
  );
};
export default DoctorProfile;
