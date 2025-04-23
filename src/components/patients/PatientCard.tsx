import React from 'react';
import { Mail, Phone, Calendar, MapPin, FileText, CreditCard } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Patient } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  onViewAppointments: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
  onDelete,
  onViewAppointments,
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">{patient.email}</p>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">{patient.phone}</p>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">DOB: {formatDate(patient.dateOfBirth)}</p>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">{patient.address}</p>
          </div>
          
          {(patient.insuranceProvider || patient.insuranceNumber) && (
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm text-gray-600">
                {patient.insuranceProvider} {patient.insuranceNumber ? `(#${patient.insuranceNumber})` : ''}
              </p>
            </div>
          )}
          
          {patient.notes && (
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <p className="text-sm text-gray-600">{patient.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex justify-between w-full">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewAppointments(patient.id)}
          >
            View Appointments
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(patient)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(patient.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
