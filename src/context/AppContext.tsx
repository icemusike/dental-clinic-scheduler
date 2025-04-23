import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, Dentist, Patient, Treatment } from '../types';
import { mockAppointments, mockDentists, mockPatients, mockTreatments } from '../data/mockData';

interface AppContextType {
  patients: Patient[];
  dentists: Dentist[];
  appointments: Appointment[];
  treatments: Treatment[];
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  getDentistById: (id: string) => Dentist | undefined;
  getAppointmentById: (id: string) => Appointment | undefined;
  getTreatmentById: (id: string) => Treatment | undefined;
  getPatientAppointments: (patientId: string) => Appointment[];
  getDentistAppointments: (dentistId: string) => Appointment[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [dentists, setDentists] = useState<Dentist[]>(mockDentists);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);

  // In a real app, you would fetch data from an API here
  useEffect(() => {
    // This would be replaced with API calls
    // For now, we're using mock data
  }, []);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const updatePatient = (patient: Patient) => {
    setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (appointment: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === appointment.id ? appointment : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const getPatientById = (id: string) => {
    return patients.find(p => p.id === id);
  };

  const getDentistById = (id: string) => {
    return dentists.find(d => d.id === id);
  };

  const getAppointmentById = (id: string) => {
    return appointments.find(a => a.id === id);
  };

  const getTreatmentById = (id: string) => {
    return treatments.find(t => t.id === id);
  };

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(a => a.patientId === patientId);
  };

  const getDentistAppointments = (dentistId: string) => {
    return appointments.filter(a => a.dentistId === dentistId);
  };

  return (
    <AppContext.Provider
      value={{
        patients,
        dentists,
        appointments,
        treatments,
        addPatient,
        updatePatient,
        deletePatient,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getPatientById,
        getDentistById,
        getAppointmentById,
        getTreatmentById,
        getPatientAppointments,
        getDentistAppointments
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
