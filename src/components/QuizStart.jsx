import React from "react";
import "./QuizStart.css"; 
const QuizStart = ({ startQuiz }) => {
  return (
    <div className="quiz-start-container">
      <h1>Welcome to the Quiz</h1>
      <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;
