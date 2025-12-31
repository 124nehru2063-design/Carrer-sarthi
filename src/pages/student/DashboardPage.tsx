import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  School, 
  Calendar, 
  FileText, 
  Target, 
  TrendingUp,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const { timelineEvents, recommendations } = useData();

  const quickActions = [
    {
      title: 'Take Aptitude Quiz',
      description: 'Discover your ideal career stream',
      icon: Target,
      link: '/quiz',
      color: 'bg-primary-600'
    },
    {
      title: 'Explore Courses',
      description: 'Browse available academic programs',
      icon: BookOpen,
      link: '/courses',
      color: 'bg-secondary-600'
    },
    {
      title: 'Find Colleges',
      description: 'Search and filter top institutions',
      icon: School,
      link: '/colleges',
      color: 'bg-accent-600'
    },
    {
      title: 'Study Materials',
      description: 'Access learning resources',
      icon: FileText,
      link: '/materials',
      color: 'bg-purple-600'
    },
    {
      title: 'Study Task',
      description: 'Add Your Task',
      icon: FileText,
      link: '/TodoPage',
      color: 'bg-purple-600'
    }
  ];

  const upcomingEvents = timelineEvents
    .filter(event => !event.completed)
    .slice(0, 3);

  const completedEvents = timelineEvents.filter(event => event.completed).length;
  const totalEvents = timelineEvents.length;
  const progressPercentage = (completedEvents / totalEvents) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="card bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Continue your journey to academic and career success
              </p>
              {user?.stream && (
                <div className="mt-3 inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <Star className="h-4 w-4" />
                  <span className="capitalize">Recommended: {user.stream} Stream</span>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-blue-100 text-sm">Class {user?.class}</p>
                <p className="text-white font-semibold">Progress: {Math.round(progressPercentage)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <div className="card group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className={`${action.color} p-3 rounded-lg text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
              Your Progress
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Timeline Completion</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {recommendations.stream && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-900 mb-2">Recommended Stream</h4>
                <p className="text-primary-700 capitalize">
                  Based on your aptitude test, we recommend the <strong>{recommendations.stream}</strong> stream.
                </p>
                <Link to="/courses" className="inline-flex items-center mt-2 text-primary-600 hover:text-primary-700 font-medium">
                  Explore Courses <span className="ml-1">→</span>
                </Link>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Recent Activity</h4>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/timeline" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                View Full Timeline <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{completedEvents}</h3>
            <p className="text-gray-600">Tasks Completed</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <School className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{recommendations.colleges.length || 150}</h3>
            <p className="text-gray-600">Recommended Colleges</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{recommendations.courses.length || 50}</h3>
            <p className="text-gray-600">Relevant Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}