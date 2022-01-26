import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  //state management day variable
  const setDay = (day) => setState({ ...state, day });

  //state management days variable
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log(">>>>>>>:", res)
        setState({
          ...state,
          appointments
        });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log(">>>>>>>:", res)
        setState({
          ...state,
          appointments
        });
      })
  }

  //axios GET requests to API to get data from server
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

  // console.log("<<<<<<<:", state);

  return { state, setDay, bookInterview, cancelInterview };
}
