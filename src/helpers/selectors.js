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
