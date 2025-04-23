import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Calendar, Lock, Mail, User } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
  role: z.enum(['admin', 'dentist', 'receptionist'], {
    errorMap: () => ({ message: 'Please select a role' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, error } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'receptionist',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSigningUp(true);
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = data;
    
    const success = await signup(userData);
    setIsSigningUp(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-2 bg-blue-600 rounded-md">
            <Calendar className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          DentalSchedule Pro
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a new account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4">
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      label="Full Name"
                      autoComplete="name"
                      error={errors.name?.message}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      label="Email address"
                      type="email"
                      autoComplete="email"
                      error={errors.email?.message}
                      className="pl-10"
                      {...field}
                    />
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      error={errors.password?.message}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      label="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      error={errors.confirmPassword?.message}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Role"
                    options={[
                      { value: 'admin', label: 'Administrator' },
                      { value: 'dentist', label: 'Dentist' },
                      { value: 'receptionist', label: 'Receptionist' },
                    ]}
                    error={errors.role?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isSigningUp}
              >
                Sign up
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
