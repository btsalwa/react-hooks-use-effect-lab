import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // Decrease timeRemaining every second (1000ms)

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [timeRemaining]); // Run the effect whenever timeRemaining changes

  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false); // Call onAnswered with false if time runs out
    }
  }, [timeRemaining, onAnswered]); // Run the effect whenever timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
