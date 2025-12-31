import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, FileText, Video, BookOpen, Upload } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AdminMaterials() {
  const { studyMaterials } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<string>('all');

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesStream = selectedStream === 'all' || material.stream === selectedStream;
    return matchesSearch && matchesType && matchesStream;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'article': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'article': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="h-8 w-8 mr-3 text-primary-600" />
              Manage Study Materials
            </h1>
            <p className="text-xl text-gray-600">
              Upload and organize learning resources for students
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Material
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Search materials..."
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="pdf">PDFs</option>
            <option value="video">Videos</option>
            <option value="article">Articles</option>
          </select>
          
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="input-field"
          >
            <option value="all">All Streams</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="bg-red-100 p-3 rounded-lg w-fit mx-auto mb-3">
            <FileText className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {studyMaterials.filter(m => m.type === 'pdf').length}
          </h3>
          <p className="text-gray-600">PDFs</p>
        </div>
        
        <div className="card text-center">
          <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-3">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {studyMaterials.filter(m => m.type === 'video').length}
          </h3>
          <p className="text-gray-600">Videos</p>
        </div>
        
        <div className="card text-center">
          <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {studyMaterials.filter(m => m.type === 'article').length}
          </h3>
          <p className="text-gray-600">Articles</p>
        </div>
        
        <div className="card text-center">
          <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-3">
            <Plus className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{studyMaterials.length}</h3>
          <p className="text-gray-600">Total</p>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredMaterials.length} of {studyMaterials.length} materials
        </p>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => {
          const Icon = getTypeIcon(material.type);
          return (
            <div key={material.id} className="card group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getTypeColor(material.type)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {material.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {material.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900">{material.category}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Stream:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    material.stream === 'science' ? 'bg-blue-100 text-blue-800' :
                    material.stream === 'commerce' ? 'bg-green-100 text-green-800' :
                    material.stream === 'arts' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {material.stream === 'general' ? 'All' : material.stream.charAt(0).toUpperCase() + material.stream.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium text-gray-900 capitalize">{material.type}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Last updated: 2 days ago</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add new materials</p>
        </div>
      )}
    </div>
  );
}