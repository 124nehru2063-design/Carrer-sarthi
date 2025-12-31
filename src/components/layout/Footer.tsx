import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold">Career Saathi</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering students to make informed decisions about their educational and career journey.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aptitude Test</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Course Explorer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">College Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Study Materials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarship Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Career Saathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}