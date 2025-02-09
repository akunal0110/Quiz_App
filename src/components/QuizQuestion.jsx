import React, { useState } from "react";

function QuizQuestion({ question, onAnswerSelection, currentQuestionIndex, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  console.log("🔥 DEBUG - Full Question Data:", question);


  if (!question || !question.description) {
    return <p className="loading-text">Loading question... Please wait.</p>;
  }


  const answers = question.options || question.choices || question.answers || [];

  
  const updatedAnswers = answers.map((option, index) => ({
    text: option.text || option.description || `Option ${index + 1}`, 
    isCorrect: option.is_correct !== undefined ? option.is_correct : index === 1, 
  }));

  const handleAnswerClick = (isCorrect, index) => {
    if (isAnswered) return; 

    setSelectedAnswer(index);
    setIsAnswered(true);

    setTimeout(() => {
      onAnswerSelection(isCorrect);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  return (
    <div className="quiz-question">
      <h2>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>

      
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <p className="question-text">{question.description}</p>

      <div className="answers">
        {updatedAnswers.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${
              selectedAnswer === index
                ? option.isCorrect
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleAnswerClick(option.isCorrect, index)}
            disabled={isAnswered} 
          >
            {option.text} {}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;
