import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import AppointmentForm from '../components/appointments/AppointmentForm';
import AppointmentCard from '../components/appointments/AppointmentCard';
import { useAppContext } from '../context/AppContext';
import { Appointment } from '../types';
import { Plus, Search, Filter } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppContext();
  
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  const handleAddAppointment = (appointment: Appointment) => {
    addAppointment(appointment);
    setIsAddAppointmentModalOpen(false);
  };
  
  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditAppointmentModalOpen(true);
  };
  
  const handleUpdateAppointment = (appointment: Appointment) => {
    updateAppointment(appointment);
    setIsEditAppointmentModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      deleteAppointment(id);
    }
  };
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Search query filter
    const patientMatch = appointment.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const dentistMatch = appointment.dentistId.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const searchMatch = patientMatch || dentistMatch || typeMatch;
    
    // Status filter
    const statusMatch = statusFilter === 'all' || appointment.status === statusFilter;
    
    // Date filter
    let dateMatch = true;
    if (dateFilter === 'today') {
      dateMatch = appointment.date === today;
    } else if (dateFilter === 'upcoming') {
      dateMatch = appointment.date > today;
    } else if (dateFilter === 'past') {
      dateMatch = appointment.date < today;
    }
    
    return searchMatch && statusMatch && dateMatch;
  });
  
  // Sort appointments by date and time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    // Sort by date first
    const dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) return dateComparison;
    
    // If same date, sort by start time
    return a.startTime.localeCompare(b.startTime);
  });
  
  return (
    <Layout title="Appointments">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage all patient appointments</p>
        </div>
        
        <Button
          onClick={() => setIsAddAppointmentModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-1" />
          New Appointment
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search appointments..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No appointments found. Create a new appointment to get started.</p>
          </div>
        )}
      </div>
      
      {/* Add Appointment Modal */}
      <Modal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        title="Schedule New Appointment"
        size="lg"
      >
        <AppointmentForm
          onSubmit={handleAddAppointment}
          onCancel={() => setIsAddAppointmentModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Appointment Modal */}
      <Modal
        isOpen={isEditAppointmentModalOpen}
        onClose={() => {
          setIsEditAppointmentModalOpen(false);
          setSelectedAppointment(null);
        }}
        title="Edit Appointment"
        size="lg"
      >
        {selectedAppointment && (
          <AppointmentForm
            appointment={selectedAppointment}
            onSubmit={handleUpdateAppointment}
            onCancel={() => {
              setIsEditAppointmentModalOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default AppointmentsPage;
