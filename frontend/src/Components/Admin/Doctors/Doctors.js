import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";
import { useSelector } from "react-redux";
import { FcCancel } from "react-icons/fc";
export default function Doctors() {
    const [AllDoctors,setAllDoctors]=useState([]);
const [message, setMessage]= useState("");

  const getAllDoctors =async()=>{
   try {
    const res = await axios.get('http://localhost:5000/doctors/all')
    if (res.data.success) {
      setAllDoctors(res.data.results);
    }
    else{
  setMessage(res.data.message);
    }
   } catch (error) {
     setMessage(error.message);
   }
  };
  const deleteDoctors = async(e)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/doctors/${e.target.id}`)
      if (res.data.success) {
        setMessage(res.data.message);

      }
      else{
    setMessage(res.data.message);
      }
     } catch (error) {
        
       setMessage(error.message);
     }
  };
  console.log(AllDoctors);
  useEffect(()=>{
    getAllDoctors();
  },[]);
  return (
    <div>
      <div className="parentTableDoctors">
      
      <table className="tableDoctors">
        <thead>
          <tr className="trHeadDoctors">
            <th className="thNODoctors">No.</th>
            <th className="thDoctors">Full Name</th>
            <th className="thDoctors">Email</th>
            <th className="thDoctors">Gender</th>
            <th className="thDoctors">Phone</th>
            <th className="thDoctors">Department</th>
            <th className="thDoctors">City</th>
            <th className="thDoctors">Actions</th>
          </tr>
        </thead>
       
        <tbody>
          {AllDoctors.map((element, index) => {
            return (
              <tr className="trBodyDoctors">
                <td className="tdNoDoctors">{index + 1}</td>

                <td className="tdDoctors">{element.fullName}</td>
                <td className="tdDoctors">{element.email}</td>
                <td className="tdDoctors">{element.gender}</td>
                <td className="tdDoctors">{element.phone}</td>
                <td className="tdDoctors">{element.Department}</td>
                <td className="tdDoctors">{element.city}</td>
                

                <td>
                  <button
                    className="deleteButtons"
                    id={element.id}
                    onClick={deleteDoctors}
                  >
                    <FcCancel className="delete" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      

    </div>
    </div>
  )
}
