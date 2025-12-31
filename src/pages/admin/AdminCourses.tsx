import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface Course {
  id: string;
  name: string;
  description: string;
  stream: 'science' | 'commerce' | 'arts';
  duration: string;
  prerequisites: string[];
  careerPaths: string[];
}

export default function AdminCourses() {
  const { courses } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    name: '',
    description: '',
    stream: 'science',
    duration: '',
    prerequisites: [],
    careerPaths: []
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = selectedStream === 'all' || course.stream === selectedStream;
    return matchesSearch && matchesStream;
  });

  const handleAddCourse = () => {
    setIsAddingCourse(true);
    setCourseForm({
      name: '',
      description: '',
      stream: 'science',
      duration: '',
      prerequisites: [],
      careerPaths: []
    });
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course.id);
    setCourseForm(course);
  };

  const handleSaveCourse = () => {
    // In production, this would make an API call to save the course
    console.log('Saving course:', courseForm);
    setIsAddingCourse(false);
    setEditingCourse(null);
  };

  const handleCancel = () => {
    setIsAddingCourse(false);
    setEditingCourse(null);
    setCourseForm({});
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      // In production, this would make an API call to delete the course
      console.log('Deleting course:', courseId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-primary-600" />
              Manage Courses
            </h1>
            <p className="text-xl text-gray-600">
              Add, edit, and organize academic programs
            </p>
          </div>
          <button onClick={handleAddCourse} className="btn-primary flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Search courses..."
            />
          </div>
          
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="input-field"
          >
            <option value="all">All Streams</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Course Form */}
      {(isAddingCourse || editingCourse) && (
        <div className="card mb-8 border-2 border-primary-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {isAddingCourse ? 'Add New Course' : 'Edit Course'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                value={courseForm.name || ''}
                onChange={(e) => setCourseForm(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Enter course name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={courseForm.duration || ''}
                onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                className="input-field"
                placeholder="e.g., 3 years"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={courseForm.description || ''}
                onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                className="input-field h-24 resize-none"
                placeholder="Enter course description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
              <select
                value={courseForm.stream || 'science'}
                onChange={(e) => setCourseForm(prev => ({ ...prev, stream: e.target.value as any }))}
                className="input-field"
              >
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
              <input
                type="text"
                value={courseForm.prerequisites?.join(', ') || ''}
                onChange={(e) => setCourseForm(prev => ({ 
                  ...prev, 
                  prerequisites: e.target.value.split(', ').filter(Boolean) 
                }))}
                className="input-field"
                placeholder="Mathematics, Physics, Chemistry"
              />
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button onClick={handleSaveCourse} className="btn-primary flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Course
            </button>
            <button onClick={handleCancel} className="btn-secondary flex items-center">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    course.stream === 'science' ? 'bg-blue-100 text-blue-800' :
                    course.stream === 'commerce' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.prerequisites.map((prereq, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Career Paths</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.careerPaths.slice(0, 2).map((career, index) => (
                        <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                          {career}
                        </span>
                      ))}
                      {course.careerPaths.length > 2 && (
                        <span className="text-xs text-gray-500">+{course.careerPaths.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}