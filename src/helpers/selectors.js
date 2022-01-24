export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(
    stateDay => stateDay.name === day
  );

  // console.log(filteredDay); //for "Monday === day"

  // [{
  //   appointments: [1, 2, 3],
  //   id: 1,
  //   name: "Monday"
  // }]

  const appointmentArray = [];

  if (filteredDay && filteredDay.length > 0) {

    for (let appointmentNumber of filteredDay[0].appointments) {
      appointmentArray.push(state.appointments[appointmentNumber]);
    }
    
    // console.log(appointmentArray);
    // [{
    //   id: 1,
    //   interview: null,
    //   time: "12pm"
    // }, {
    //   id: 2,
    //   interview: null,
    //   time: "1pm"
    // }, {
    //   id: 3,
    //   interview: {
    //     interviewer: 2,
    //     student: "Archie Cohen"
    //   },
    //   time: "2pm"
    // }]

    return appointmentArray;

  } else {

    return appointmentArray;

  }

}

export function getInterview(state, interview) {
  //...  return a new object containing the interview data when we pass it an object that contains the interviewer
  
  if (!interview) {
    return null;
  }

  const id = interview.interviewer;
  const student = interview.student;
  const interviewer = state.interviewers[id];

  return { student, interviewer};

}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const filteredDay = state.days.filter(
    stateDay => stateDay.name === day
  );

  const interviewersArray = [];

  if (filteredDay && filteredDay.length > 0) {

    for (let appointmentNumber of filteredDay[0].interviewers) {
      interviewersArray.push(state.interviewers[appointmentNumber]);
    }

    return interviewersArray;

  } else {

    return interviewersArray;

  }

}