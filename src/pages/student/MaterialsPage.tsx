import React, { useState } from 'react';
import { Search, Filter, FileText, Video, BookOpen, Download, ExternalLink, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function MaterialsPage() {
  const { studyMaterials } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesStream = selectedStream === 'all' || material.stream === selectedStream;
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesStream && matchesCategory;
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

  const categories = ['All Categories', 'Entrance Exams', 'Career Guidance', 'Stream Selection', 'Study Tips', 'Scholarship Info'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-8 w-8 mr-3 text-primary-600" />
          Study Materials
        </h1>
        <p className="text-xl text-gray-600">
          Access curated learning resources to support your academic journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Search materials..."
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDFs</option>
              <option value="video">Videos</option>
              <option value="article">Articles</option>
            </select>
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
            <option value="general">General</option>
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? 'all' : category}>
                {category}
              </option>
            ))}
          </select>
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
            <div key={material.id} className="card hover:shadow-lg group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getTypeColor(material.type)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex space-x-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    material.stream === 'science' ? 'bg-blue-100 text-blue-800' :
                    material.stream === 'commerce' ? 'bg-green-100 text-green-800' :
                    material.stream === 'arts' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {material.stream === 'general' ? 'All' : material.stream.charAt(0).toUpperCase() + material.stream.slice(1)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {material.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {material.description}
              </p>
              
              <div className="mb-4">
                <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {material.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {material.type}
                </span>
                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-12">
        <div className="card bg-gradient-to-r from-secondary-50 to-primary-50 border-2 border-dashed border-primary-300">
          <div className="text-center py-8">
            <Plus className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Have a useful resource to share?
            </h3>
            <p className="text-gray-600 mb-4">
              Help fellow students by contributing study materials
            </p>
            <button className="btn-primary">
              Upload Material
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}