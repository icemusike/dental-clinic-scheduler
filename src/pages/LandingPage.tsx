import type React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Import actual icons from lucide-react
import {
  CalendarClock, Users, ClipboardList, BarChart3, Lock, Zap,
  PlayCircle, Star, MessageSquare, Building, BadgeCheck, Award,
  Sun, Moon, Facebook, Twitter, Linkedin, HelpCircle, CheckCircle,
  Shield, BarChart, Clock, ChevronRight, Menu, X, Mail
} from 'lucide-react';

// Professional SocialProof component
const SocialProofCarousel = () => (
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center">
      <div className="flex text-yellow-500">
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
        <Star size={16} fill="currentColor" strokeWidth={0} />
      </div>
      <span className="ml-2 text-sm font-medium">4.9/5 from 500+ clinics</span>
    </div>
    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center">
      <Shield size={16} className="text-blue-600" />
      <span className="ml-2 text-sm font-medium">HIPAA Compliant</span>
    </div>
  </div>
);

// Professional video placeholder
const LoopedVideoPlaceholder = () => (
  <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center text-white group cursor-pointer">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=1974')] bg-cover bg-center opacity-30"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="relative z-10 flex flex-col items-center justify-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4 group-hover:scale-110 transition duration-300">
        <PlayCircle size={48} className="text-white" />
      </div>
      <p className="text-xl font-medium mb-2">See DentalSched in Action</p>
      <p className="text-sm opacity-80">Watch a 2-minute demo</p>
    </div>
  </div>
);

// Enhanced SVG avatar component
const AvatarPlaceholder = ({ nameInitial, bgColorClass = 'bg-blue-200', textColorClass = 'text-blue-700' }: { nameInitial: string, bgColorClass?: string, textColorClass?: string }) => (
  <div className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center shadow-sm overflow-hidden`}>
    <span className={`font-semibold text-lg ${textColorClass}`}>
      {nameInitial.charAt(0).toUpperCase()}
    </span>
  </div>
);

// Decorative gradient blob
const GradientBlob = ({ className = '', color1 = 'from-blue-500', color2 = 'to-indigo-500' }: { className?: string, color1?: string, color2?: string }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${color1} ${color2} ${className}`}></div>
);

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1 group">
    <div className="bg-blue-50 dark:bg-blue-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300">
      <Icon size={24} />
    </div>
    <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
);

// Check list item
const CheckListItem = ({ text }: { text: string }) => (
  <li className="flex items-start mb-3">
    <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </li>
);

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans overflow-hidden">
      {/* Main Header with subtle glass effect */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-100 dark:border-gray-800 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <CalendarClock size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">DentalSched</span>
            </Link>
            
            {/* Menu (hidden on mobile) */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/features" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">Contact</Link>
            </nav>
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hidden sm:inline-flex text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Sign In</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow">Get Started</Link>
              <button className="md:hidden text-gray-600 dark:text-gray-400">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* === Hero Section === */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 pb-32">
        {/* Decorative elements */}
        <GradientBlob className="w-[500px] h-[500px] right-[10%] top-[-20%]" color1="from-blue-400" color2="to-indigo-400" />
        <GradientBlob className="w-[600px] h-[600px] left-[-10%] bottom-[-40%]" color1="from-blue-300" color2="to-purple-400" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in-up">
                Smart Scheduling for Modern Dental Practices
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl md:mx-0 mx-auto animate-fade-in-up delay-100">
                Eliminate no-shows, optimize chair time, and free your staff with streamlined appointment management.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fade-in-up delay-200">
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  Start Your Free Trial <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/request-demo"
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow flex items-center justify-center"
                >
                  Schedule a Demo
                </Link>
              </div>
              <SocialProofCarousel />
            </div>
            <div className="order-1 md:order-2 animate-fade-in-up delay-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=2042" 
                  alt="Dental team using DentalSched software for appointment management" 
                  className="rounded-lg w-full h-auto"
                  loading="eager"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-white font-medium">Today's bookings: 28/30 slots filled</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">93% chair utilization - Excellent!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900">
          <svg className="absolute -top-16 w-full h-16 text-white dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="currentColor" d="M0 22L60 18.7C120 15.3 240 8.7 360 11.3C480 14 600 26 720 31.3C840 36.7 960 35.3 1080 29.3C1200 23.3 1320 12.7 1380 7.3L1440 2V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"></path>
          </svg>
        </div>
      </section>

      {/* === Problem/Solution Section === */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Transform Your Patient Scheduling</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Dental clinics using DentalSched report 35% fewer no-shows and 42% less time spent on administrative tasks.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem Column */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold rounded-full px-4 py-1 text-sm mb-6">
                THE PROBLEM
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Scheduling Shouldn't Be Your Biggest Headache
              </h3>
              
              <ul className="space-y-4">
                <CheckListItem text="Manual appointment booking wastes your staff's time and creates costly errors" />
                <CheckListItem text="No-shows and last-minute cancellations leave expensive chair time unused" />
                <CheckListItem text="Disorganized scheduling leads to double-bookings and unhappy patients" />
                <CheckListItem text="Scattered patient information makes providing personalized care difficult" />
              </ul>
              
              <div className="mt-8 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start">
                  <MessageSquare size={24} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-500 dark:text-gray-300 italic text-sm">
                    "Before DentalSched, we were spending hours each day just managing our calendar. It was our biggest administrative burden."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Solution Column */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl shadow-sm">
              <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold rounded-full px-4 py-1 text-sm mb-6">
                THE SOLUTION
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Smart Scheduling That Works For You
              </h3>
              
              <ul className="space-y-4">
                <CheckListItem text="Streamlined booking process that takes seconds, not minutes" />
                <CheckListItem text="Automated reminders reduce no-shows by up to 30%" />
                <CheckListItem text="Intelligent chair assignment prevents scheduling conflicts" />
                <CheckListItem text="Centralized patient data for personalized communication" />
              </ul>
              
              <div className="mt-8 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start">
                  <MessageSquare size={24} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-500 dark:text-gray-300 italic text-sm">
                    "With DentalSched, we've cut our administrative work in half and our schedule is consistently full. It pays for itself every month."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 relative">
        <GradientBlob className="w-[800px] h-[800px] right-[-20%] bottom-[-20%]" color1="from-indigo-300/40" color2="to-purple-300/40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Everything You Need to Run a Smooth Practice</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Powerful tools designed specifically for dental clinics</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={CalendarClock} 
              title="Smart Scheduling" 
              description="Drag-and-drop appointment booking with intelligent conflict prevention and automated reminders."
            />
            <FeatureCard 
              icon={Users} 
              title="Patient Management" 
              description="Comprehensive patient records with history, notes, and communication logs in one secure place."
            />
            <FeatureCard 
              icon={ClipboardList} 
              title="Provider Coordination" 
              description="Manage dentist schedules, preferences, and specialties to optimize your clinic's capacity."
            />
            <FeatureCard 
              icon={BarChart} 
              title="Business Analytics" 
              description="Track chair utilization, revenue, and appointment metrics with easy-to-understand reports."
            />
            <FeatureCard 
              icon={Lock} 
              title="Role-Based Access" 
              description="Secure, customizable permissions for administrators, providers, and front desk staff."
            />
            <FeatureCard 
              icon={Clock} 
              title="Time-Saving Automation" 
              description="Automatic appointment confirmations, waitlist management, and recurring appointment handling."
            />
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/features" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all features <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* === Demo Section === */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <LoopedVideoPlaceholder />
            
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Quick Setup</h3>
                <p className="text-gray-600 dark:text-gray-400">Import your existing patient data and start scheduling in minutes.</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Staff Training</h3>
                <p className="text-gray-600 dark:text-gray-400">Intuitive interface means minimal training time for your team.</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Ongoing Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Access to our dental-specific support team whenever you need help.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 relative">
        <GradientBlob className="w-[600px] h-[600px] left-[-10%] top-[10%]" color1="from-blue-300/30" color2="to-purple-300/30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Trusted by Dental Practices Everywhere</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">See what our customers have to say about DentalSched</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md relative">
              <div className="absolute top-8 right-8 opacity-10 text-blue-300">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M10,0L0,10L10,20L20,10L10,0Z M30,0L20,10L30,20L40,10L30,0Z M10,20L0,30L10,40L20,30L10,20Z M30,20L20,30L30,40L40,30L30,20Z"/>
                </svg>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    "DentalSched has transformed our practice management. The no-show rate has dropped by 35%, and our front desk staff spends way less time managing the schedule."
                  </p>
                </div>
                
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100" 
                      alt="Dr. Emily Carter" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Dr. Emily Carter</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bright Smile Dental, Chicago</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md relative">
              <div className="absolute top-8 right-8 opacity-10 text-blue-300">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M10,0L0,10L10,20L20,10L10,0Z M30,0L20,10L30,20L40,10L30,0Z M10,20L0,30L10,40L20,30L10,20Z M30,20L20,30L30,40L40,30L30,20Z"/>
                </svg>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    "The analytics alone justify the cost. We've identified our most profitable procedures and optimized scheduling to maximize revenue. Plus, patients love the reminders!"
                  </p>
                </div>
                
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" 
                      alt="Dr. James Wilson" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Dr. James Wilson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wilson Family Dental, Austin</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 (Video) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-xl shadow-md text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
              
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-grow">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 cursor-pointer">
                    <PlayCircle size={30} className="text-white" />
                  </div>
                  
                  <p className="text-white/90 mb-6 font-medium">
                    "It's the best investment we've made for our practice management in years..."
                  </p>
                </div>
                
                <div className="flex items-center mt-4 pt-4 border-t border-white/20">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" 
                      alt="Sarah Martinez" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Sarah Martinez</h4>
                    <p className="text-sm text-blue-100">Office Manager, Dental Associates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Pricing Section === */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">All plans include our core scheduling features, unlimited appointments, and email support</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Starter Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Clinic Starter</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">$99</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for small practices with up to 2 dentists and 1 location</p>
                  
                  <ul className="space-y-3 mb-8">
                    <CheckListItem text="Unlimited appointments" />
                    <CheckListItem text="Basic patient management" />
                    <CheckListItem text="Email & SMS reminders" />
                    <CheckListItem text="Standard reports" />
                    <CheckListItem text="Email support" />
                  </ul>
                  
                  <Link 
                    to="/signup?plan=starter" 
                    className="block w-full bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium py-3 rounded-lg text-center border border-blue-200 dark:border-gray-600 transition duration-200"
                  >
                    Start Free Trial
                  </Link>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">No credit card required to start</p>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-900 overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Clinic Professional</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">$199</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Ideal for growing practices with up to 5 dentists and multiple locations</p>
                  
                  <ul className="space-y-3 mb-8">
                    <CheckListItem text="Everything in Starter" />
                    <CheckListItem text="Advanced patient management" />
                    <CheckListItem text="Custom appointment types" />
                    <CheckListItem text="Advanced analytics & reporting" />
                    <CheckListItem text="Priority support" />
                    <CheckListItem text="Staff performance tracking" />
                  </ul>
                  
                  <Link 
                    to="/signup?plan=pro" 
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-center transition duration-200"
                  >
                    Start Free Trial
                  </Link>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">14-day free trial included</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">Need a custom plan for a larger practice?</p>
              <Link 
                to="/contact" 
                className="inline-flex items-center mt-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
              >
                Contact us for enterprise pricing <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === Final CTA === */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <GradientBlob className="w-[800px] h-[800px] right-[-30%] top-[-30%] opacity-30" color1="from-white" color2="to-blue-300" />
        <GradientBlob className="w-[600px] h-[600px] left-[-10%] bottom-[-40%] opacity-30" color1="from-indigo-300" color2="to-purple-300" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Stop wasting time on scheduling headaches. Start focusing on what you do best.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Start Your Free Trial <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-blue-500 text-white border border-white/30 font-bold py-4 px-10 rounded-lg text-lg transition duration-300"
              >
                Talk to Sales
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-blue-100">No credit card required. Free 14-day trial.</p>
          </div>
        </div>
      </section>

      {/* === Trust & Compliance Strip === */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="flex items-center">
              <BadgeCheck size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <Shield size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">256-bit Encryption</span>
            </div>
            <div className="flex items-center">
              <Award size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Top Rated 2023</span>
            </div>
            <div className="flex items-center">
              <Building size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">5000+ Practices</span>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand & Social */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <CalendarClock size={24} className="text-blue-400" />
                <span className="text-xl font-bold text-white">DentalSched</span>
              </div>
              <p className="text-sm mb-6 text-gray-400">Streamlining dental practice management since 2020. Trusted by thousands of clinics worldwide.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Column 2: Product Links */}
            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Product</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="/updates" className="text-gray-400 hover:text-white transition-colors">Product Updates</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Resources / Mini-FAQ */}
            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Resources</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/guides" className="text-gray-400 hover:text-white transition-colors">User Guides</Link></li>
                <li><Link to="/webinars" className="text-gray-400 hover:text-white transition-colors">Webinars</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support Center</Link></li>
              </ul>
            </div>
            
            {/* Column 4: Contact & Legal */}
            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Company</h5>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm text-center sm:text-left sm:flex sm:justify-between sm:items-center">
            <p>&copy; {new Date().getFullYear()} DentalSched. All rights reserved.</p>
            <div className="mt-4 sm:mt-0">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center sm:justify-start">
                <Mail size={16} className="mr-2" />
                <span>hello@dentalschedpro.com</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 