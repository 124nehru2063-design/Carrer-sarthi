import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, School, MapPin, DollarSign } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AdminColleges() {
  const { colleges } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || college.type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatFees = (amount: number, period: string) => {
    return `₹${amount.toLocaleString('en-IN')} ${period === 'annual' ? 'per year' : 'total'}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <School className="h-8 w-8 mr-3 text-primary-600" />
              Manage Colleges
            </h1>
            <p className="text-xl text-gray-600">
              Maintain database of partner institutions and their programs
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add College
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
              placeholder="Search colleges..."
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
            <option value="law">Law</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Managing {filteredColleges.length} of {colleges.length} colleges
        </p>
      </div>

      {/* Colleges Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Ranking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredColleges.map(college => (
                <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{college.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {college.courses.slice(0, 2).map((course, index) => (
                          <span key={index} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                            {course}
                          </span>
                        ))}
                        {college.courses.length > 2 && (
                          <span className="text-xs text-gray-500">+{college.courses.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        college.type === 'engineering' ? 'bg-blue-100 text-blue-800' :
                        college.type === 'medical' ? 'bg-red-100 text-red-800' :
                        college.type === 'commerce' ? 'bg-green-100 text-green-800' :
                        college.type === 'arts' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Rank #{college.ranking}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-900">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-sm font-medium">
                        {formatFees(college.fees.amount, college.fees.period)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCourse(college)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(college.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredColleges.length === 0 && (
        <div className="text-center py-12">
          <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}