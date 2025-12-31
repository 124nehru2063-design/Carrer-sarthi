import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Users, TrendingUp, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Niko from './AI_Agent';

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Guidance',
      description: 'AI-powered recommendations based on your interests and aptitude'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Database',
      description: 'Access to 1000+ courses and colleges with detailed information'
    },
    {
      icon: Users,
      title: 'Expert Counseling',
      description: 'Connect with career counselors and industry professionals'
    },
    {
      icon: TrendingUp,
      title: 'Career Tracking',
      description: 'Track your progress and stay updated with admission timelines'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      class: 'Class 12 Graduate',
      text: 'Career Saathi helped me discover my passion for computer science. Now I\'m studying at IIT Delhi!',
      rating: 5
    },
    {
      name: 'Rahul Gupta',
      class: 'Commerce Student',
      text: 'The aptitude quiz was amazing. It guided me to choose CA over engineering, and I couldn\'t be happier.',
      rating: 5
    },
    {
      name: 'Ananya Singh',
      class: 'Arts Stream',
      text: 'Found the perfect psychology program through this platform. The college recommendations were spot-on.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Career Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Starts Here
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Discover your perfect career path with personalized recommendations, 
              expert guidance, and comprehensive resources for life after Class 10 & 12.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/quiz" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
                Take Aptitude Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Career Saathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to make informed decisions about your future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg group">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary-100 p-4 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

                {/* AI Agent Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
         

          {/* AI Agent Component */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6">
              <Niko />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to discover your ideal career path
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
              <p className="text-gray-600">Complete our comprehensive aptitude and interest assessment</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive personalized course and career suggestions</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Future</h3>
              <p className="text-gray-600">Track admissions, access resources, and achieve your goals</p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped students achieve their dreams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.class}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Discover Your Future?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who have found their perfect career path with our guidance.
          </p>
          <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2">
            <span>Start Your Journey Today</span>
            <CheckCircle className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}