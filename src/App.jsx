import React, { useState, useEffect } from 'react';
import QuizStart from './components/QuizStart';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import './App.css';

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('start'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchQuizData = async () => {
      try {
        setLoading(true);
        let response;

        
        try {
          response = await fetch('http://localhost:5000/api/quiz');
          if (!response.ok) throw new Error('Local API not running');
        } catch (err) {
         
          response = await fetch('https://api.jsonserve.com/Uw5CrX');
          if (!response.ok) throw new Error('Backup API failed to fetch data');
        }

        const data = await response.json();
        console.log('🔥 DEBUG - Full API Response:', data);

       
        console.log("🔥 DEBUG - Questions Key:", data.questions);
        if (Array.isArray(data.questions)) {
          console.log("✅ DEBUG - Total Questions Found:", data.questions.length);
        } else {
          console.log("❌ DEBUG - 'questions' key missing or not an array!");
        }

        if (isMounted) {
          if (data && Array.isArray(data.questions)) {
            setQuizData(data.questions); 
            setError('');
          } else {
            throw new Error("Invalid quiz data format: 'questions' key missing or not an array.");
          }
        }
      } catch (err) {
        console.error('❌ ERROR - Fetching Quiz Data:', err);
        if (isMounted) setError(err.message || 'Unable to load quiz. Please try again later.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchQuizData();

    return () => {
      isMounted = false; 
    };
  }, []);

  const startQuiz = () => setQuizState('inProgress');

  const handleAnswerSelection = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 4);
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < quizData.length) {
          return nextIndex;
        } else {
          setQuizState('result');
          return prevIndex;
        }
      });
    }, 1000); 
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizState('start');
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading quiz...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : quizData.length === 0 ? (  
        <p className="error-message">No quiz questions available. Please try again later.</p>
      ) : (
        <>
          {quizState === 'start' && <QuizStart startQuiz={startQuiz} />}
          {quizState === 'inProgress' && quizData.length > 0 && quizData[currentQuestionIndex] && (
            <QuizQuestion
              question={quizData[currentQuestionIndex]}
              onAnswerSelection={handleAnswerSelection}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={quizData.length}
            />
          )}
          {quizState === 'result' && (
            <QuizResult
              score={score}
              totalQuestions={quizData.length}
              resetQuiz={resetQuiz}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
