import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";

const { getAppointmentsForDay, getInterview, getInterviewersForDay} = require("../helpers/selectors")

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  //state management day variable
  const setDay = (day) => setState({ ...state, day });

  //state management days variable
  const setDays = (days) => setState(prev => ({ ...prev, days }));

  //axios GET request to API with server with data
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      // console.log(days.data);
      // console.log(appointments.data);
      // console.log(interviewers.data);

      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));

    })

  },[])

  //state management appointments variable
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);

  //mapping appointment Component into an array
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
    <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />

    // <Appointment key={appointment.id} {...appointment} />

    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
