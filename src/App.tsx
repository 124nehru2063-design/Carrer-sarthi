import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/student/DashboardPage';
import QuizPage from './pages/student/QuizPage';
import CoursesPage from './pages/student/CoursesPage';
import CollegeDetailPage from './pages/student/CollegeDetailPage';
import CollegePage from './pages/student/CollegePage';
import TimelinePage from './pages/student/TimelinePage';
import MaterialsPage from './pages/student/MaterialsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminColleges from './pages/admin/AdminColleges';
import AdminMaterials from './pages/admin/AdminMaterials';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Student Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/quiz" element={
                  <ProtectedRoute>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <CoursesPage />
                  </ProtectedRoute>
                } />
                <Route path="/colleges" element={
                  <ProtectedRoute>
                    <CollegePage/>
                    <CollegeDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/timeline" element={
                  <ProtectedRoute>
                    <TimelinePage />
                  </ProtectedRoute>
                } />
                <Route path="/materials" element={
                  <ProtectedRoute>
                    <MaterialsPage />
                  </ProtectedRoute>
                } />
                  <Route path="/TodoPage" element={
                  <ProtectedRoute>
                    <TodoPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/courses" element={
                  <ProtectedRoute adminOnly>
                    <AdminCourses />
                  </ProtectedRoute>
                } />
                <Route path="/admin/colleges" element={
                  <ProtectedRoute adminOnly>
                    <AdminColleges />
                  </ProtectedRoute>
                } />
                <Route path="/admin/materials" element={
                  <ProtectedRoute adminOnly>
                    <AdminMaterials />
                  </ProtectedRoute>
                } />
                <Route path="admin/TodoPage" element={
                  <ProtectedRoute adminOnly>
                    <TodoPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;