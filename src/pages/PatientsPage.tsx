import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PatientForm from '../components/patients/PatientForm';
import PatientCard from '../components/patients/PatientCard';
import { useAppContext } from '../context/AppContext';
import { Patient } from '../types';
import { Plus, Search } from 'lucide-react';

const PatientsPage: React.FC = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useAppContext();
  
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleAddPatient = (patient: Patient) => {
    addPatient(patient);
    setIsAddPatientModalOpen(false);
  };
  
  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditPatientModalOpen(true);
  };
  
  const handleUpdatePatient = (patient: Patient) => {
    updatePatient(patient);
    setIsEditPatientModalOpen(false);
    setSelectedPatient(null);
  };
  
  const handleDeletePatient = (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      deletePatient(id);
    }
  };
  
  const handleViewAppointments = (id: string) => {
    // In a real app, this would navigate to a filtered view of appointments for this patient
    console.log(`View appointments for patient ${id}`);
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );
  
  return (
    <Layout title="Patients">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500">Manage your patient records</p>
        </div>
        
        <Button
          onClick={() => setIsAddPatientModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Patient
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients by name, email, or phone..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
              onViewAppointments={handleViewAppointments}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No patients found. Add a new patient to get started.</p>
          </div>
        )}
      </div>
      
      {/* Add Patient Modal */}
      <Modal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        title="Add New Patient"
        size="lg"
      >
        <PatientForm
          onSubmit={handleAddPatient}
          onCancel={() => setIsAddPatientModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Patient Modal */}
      <Modal
        isOpen={isEditPatientModalOpen}
        onClose={() => {
          setIsEditPatientModalOpen(false);
          setSelectedPatient(null);
        }}
        title="Edit Patient"
        size="lg"
      >
        {selectedPatient && (
          <PatientForm
            patient={selectedPatient}
            onSubmit={handleUpdatePatient}
            onCancel={() => {
              setIsEditPatientModalOpen(false);
              setSelectedPatient(null);
            }}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default PatientsPage;
