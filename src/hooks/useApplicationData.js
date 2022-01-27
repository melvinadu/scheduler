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

  // const appointment = appointments[id];
  // const getSpotsForDay = function (day, appointment){
  //   let spots = 0;
  //   for(const id of dayObj.appointments){
  //     if(!appointment.interview){
  //       spots++;
  //     }
  //   }
  //   return spots;
  // }

  //get the day object
  const dayObj = state.days.find(day => day.name === state.day)

  const getSpotsForDay = function (state){
    let spots = 0;
    //iterate the days appt id
    for(const id of dayObj.appointments){
      const appObj = state.appointments[id];
      if(!appObj.interview){
        spots++;
      }
    }
    return spots;
  }

  function updateSpots(state, id) {

    const spots = getSpotsForDay(state);
    const newDay = {...dayObj, spots}
  
    const newDays = state.days.map(day => {
      if(day.id === newDay.id) {
        return newDay;
      }else {
        return day;
      }
    })

    return newDays;

  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDay = updateSpots({ ...state, appointments }, id);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updatedDay
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

    const updatedDay = updateSpots({ ...state, appointments }, id);

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log(">>>>>>>:", res)
        setState({
          ...state,
          appointments, 
          days: updatedDay
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
