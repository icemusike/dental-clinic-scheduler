import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Calendar, Lock, Mail, User, Shield, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoggingIn(true);
    const success = await login(data.email, data.password);
    setIsLoggingIn(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setIsLoggingIn(true);
    const success = await login(email, password);
    setIsLoggingIn(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Card Container */}
      <div className="max-w-[1000px] w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 md:w-[400px] text-white">
            <div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8" />
                <span className="text-2xl font-semibold">DentalSchedule Pro</span>
              </div>
              <h1 className="text-3xl font-bold mt-8 mb-4">Welcome back</h1>
              <p className="text-blue-100 mb-8">
                Sign in to your account to manage appointments, patients, and your dental practice with ease.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/20 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span>Smart appointment scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/20 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <span>Patient management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/20 rounded-full">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span>Secure and compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-8 md:p-12 flex-1">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600 mb-8">
                Access your dashboard to manage your dental practice
              </p>

              {error && (
                <div className="mb-6">
                  <Alert variant="error">{error}</Alert>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            className={`block w-full pl-10 pr-3 py-2.5 border ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="you@example.com"
                            {...field}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot password?
                          </a>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            className={`block w-full pl-10 pr-3 py-2.5 border ${
                              errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="••••••••"
                            {...field}
                          />
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  isLoading={isLoggingIn}
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Try Demo Account
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 py-2.5 border-2 hover:bg-gray-50"
                    onClick={() => handleDemoLogin('admin@dental.com', 'admin123')}
                    isLoading={isLoggingIn}
                  >
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Login as Admin</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 py-2.5 border-2 hover:bg-gray-50"
                    onClick={() => handleDemoLogin('dentist@dental.com', 'dentist123')}
                    isLoading={isLoggingIn}
                  >
                    <User className="h-4 w-4 text-blue-600" />
                    <span>Login as Dentist</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 py-2.5 border-2 hover:bg-gray-50"
                    onClick={() => handleDemoLogin('reception@dental.com', 'reception123')}
                    isLoading={isLoggingIn}
                  >
                    <User className="h-4 w-4 text-blue-600" />
                    <span>Login as Receptionist</span>
                  </Button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link 
        to="/"
        className="absolute bottom-8 left-8 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default LoginPage;
