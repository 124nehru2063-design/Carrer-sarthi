import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  School, 
  FileText, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AdminDashboard() {
  const { courses, colleges, studyMaterials, timelineEvents } = useData();

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      change: '+12%',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Partner Colleges',
      value: colleges.length,
      change: '+8%',
      icon: School,
      color: 'bg-green-500'
    },
    {
      title: 'Study Materials',
      value: studyMaterials.length,
      change: '+23%',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Students',
      value: 1247,
      change: '+15%',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Courses',
      description: 'Add, edit, or remove course offerings',
      icon: BookOpen,
      link: '/admin/courses',
      color: 'bg-primary-600'
    },
    {
      title: 'Manage Colleges',
      description: 'Update college information and partnerships',
      icon: School,
      link: '/admin/colleges',
      color: 'bg-secondary-600'
    },
    {
      title: 'Study Materials',
      description: 'Upload and organize learning resources',
      icon: FileText,
      link: '/admin/materials',
      color: 'bg-accent-600'
    },
    {
      title: 'Analytics',
      description: 'View detailed usage and performance metrics',
      icon: BarChart3,
      link: '#',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600">
          Manage courses, colleges, and resources for student success
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <div className="card group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-105">
                <div className={`${action.color} p-4 rounded-lg text-white mb-4 mx-auto w-fit`}>
                  <action.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 text-center">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary-600" />
            Recent Activity
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-4 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New course added</p>
                <p className="text-sm text-gray-600">Computer Science Engineering program updated</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pb-4 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-lg">
                <School className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">College partnership</p>
                <p className="text-sm text-gray-600">Partnership with IIT Delhi confirmed</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New study material</p>
                <p className="text-sm text-gray-600">JEE Mathematics practice set uploaded</p>
                <p className="text-xs text-gray-500 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
            System Overview
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Course Coverage</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">College Database</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Material Quality</span>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last updated</span>
              <span className="text-gray-900 font-medium">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}