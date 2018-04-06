import React from 'react'

const Repo = (props) => (
   <a href={props.link} target="_blank"
   style={{
    textDecoration: 'none'
  }}
   > <div
        style={{
          border: '2px solid #e6e6e6',
          maxWidth: 960,
          padding: '0.5rem',
          marginBottom: '25px'
        }}
        >
        <strong>{props.title}.</strong> {props.description}
    </div></a>
);

export default Repo;