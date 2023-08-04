import React from "react";

export default function Intro(props) {
  return (
    <div className="Intro">
      <h2>Quizzical</h2>
      <p> Public Quiz APP</p>
      <button onClick={props.toggler}>Start Quiz</button>
    </div>
  );
}
