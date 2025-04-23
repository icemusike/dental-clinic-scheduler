import { Appointment, Dentist, Patient, Treatment, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@dental.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-2',
    email: 'dentist@dental.com',
    password: 'dentist123',
    name: 'Dr. Amanda Lee',
    role: 'dentist',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'user-3',
    email: 'reception@dental.com',
    password: 'reception123',
    name: 'Sarah Johnson',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    address: '123 Main St, Anytown, CA 94321',
    insuranceProvider: 'Delta Dental',
    insuranceNumber: 'DD123456789',
    notes: 'Allergic to penicillin'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    dateOfBirth: '1990-11-22',
    address: '456 Oak Ave, Somewhere, CA 94322',
    insuranceProvider: 'Cigna',
    insuranceNumber: 'CG987654321'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1978-03-08',
    address: '789 Pine St, Elsewhere, CA 94323',
    insuranceProvider: 'Aetna',
    insuranceNumber: 'AE567891234',
    notes: 'Anxious about dental procedures'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1995-09-30',
    address: '321 Cedar Rd, Nowhere, CA 94324',
    insuranceProvider: 'MetLife',
    insuranceNumber: 'ML345678912'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 876-5432',
    dateOfBirth: '1982-12-03',
    address: '654 Maple Dr, Anywhere, CA 94325',
    insuranceProvider: 'Guardian',
    insuranceNumber: 'GD789123456',
    notes: 'Prefers afternoon appointments'
  }
];

export const mockDentists: Dentist[] = [
  {
    id: '1',
    name: 'Dr. Amanda Lee',
    email: 'dr.lee@dentalclinic.com',
    phone: '(555) 111-2222',
    specialization: 'General Dentistry',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '15:00' }
    ]
  },
  {
    id: '2',
    name: 'Dr. Robert Garcia',
    email: 'dr.garcia@dentalclinic.com',
    phone: '(555) 222-3333',
    specialization: 'Orthodontics',
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Friday', startTime: '10:00', endTime: '18:00' }
    ]
  },
  {
    id: '3',
    name: 'Dr. Jennifer Kim',
    email: 'dr.kim@dentalclinic.com',
    phone: '(555) 333-4444',
    specialization: 'Pediatric Dentistry',
    availability: [
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00' }
    ]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    email: 'dr.wilson@dentalclinic.com',
    phone: '(555) 444-5555',
    specialization: 'Endodontics',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '17:00' }
    ]
  }
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    name: 'Regular Checkup',
    duration: 30,
    cost: 75,
    description: 'Routine dental examination and cleaning'
  },
  {
    id: '2',
    name: 'Deep Cleaning',
    duration: 60,
    cost: 150,
    description: 'Thorough cleaning to remove plaque and tartar'
  },
  {
    id: '3',
    name: 'Cavity Filling',
    duration: 45,
    cost: 120,
    description: 'Filling a cavity with composite material'
  },
  {
    id: '4',
    name: 'Root Canal',
    duration: 90,
    cost: 800,
    description: 'Treatment for infected pulp in tooth'
  },
  {
    id: '5',
    name: 'Tooth Extraction',
    duration: 45,
    cost: 200,
    description: 'Removal of damaged or problematic tooth'
  },
  {
    id: '6',
    name: 'Crown Placement',
    duration: 60,
    cost: 950,
    description: 'Fitting a crown over damaged tooth'
  },
  {
    id: '7',
    name: 'Teeth Whitening',
    duration: 60,
    cost: 350,
    description: 'Professional whitening treatment'
  }
];

// Generate appointments for the next 30 days
const generateAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();
  const appointmentTypes: Appointment['type'][] = ['checkup', 'cleaning', 'filling', 'extraction', 'root-canal', 'crown', 'other'];
  const appointmentStatuses: Appointment['status'][] = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Generate 2-5 appointments per day
    const numAppointments = Math.floor(Math.random() * 4) + 2;
    
    for (let j = 0; j < numAppointments; j++) {
      const startHour = 9 + Math.floor(Math.random() * 7); // 9 AM to 4 PM
      const startMinute = Math.random() < 0.5 ? 0 : 30; // Either on the hour or half hour
      
      const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
      
      // Duration between 30 and 90 minutes in 30-minute increments
      const durationMinutes = (Math.floor(Math.random() * 3) + 1) * 30;
      
      const endHour = startHour + Math.floor((startMinute + durationMinutes) / 60);
      const endMinute = (startMinute + durationMinutes) % 60;
      
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
      
      const patientId = mockPatients[Math.floor(Math.random() * mockPatients.length)].id;
      const dentistId = mockDentists[Math.floor(Math.random() * mockDentists.length)].id;
      const type = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
      
      // Appointments in the past are more likely to be completed
      let status: Appointment['status'];
      if (date < today) {
        status = Math.random() < 0.8 ? 'completed' : (Math.random() < 0.5 ? 'cancelled' : 'no-show');
      } else if (date.toDateString() === today.toDateString()) {
        status = Math.random() < 0.7 ? 'confirmed' : 'scheduled';
      } else {
        status = Math.random() < 0.3 ? 'confirmed' : 'scheduled';
      }
      
      appointments.push({
        id: `appointment-${i}-${j}`,
        patientId,
        dentistId,
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        status,
        type,
        notes: Math.random() < 0.3 ? 'Special notes for this appointment' : undefined
      });
    }
  }
  
  return appointments;
};

export const mockAppointments: Appointment[] = generateAppointments();
