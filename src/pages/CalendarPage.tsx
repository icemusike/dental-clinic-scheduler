import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Calendar from '../components/ui/Calendar';
import Modal from '../components/ui/Modal';
import AppointmentForm from '../components/appointments/AppointmentForm';
import { useAppContext } from '../context/AppContext';
import { appointmentToCalendarEvent, formatDate, formatTime } from '../utils/dateUtils';
import { Appointment, CalendarEvent } from '../types';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const { appointments, dentists, patients, addAppointment, updateAppointment, deleteAppointment, getPatientById, getDentistById } = useAppContext();
  
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isViewAppointmentModalOpen, setIsViewAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDentistId, setSelectedDentistId] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Convert appointments to calendar events
  const calendarEvents: CalendarEvent[] = appointments
    .filter(app => selectedDentistId === 'all' || app.dentistId === selectedDentistId)
    .map(appointmentToCalendarEvent);
  
  const handleSelectEvent = (event: CalendarEvent) => {
    const appointment = appointments.find(app => app.id === event.id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsViewAppointmentModalOpen(true);
    }
  };
  
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setIsNewAppointmentModalOpen(true);
  };
  
  const handleCreateAppointment = (appointment: Appointment) => {
    addAppointment(appointment);
    setIsNewAppointmentModalOpen(false);
  };
  
  const handleUpdateAppointment = (appointment: Appointment) => {
    updateAppointment(appointment);
    setIsViewAppointmentModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id);
    setIsViewAppointmentModalOpen(false);
    setSelectedAppointment(null);
  };

  const navigateToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <Layout title="Calendar">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Calendar</h1>
          <p className="text-gray-500">Manage and view all scheduled appointments</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedDentistId}
            onChange={(e) => setSelectedDentistId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Dentists</option>
            {dentists.map((dentist) => (
              <option key={dentist.id} value={dentist.id}>
                {dentist.name}
              </option>
            ))}
          </select>
          
          <Button
            onClick={() => setIsNewAppointmentModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-1" />
            New Appointment
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={currentView === 'month' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('month')}
            >
              Month
            </Button>
            <Button
              variant={currentView === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('week')}
            >
              Week
            </Button>
            <Button
              variant={currentView === 'day' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('day')}
            >
              Day
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToToday}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white rounded-lg shadow h-[calc(100vh-16rem)]">
        <Calendar
          events={calendarEvents}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          view={currentView}
          date={currentDate}
        />
      </div>
      
      {/* New Appointment Modal */}
      <Modal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        title="Schedule New Appointment"
        size="lg"
      >
        <AppointmentForm
          onSubmit={handleCreateAppointment}
          onCancel={() => setIsNewAppointmentModalOpen(false)}
          appointment={
            selectedDate
              ? {
                  id: '',
                  patientId: '',
                  dentistId: selectedDentistId !== 'all' ? selectedDentistId : '',
                  date: selectedDate.toISOString().split('T')[0],
                  startTime: `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}`,
                  endTime: '',
                  status: 'scheduled',
                  type: 'checkup',
                }
              : undefined
          }
        />
      </Modal>
      
      {/* View/Edit Appointment Modal */}
      <Modal
        isOpen={isViewAppointmentModalOpen}
        onClose={() => {
          setIsViewAppointmentModalOpen(false);
          setSelectedAppointment(null);
        }}
        title="Appointment Details"
        size="lg"
      >
        {selectedAppointment && (
          <div>
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{getPatientById(selectedAppointment.patientId)?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dentist</p>
                  <p className="font-medium">{getDentistById(selectedAppointment.dentistId)?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(selectedAppointment.date)}, {formatTime(selectedAppointment.startTime)} - {formatTime(selectedAppointment.endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">
                    {selectedAppointment.type.charAt(0).toUpperCase() + selectedAppointment.type.slice(1).replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </p>
                </div>
                {selectedAppointment.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <AppointmentForm
              appointment={selectedAppointment}
              onSubmit={handleUpdateAppointment}
              onCancel={() => {
                setIsViewAppointmentModalOpen(false);
                setSelectedAppointment(null);
              }}
            />
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="danger"
                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
              >
                Delete Appointment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default CalendarPage;
