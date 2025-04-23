export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  notes?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface Dentist {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  availability: Availability[];
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'checkup' | 'cleaning' | 'filling' | 'extraction' | 'root-canal' | 'crown' | 'other';
  notes?: string;
}

export interface Treatment {
  id: string;
  name: string;
  duration: number; // in minutes
  cost: number;
  description: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patientId: string;
  dentistId: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'checkup' | 'cleaning' | 'filling' | 'extraction' | 'root-canal' | 'crown' | 'other';
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'dentist' | 'receptionist';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
