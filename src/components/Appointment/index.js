import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .catch((error) => {
        transition(ERROR_SAVE, true);
      })
  }

  function destroy(){
    //show deleting status before cancelling interview and showing confirmation
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  function confirm(){
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
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

        {mode === DELETING &&
        <Status 
          message="Deleting..."
        />}

        {mode === ERROR_DELETE &&
        <Error 
          message="Could not cancel the appointment."
          onClose={() => back()}
        />}

        {mode === ERROR_SAVE &&
        <Error 
          message="Could not save the appointment."
          onClose={() => back()}
        />}

        {mode === EDIT && 
          <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          
          interviewers={props.interviewers}
          onCancel={() => back()} //if cancel button on Form component is clicked, call back function which transitions back to condition where mode === EMPTY
          onSave={save}
        />
        }

        { mode === SHOW && 
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onDelete={confirm}
          onEdit={edit}
        /> }

        {mode === CONFIRM &&
        <Confirm 
          onCancel={() => back()}
          onConfirm={destroy}
          message="Are you sure you want to delete this appointment?"
        />}

        { mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()} //if cancel button on Form component is clicked, call back function which transitions back to condition where mode === EMPTY
          onSave={save}
        /> }
        
    </article>

  );
}




