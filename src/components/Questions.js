import React from "react";

export default function Questions(props) {
  const answerArr = props.answers.map((item) => {
    function classNameSet() {
      if (props.isChecked && item.isHeld) {
        if (item.isCorrect) {
          return "correct";
        } else {
          return "incorrect";
        }
      } else if (props.isChecked && !item.isHeld) {
        if (item.isCorrect) {
          return "correct";
        } else {
          return "trans";
        }
      }
    }
    return (
      <div className="answer" key={item.id}>
        <input
          required
          type="radio"
          id={item.answer}
          value={item.answer}
          name={props.question}
          onClick={() => props.scoreAnswers(item)}
        />
        <label className={classNameSet()} htmlFor={item.answer}>
          {item.answer}
        </label>
      </div>
    );
  });
  return (
    <fieldset className="cards">
      <legend>{props.question}</legend>
      <div className="answers">{answerArr}</div>
    </fieldset>
  );
}
