import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, TrendingUp, Star } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function CoursesPage() {
  const { courses } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = selectedStream === 'all' || course.stream === selectedStream;
    const matchesDuration = selectedDuration === 'all' || course.duration === selectedDuration;
    
    return matchesSearch && matchesStream && matchesDuration;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-8 w-8 mr-3 text-primary-600" />
          Explore Courses
        </h1>
        <p className="text-xl text-gray-600">
          Discover academic programs that align with your interests and career goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Search courses..."
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Streams</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>
          </div>
          
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Durations</option>
              <option value="3 years">3 Years</option>
              <option value="4 years">4 Years</option>
              <option value="5 years">5 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="card hover:shadow-lg group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    course.stream === 'science' ? 'bg-blue-100 text-blue-800' :
                    course.stream === 'commerce' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {course.name}
                </h3>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {course.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((prereq, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-lg">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Career Opportunities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.careerPaths.slice(0, 3).map((career, index) => (
                    <span key={index} className="bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg">
                      {career}
                    </span>
                  ))}
                  {course.careerPaths.length > 3 && (
                    <span className="text-sm text-gray-500">
                      +{course.careerPaths.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                Learn More
                <Star className="h-4 w-4 ml-1" />
              </button>
              <button className="btn-primary">
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}