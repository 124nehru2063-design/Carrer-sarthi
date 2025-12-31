import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Building,
  BookOpen,
  DollarSign,
  Calendar,
  Award,
  Heart,
  ExternalLink
} from 'lucide-react';

const CollegeDetailPage: React.FC = () => {
  const { id } = useParams();

  // Mock college data - in real app, fetch from Supabase using id
  const college = {
    id: '1',
    name: 'XYZ University',
    location: 'Fort, Mumbai, Maharashtra',
    type: 'Government University',
    established: '1857',
    rating: 4.5,
    reviews: 1250,
    description: 'The University of Mumbai is one of the oldest and premier Universities in India. It was established in 1857 and has been a pioneer in higher education.',
    programs: [
      {
        name: 'B.Sc Computer Science',
        duration: '3 years',
        fees: '₹15,000/year',
        cutoff: '85%',
        seats: 120
      },
      {
        name: 'B.Com',
        duration: '3 years',
        fees: '₹12,000/year',
        cutoff: '75%',
        seats: 200
      },
      {
        name: 'B.A English',
        duration: '3 years',
        fees: '₹10,000/year',
        cutoff: '70%',
        seats: 80
      }
    ],
    facilities: [
      'Central Library with 5 lakh books',
      'Computer Labs with latest equipment',
      'Sports Complex',
      'Hostel accommodation',
      'Medical Center',
      'Cafeteria',
      'Research Centers',
      'Auditorium'
    ],
    contact: {
      phone: '+91 22 2652 7654',
      email: 'admissions@mu.ac.in',
      website: 'www.mu.ac.in',
      address: 'University of Mumbai, Kalina, Santacruz East, Mumbai - 400098'
    },
    images: [
      // 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg',
      // 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg',
      // 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      'https://media.istockphoto.com/id/1139171596/photo/row-of-large-old-victorian-style-detached-brick-houses-with-gables.jpg?s=612x612&w=0&k=20&c=BfAYZbik_QqUPhRtZzfV73xg5M66J2GtRuagbn5wQzY='
    ],
    admissionProcess: [
      'Online application submission',
      'Document verification',
      'Merit list publication',
      'Counseling and seat allocation',
      'Fee payment and admission confirmation'
    ],
    importantDates: [
      { event: 'Application Start', date: '2024-05-01' },
      { event: 'Application Deadline', date: '2024-06-15' },
      { event: 'Merit List', date: '2024-07-01' },
      { event: 'Counseling', date: '2024-07-15' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/colleges"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          {/* <span>Back to Colleges</span> */}
        </Link>

      </div>
    </div>
  );
};

export default CollegeDetailPage;