import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import DentistForm from '../components/dentists/DentistForm';
import DentistCard from '../components/dentists/DentistCard';
import { useAppContext } from '../context/AppContext';
import { Dentist } from '../types';
import { Plus, Search } from 'lucide-react';

const DentistsPage: React.FC = () => {
  const { dentists, appointments, addDentist, updateDentist, deleteDentist } = useAppContext();
  
  const [isAddDentistModalOpen, setIsAddDentistModalOpen] = useState(false);
  const [isEditDentistModalOpen, setIsEditDentistModalOpen] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleAddDentist = (dentist: Dentist) => {
    addDentist(dentist);
    setIsAddDentistModalOpen(false);
  };
  
  const handleEditDentist = (dentist: Dentist) => {
    setSelectedDentist(dentist);
    setIsEditDentistModalOpen(true);
  };
  
  const handleUpdateDentist = (dentist: Dentist) => {
    updateDentist(dentist);
    setIsEditDentistModalOpen(false);
    setSelectedDentist(null);
  };
  
  const handleDeleteDentist = (id: string) => {
    // Check if dentist has appointments
    const hasDentistAppointments = appointments.some(app => app.dentistId === id);
    
    if (hasDentistAppointments) {
      alert('Cannot delete dentist with existing appointments. Please reassign or delete the appointments first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this dentist? This action cannot be undone.')) {
      deleteDentist(id);
    }
  };
  
  const handleViewAppointments = (id: string) => {
    // In a real app, this would navigate to a filtered view of appointments for this dentist
    console.log(`View appointments for dentist ${id}`);
  };
  
  const filteredDentists = dentists.filter(dentist => 
    dentist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout title="Dentists">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dentists</h1>
          <p className="text-gray-500">Manage your dental professionals</p>
        </div>
        
        <Button
          onClick={() => setIsAddDentistModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Dentist
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search dentists by name, email, or specialization..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDentists.length > 0 ? (
          filteredDentists.map((dentist) => (
            <DentistCard
              key={dentist.id}
              dentist={dentist}
              onEdit={handleEditDentist}
              onDelete={handleDeleteDentist}
              onViewAppointments={handleViewAppointments}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No dentists found. Add a new dentist to get started.</p>
          </div>
        )}
      </div>
      
      {/* Add Dentist Modal */}
      <Modal
        isOpen={isAddDentistModalOpen}
        onClose={() => setIsAddDentistModalOpen(false)}
        title="Add New Dentist"
        size="lg"
      >
        <DentistForm
          onSubmit={handleAddDentist}
          onCancel={() => setIsAddDentistModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Dentist Modal */}
      <Modal
        isOpen={isEditDentistModalOpen}
        onClose={() => {
          setIsEditDentistModalOpen(false);
          setSelectedDentist(null);
        }}
        title="Edit Dentist"
        size="lg"
      >
        {selectedDentist && (
          <DentistForm
            dentist={selectedDentist}
            onSubmit={handleUpdateDentist}
            onCancel={() => {
              setIsEditDentistModalOpen(false);
              setSelectedDentist(null);
            }}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default DentistsPage;
