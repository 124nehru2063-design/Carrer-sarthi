import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Target, CheckCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

export default function QuizPage() {
  const { quizQuestions, setRecommendations } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const calculateResults = () => {
    // Mock algorithm for stream recommendation
    const answerValues = Object.values(answers);
    const avgScore = answerValues.reduce((sum, val) => sum + val, 0) / answerValues.length;
    
    let recommendedStream = 'science';
    if (avgScore < 1) recommendedStream = 'science';
    else if (avgScore < 2) recommendedStream = 'commerce';
    else recommendedStream = 'arts';

    const mockResults = {
      stream: recommendedStream,
      scores: {
        logical: Math.floor(Math.random() * 40) + 60,
        numerical: Math.floor(Math.random() * 40) + 60,
        verbal: Math.floor(Math.random() * 40) + 60,
        spatial: Math.floor(Math.random() * 40) + 60
      },
      personality: 'Analytical Thinker'
    };

    setResults(mockResults);
    setRecommendations({
      stream: recommendedStream,
      courses: [],
      colleges: []
    });
    setIsCompleted(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };

  if (isCompleted && results) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
          <p className="text-gray-600">Here are your personalized results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Stream</h2>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-primary-600 capitalize mb-2">
                {results.stream}
              </h3>
              <p className="text-gray-700">
                Based on your aptitude and interests, this stream aligns best with your potential.
              </p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personality Type</h2>
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-secondary-600 mb-2">
                {results.personality}
              </h3>
              <p className="text-gray-700">
                You excel at breaking down complex problems and finding logical solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Aptitude Scores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(results.scores).map(([skill, score]) => (
              <div key={skill} className="text-center">
                <div className="relative mb-4">
                  <svg className="w-20 h-20 mx-auto" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${score as number}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{score}%</span>
                  </div>
                </div>
                <p className="font-medium text-gray-900 capitalize">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/courses" className="btn-primary text-center">
            Explore Recommended Courses
          </Link>
          <button onClick={handleRetake} className="btn-secondary">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary-600" />
            Aptitude & Interest Quiz
          </h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="mb-6">
          <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {question.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                answers[question.id] === index
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-primary-300 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[question.id] === index
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={answers[question.id] === undefined}
          className="flex items-center btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Complete Quiz' : 'Next'}
          <ChevronRight className="h-5 w-5 ml-1" />
        </button>
      </div>
    </div>
  );
}