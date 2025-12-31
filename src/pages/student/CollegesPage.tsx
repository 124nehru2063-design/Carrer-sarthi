// import React, { useState } from 'react';
// import { Search, Filter, MapPin, DollarSign, Trophy, Users, TrendingUp } from 'lucide-react';
// import { useData } from '../../contexts/DataContext';

// export default function CollegesPage() {
//   const { colleges } = useData();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState<string>('all');
//   const [maxFees, setMaxFees] = useState<number>(500000);

//   const filteredColleges = colleges.filter(college => {
//     const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedType === 'all' || college.type === selectedType;
//     const matchesFees = college.fees.amount <= maxFees;
    
//     return matchesSearch && matchesType && matchesFees;
//   });

//   const formatFees = (amount: number, period: string) => {
//     return `₹${amount.toLocaleString('en-IN')} ${period === 'annual' ? 'per year' : 'total'}`;
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
//           <Users className="h-8 w-8 mr-3 text-primary-600" />
//           Find Your Dream College
//         </h1>
//         <p className="text-xl text-gray-600">
//           Browse top institutions and find the perfect match for your academic goals
//         </p>
//       </div>

//       {/* Search and Filters */}
//       <div className="card mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="md:col-span-2 relative">
//             <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="input-field pl-10"
//               placeholder="Search colleges or locations..."
//             />
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <select
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//               className="input-field pl-10"
//             >
//               <option value="all">All Types</option>
//               <option value="engineering">Engineering</option>
//               <option value="medical">Medical</option>
//               <option value="commerce">Commerce</option>
//               <option value="arts">Arts</option>
//               <option value="law">Law</option>
//             </select>
//           </div>
          
//           <div className="relative">
//             <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <select
//               value={maxFees}
//               onChange={(e) => setMaxFees(Number(e.target.value))}
//               className="input-field pl-10"
//             >
//               <option value={500000}>All Fees</option>
//               <option value={50000}>Under ₹50,000</option>
//               <option value={100000}>Under ₹1,00,000</option>
//               <option value={200000}>Under ₹2,00,000</option>
//               <option value={500000}>Under ₹5,00,000</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Showing {filteredColleges.length} of {colleges.length} colleges
//         </p>
//       </div>

//       {/* Colleges Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {filteredColleges.map(college => (
//           <div key={college.id} className="card hover:shadow-lg group">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//                     college.type === 'engineering' ? 'bg-blue-100 text-blue-800' :
//                     college.type === 'medical' ? 'bg-red-100 text-red-800' :
//                     college.type === 'commerce' ? 'bg-green-100 text-green-800' :
//                     college.type === 'arts' ? 'bg-purple-100 text-purple-800' :
//                     'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
//                   </span>
//                   <div className="flex items-center text-yellow-500">
//                     <Trophy className="h-4 w-4 mr-1" />
//                     <span className="text-sm font-medium">Rank #{college.ranking}</span>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
//                   {college.name}
//                 </h3>
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   <span>{college.location}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4 mb-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Annual Fees</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {formatFees(college.fees.amount, college.fees.period)}
//                   </p>
//                 </div>
//                 <DollarSign className="h-8 w-8 text-green-600" />
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Available Courses</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {college.courses.slice(0, 3).map((course, index) => (
//                     <span key={index} className="bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-lg">
//                       {course}
//                     </span>
//                   ))}
//                   {college.courses.length > 3 && (
//                     <span className="text-sm text-gray-500">
//                       +{college.courses.length - 3} more
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Admission Process</h4>
//                 <div className="space-y-2">
//                   {college.admissionProcess.map((step, index) => (
//                     <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
//                       <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
//                         {index + 1}
//                       </div>
//                       <span>{step}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
//               <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
//                 View Details
//                 <TrendingUp className="h-4 w-4 ml-1" />
//               </button>
//               <button className="btn-primary">
//                 Add to Favorites
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredColleges.length === 0 && (
//         <div className="text-center py-12">
//           <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
//           <p className="text-gray-600">Try adjusting your search criteria or filters</p>
//         </div>
//       )}
//     </div>
//   );
// }