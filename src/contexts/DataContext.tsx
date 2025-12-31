import React, { createContext, useContext, useState } from 'react';

interface Course {
  id: string;
  name: string;
  description: string;
  stream: 'science' | 'commerce' | 'arts';
  duration: string;
  prerequisites: string[];
  careerPaths: string[];
}

interface College {
  id: string;
  name: string;
  location: string;
  type: 'engineering' | 'medical' | 'commerce' | 'arts' | 'law';
  ranking: number;
  fees: {
    amount: number;
    period: 'annual' | 'total';
  };
  courses: string[];
  admissionProcess: string[];
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'exam' | 'admission' | 'scholarship' | 'application';
  completed: boolean;
}

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'article';
  category: string;
  stream: 'science' | 'commerce' | 'arts' | 'general';
  url: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  category: 'logical' | 'numerical' | 'verbal' | 'spatial' | 'interest';
}

interface DataContextType {
  courses: Course[];
  colleges: College[];
  timelineEvents: TimelineEvent[];
  studyMaterials: StudyMaterial[];
  quizQuestions: QuizQuestion[];
  recommendations: {
    stream?: string;
    courses: Course[];
    colleges: College[];
  };
  updateTimelineEvent: (id: string, completed: boolean) => void;
  setRecommendations: (recommendations: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [recommendations, setRecommendations] = useState({
    courses: [],
    colleges: []
  });

  // Mock data - in production this would come from the FastAPI backend
  const courses: Course[] = [
    {
      id: '1',
      name: 'Computer Science Engineering',
      description: 'Comprehensive program covering programming, algorithms, and software development',
      stream: 'science',
      duration: '4 years',
      prerequisites: ['Mathematics', 'Physics', 'Chemistry'],
      careerPaths: ['Software Engineer', 'Data Scientist', 'AI Researcher', 'Product Manager']
    },
    {
      id: '2',
      name: 'Bachelor of Commerce',
      description: 'Business and commerce fundamentals with specializations',
      stream: 'commerce',
      duration: '3 years',
      prerequisites: ['Mathematics', 'Economics', 'Accountancy'],
      careerPaths: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Entrepreneur']
    },
    {
      id: '3',
      name: 'Bachelor of Arts in Psychology',
      description: 'Study of human behavior and mental processes',
      stream: 'arts',
      duration: '3 years',
      prerequisites: ['English', 'Psychology'],
      careerPaths: ['Clinical Psychologist', 'Counselor', 'HR Manager', 'Researcher']
    }
  ];

  const colleges: College[] = [
    {
      id: '1',
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      type: 'engineering',
      ranking: 2,
      fees: { amount: 200000, period: 'annual' },
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
      admissionProcess: ['JEE Advanced', 'Counseling', 'Document Verification']
    },
    {
      id: '2',
      name: 'Lady Shri Ram College',
      location: 'New Delhi',
      type: 'arts',
      ranking: 1,
      fees: { amount: 50000, period: 'annual' },
      courses: ['Economics', 'Psychology', 'English Literature'],
      admissionProcess: ['CUET', 'Merit List', 'Document Verification']
    },
    {
      id: '3',
      name: 'Shri Ram College of Commerce',
      location: 'New Delhi',
      type: 'commerce',
      ranking: 1,
      fees: { amount: 75000, period: 'annual' },
      courses: ['B.Com', 'Economics', 'Business Studies'],
      admissionProcess: ['CUET', 'Cut-off', 'Admission']
    }
  ];

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: '1',
      title: 'JEE Main Registration',
      description: 'Register for JEE Main 2025',
      date: '2024-12-15',
      type: 'exam',
      completed: false
    },
    {
      id: '2',
      title: 'CUET Application',
      description: 'Submit CUET application for undergraduate programs',
      date: '2024-12-20',
      type: 'application',
      completed: false
    },
    {
      id: '3',
      title: 'Merit Scholarship Application',
      description: 'Apply for merit-based scholarships',
      date: '2025-01-10',
      type: 'scholarship',
      completed: false
    }
  ]);

  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'JEE Mathematics Practice Set',
      description: 'Comprehensive mathematics practice questions for JEE preparation',
      type: 'pdf',
      category: 'Entrance Exams',
      stream: 'science',
      url: '#'
    },
    {
      id: '2',
      title: 'Career Guidance Video Series',
      description: 'Expert insights on career paths after 12th',
      type: 'video',
      category: 'Career Guidance',
      stream: 'general',
      url: '#'
    },
    {
      id: '3',
      title: 'Commerce Stream Guide',
      description: 'Complete guide to commerce subjects and career options',
      type: 'article',
      category: 'Stream Selection',
      stream: 'commerce',
      url: '#'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Which of these activities interests you the most?',
      options: ['Solving mathematical problems', 'Creating art or designs', 'Managing finances', 'Helping others'],
      category: 'interest'
    },
    {
      id: '2',
      question: 'What is 15% of 240?',
      options: ['36', '32', '40', '38'],
      category: 'numerical'
    },
    {
      id: '3',
      question: 'Which word is most similar to "Innovative"?',
      options: ['Creative', 'Traditional', 'Simple', 'Basic'],
      category: 'verbal'
    },
    {
      id: '4',
      question: 'If all roses are flowers, and some flowers are red, then:',
      options: ['All roses are red', 'Some roses may be red', 'No roses are red', 'All flowers are roses'],
      category: 'logical'
    }
  ];

  const updateTimelineEvent = (id: string, completed: boolean) => {
    setTimelineEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, completed } : event
      )
    );
  };

  return (
    <DataContext.Provider value={{
      courses,
      colleges,
      timelineEvents,
      studyMaterials,
      quizQuestions,
      recommendations,
      updateTimelineEvent,
      setRecommendations
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}