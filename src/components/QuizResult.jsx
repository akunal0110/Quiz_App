import React from 'react';

function QuizResult({ score, totalQuestions, resetQuiz }) {
  const percentage = ((score / totalQuestions) * 100).toFixed(2); 

  return (
    <div className="quiz-result">
      <h2>🎉 Quiz Completed!</h2>
      <p>Your score: <strong>{score}</strong> / {totalQuestions}</p>
      <p>🎯 Accuracy: <strong>{percentage}%</strong></p>

      <button className="restart-btn" onClick={resetQuiz}>🔄 Play Again</button>
    </div>
  );
}

export default QuizResult;
