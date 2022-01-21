export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(
    stateDay => stateDay.name === day
  );

  const appointmentArray = [];

  if (filteredDay && filteredDay.length > 0) {

    for (let appointmentNumber of filteredDay[0].appointments) {
      appointmentArray.push(state.appointments[appointmentNumber]);
    }

    return appointmentArray;

  } else {

    return appointmentArray;

  }

}
