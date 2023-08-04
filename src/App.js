import React from "react";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import TopImage from "./images/topImage";
import BottomImage from "./images/bottomImage";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
export default function App() {
  const [data, setData] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [startGame, setStartGame] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const apiData = await response.json();
      const answerObj = apiData.results.map((item) => {
        const correctAnswer = {
          id: nanoid(),
          answer: decode(item.correct_answer),
          isCorrect: true,
          isHeld: false,
        };
        const incorrectAnswers = item.incorrect_answers.map((answer) => ({
          id: nanoid(),
          answer: decode(answer),
          isCorrect: false,
          isHeld: false,
        }));
        return {
          question: decode(item.question),
          answers: [correctAnswer, ...incorrectAnswers].sort(
            () => Math.random() - 0.5
          ),
          id: nanoid(),
        };
      });
      setData(answerObj);
    }
    getData();
  }, [newGame]);

  function scoreAnswers(item) {
    item.isHeld = !item.isHeld;
    console.log(item.isHeld);
    if (item.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    // setIsHeld(true);
  }
  const questionEle = data.map((item) => {
    return (
      <Questions
        key={item.id}
        question={item.question}
        answers={item.answers}
        // handelClick={handelClick}
        // scoreCount={scoreCount}
        scoreAnswers={scoreAnswers}
        isChecked={isChecked}
      />
    );
  });
  // function handelChange(event) {
  //   setSelectedAnswers(event.target.id);
  // }
  function handelSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    // setIsChecked(true);
    setIsChecked((prevItem) => !prevItem);
  }
  function toggler() {
    setStartGame((prevItem) => !prevItem);
  }
  function restartGame() {
    setStartGame((prevItem) => !prevItem);
    setIsChecked((prevItem) => !prevItem);
    setNewGame((prevItem) => !prevItem);
  }

  return (
    <div className="App">
      <TopImage />

      {startGame && (
        <div className="Questions">
          <form className="question--parent">
            {questionEle}
            {isChecked ? (
              <div>
                <span className="score--span">
                  You Scored {score}/5 answers 🏆
                </span>
                <button onClick={restartGame}>Play Again</button>
              </div>
            ) : (
              <button onClick={handelSubmit}>Check Answers</button>
            )}
          </form>
        </div>
      )}

      {!startGame && <Intro toggler={toggler} />}
      <BottomImage />
    </div>
  );
}
