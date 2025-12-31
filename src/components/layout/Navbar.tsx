import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <GraduationCap className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              Career Saathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                {user.role === 'student' && (
                  <>
                    <Link to="/quiz" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Aptitude Quiz
                    </Link>
                    <Link to="/courses" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Courses
                    </Link>
                    <Link to="/colleges" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Colleges
                    </Link>
                    <Link to="/timeline" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Timeline
                    </Link>
                    <Link to="/materials" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Materials
                    </Link>
                    <Link to="/TodoPage" className="text-gray-700 hover:text-primary-600 transition-colors">
                      Task
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {user ? (
              <div className="space-y-3">
                <Link to="/dashboard" className="block text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                {user.role === 'student' && (
                  <>
                    <Link to="/quiz" className="block text-gray-700 hover:text-primary-600 transition-colors">
                      Aptitude Quiz
                    </Link>
                    <Link to="/courses" className="block text-gray-700 hover:text-primary-600 transition-colors">
                      Courses
                    </Link>
                    <Link to="/colleges" className="block text-gray-700 hover:text-primary-600 transition-colors">
                      Colleges
                    </Link>
                    <Link to="/timeline" className="block text-gray-700 hover:text-primary-600 transition-colors">
                      Timeline
                    </Link>
                    <Link to="/materials" className="block text-gray-700 hover:text-primary-600 transition-colors">
                      Materials
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="block w-full text-left text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" className="block text-gray-700">
                  Login
                </Link>
                <Link to="/register" className="block text-primary-600 font-medium">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}