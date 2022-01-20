import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



export default function Appointment(props){
  return (
    <article className="appointment">
        <Header time={props.time}>
        </Header>

        {props.interview ? <Show student={props.interview.student} name={props.interview.interviewer.name} /> : <Empty/>}
      
    
    </article>

  );
}




