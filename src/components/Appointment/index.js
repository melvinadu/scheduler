import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  // bring mode, transition and back properties of useVisualMode into component
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY //pass initial value and set initial state of mode variable in useVisualMode custom hook based on whether props.interview variable is true or false
  );
  
  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };

    //show saving status before booking interview and showing confirmation
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
   
  }

  

  return (
    <article className="appointment">
        <Header time={props.time}/>

        { mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} // if button on Empty component is clicked, transition to condition where mode === CREATE
        /> }

        {mode === SAVING &&
        <Status 
          message="Saving..."
        />}

        { mode === SHOW && 
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
        /> }

        { mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()} //if cancel button on Form component is clicked, call back function which transitions back to condition where mode === EMPTY
          onSave={save}
        /> }
        
    </article>

  );
}




