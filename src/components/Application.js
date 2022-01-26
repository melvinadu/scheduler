import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

const { getAppointmentsForDay, getInterview, getInterviewersForDay} = require("../helpers/selectors")

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  const interviewers = getInterviewersForDay(state, state.day);


  //mapping appointment Component into an array
  const appointmentArray = getAppointmentsForDay(state, state.day).map(appointment => {
    
    return (
    <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
