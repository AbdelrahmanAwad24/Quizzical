import React from "react";

export default function Questions(props) {
  // const [data, setData] = React.useState([]);
  // const [score, setScore] = React.useState(0);
  // function scoreCount() {}

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
          // checked={props.selectedAnswer === item.answer}
        />
        <label className={classNameSet()} htmlFor={item.answer}>
          {item.answer}
        </label>
      </div>
    );
  });
  return (
    // <Questions />

    <fieldset className="cards">
      <legend>{props.question}</legend>
      <div className="answers">{answerArr}</div>
    </fieldset>
  );
}
