import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";
import "./styleChart.css";
import axios from "axios";

// =========================================================required

export default function Chart() {
  const [appointement, setAppointement] = useState([]);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState([]);

  // ====================================================
  const state = useSelector((state) => {
    return {
      doctorId: state.doctorsReducer.doctorId,
      userId: state.loginReducer.userId,
      roleId: state.loginReducer.roleId,
    };
  });

  // =======================================================
  useEffect(async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/doctors/getappointement",
        {
          doctorId: state.userId | window.localStorage.getItem("userId"),
        }
      );
      const res2 = await axios.post("http://localhost:5000/comment/", {
        doctorId: state.userId | window.localStorage.getItem("userId"),
      });
      setComments(res2.data.result);
      setAppointement(res.data.result);
    } catch (err) {
      console.log(err.response);
    }
    console.log("state", state);
  }, []);

  // =========================================================

  let malePatient = appointement.filter((element) => {
    return element.gender == "MALE";
  });
  let femalePatient = appointement.filter((element) => {
    return element.gender == "FEMALE";
  });

  console.log("malePatient", malePatient, "femalePatient", femalePatient);
  //================================================ Chart

  var options = {
    series: [malePatient.length, femalePatient.length],
    chart: {
      height: 200,
      type: "polarArea",
    },
    labels: ["Male", "Female"],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "right",
    },
    colors: ["#3246D3", "#00D0FF"],
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#chartOne"), options);
  chart.render();
  // =====================================chart2

  let month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let malePatientMonthly = month.map((element, index) => {
    let count = 0;
    for (let i = 0; i < malePatient.length; i++) {
      if (malePatient[i]) {
        if (malePatient[i].dateAppointment.split("-")[1] == element) {
          count++;
        }
      } else {
        return 0;
      }
    }

    return count;
  });
  let femalePatientMonthly = month.map((element, index) => {
    let count = 0;
    for (let i = 0; i < femalePatient.length; i++) {
      if (femalePatient[i]) {
        if (femalePatient[i].dateAppointment.split("-")[1] == element) {
          count++;
        }
      } else {
        return 0;
      }
    }

    return count;
  });

  var options1 = {
    series: [
      {
        name: "Male Patient",
        data: malePatientMonthly,
      },
      {
        name: "Female Patient",
        data: femalePatientMonthly,
      },
    ],
    chart: {
      height: 275,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#1dbfc1", "#ee3158"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      show: false,
    },
  };

  var chart1 = new ApexCharts(document.querySelector("#chartTwo"), options1);
  chart1.render();
  // ===================================chart3

  let PatientsMonthly = month.map((element, index) => {
    let count = 0;
    for (let i = 0; i < appointement.length; i++) {
      if (appointement[i].dateAppointment.split("-")[1] == element) {
        count++;
      }
    }

    return count;
  });

  console.log("PatientsMonthly", PatientsMonthly);
  var options2 = {
    chart: {
      type: "bar",
    },
    series: [
      {
        data: [
          {
            x: "Jan",
            y: PatientsMonthly[0],
          },
          {
            x: "Feb",
            y: PatientsMonthly[1],
          },
          {
            x: "Mar",
            y: PatientsMonthly[2],
          },
          {
            x: "Apr",
            y: PatientsMonthly[3],
          },
          {
            x: "May",
            y: PatientsMonthly[4],
          },
          {
            x: "Jun",
            y: PatientsMonthly[5],
          },
          {
            x: "Jul",
            y: PatientsMonthly[6],
          },
          {
            x: "Aug",
            y: PatientsMonthly[7],
          },
          {
            x: "Sep",
            y: PatientsMonthly[8],
          },
          {
            x: "Oct",
            y: PatientsMonthly[9],
          },
          {
            x: "Nov",
            y: PatientsMonthly[10],
          },
          {
            x: "Dec",
            y: PatientsMonthly[11],
          },
        ],
      },
    ],
  };

  var chart2 = new ApexCharts(document.querySelector(".chart3x"), options2);
  chart2.render();

  // ==================================================== chart4

  let ratingConst = [0, 1, 2, 3, 4, 5];

  let ratingGroup = ratingConst.map((element) => {
    let group = 0;
    comments.forEach((element1) => {
      if (element1.rating == element) {
        group++;
      }
    });
    return group;
  });
  console.log("ratingGroup", ratingGroup);

  // =========================================================
  var options = {
    series: [
      {
        data: ratingGroup.reverse(),
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [
        " ⭐⭐⭐⭐⭐",
        " ⭐⭐⭐⭐✰ ",
        "⭐⭐⭐ ✰ ✰ ",
        " ⭐⭐ ✰ ✰ ✰ ",
        "⭐ ✰ ✰ ✰ ✰ ",
        " ✰ ✰ ✰ ✰ ✰ ",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: "Custom DataLabels",
      align: "center",
      floating: true,
    },
    subtitle: {
      text: "Category Names as DataLabels inside bars",
      align: "center",
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#chartFour"), options);
  chart.render();
  // =====================================================
  return (
    <div>
      <div className="dashBoardChart">
        <div className="chart" id="chartOne"></div>
        <div className="chart" id="chartTwo"></div>
      </div>
      <div className="dashBoardChart">
        <div className="chart3x"></div>
        <div className="chart" id="chartFour"></div>
      </div>
    </div>
  );
}
