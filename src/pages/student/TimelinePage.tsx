import React from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function TimelinePage() {
  const { timelineEvents, updateTimelineEvent } = useData();

  const upcomingEvents = timelineEvents.filter(event => !event.completed);
  const completedEvents = timelineEvents.filter(event => event.completed);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return AlertTriangle;
      case 'admission': return Calendar;
      case 'scholarship': return Plus;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'text-red-600 bg-red-100';
      case 'admission': return 'text-blue-600 bg-blue-100';
      case 'scholarship': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-8 w-8 mr-3 text-primary-600" />
          Academic Timeline
        </h1>
        <p className="text-xl text-gray-600">
          Track important dates for admissions, exams, and scholarships
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{completedEvents.length}</h3>
          <p className="text-gray-600">Completed</p>
        </div>
        
        <div className="card text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</h3>
          <p className="text-gray-600">Upcoming</p>
        </div>
        
        <div className="card text-center">
          <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-secondary-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{timelineEvents.length}</h3>
          <p className="text-gray-600">Total Events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-orange-600" />
            Upcoming Events
          </h2>
          
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => {
                const Icon = getEventIcon(event.type);
                return (
                  <div key={event.id} className="card hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getEventColor(event.type)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            isUpcoming(event.date) ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {formatDate(event.date)}
                          </span>
                          <button
                            onClick={() => updateTimelineEvent(event.id, true)}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Mark Complete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No upcoming events</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Completed Events
          </h2>
          
          <div className="space-y-4">
            {completedEvents.length > 0 ? (
              completedEvents.map(event => {
                const Icon = getEventIcon(event.type);
                return (
                  <div key={event.id} className="card bg-green-50 border-green-200">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-green-100 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <span className="text-sm text-green-600 font-medium">
                          Completed on {formatDate(event.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed events yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Section */}
      <div className="mt-8">
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-dashed border-primary-300">
          <div className="text-center py-8">
            <Plus className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need to track a custom event?
            </h3>
            <p className="text-gray-600 mb-4">
              Add personal deadlines and important dates to your timeline
            </p>
            <button className="btn-primary">
              Add Custom Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}