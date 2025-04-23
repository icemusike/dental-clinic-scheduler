import React from 'react';
import { Clock, Calendar as CalendarIcon, User, Stethoscope, FileText } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Appointment } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onDelete,
}) => {
  const { getPatientById, getDentistById } = useAppContext();
  
  const patient = getPatientById(appointment.patientId);
  const dentist = getDentistById(appointment.dentistId);
  
  const getStatusBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'confirmed': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'warning';
      default: return 'default';
    }
  };
  
  const getTypeBadgeVariant = (type: Appointment['type']) => {
    switch (type) {
      case 'checkup': return 'default';
      case 'cleaning': return 'primary';
      case 'filling': return 'secondary';
      case 'extraction': return 'warning';
      case 'root-canal': return 'danger';
      case 'crown': return 'success';
      case 'other': return 'default';
      default: return 'default';
    }
  };
  
  return (
    <Card className="h-full">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace('-', ' ')}
            </h3>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">
                {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
              </span>
            </div>
          </div>
          <Badge variant={getStatusBadgeVariant(appointment.status)}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">{patient?.name || 'Unknown Patient'}</p>
              <p className="text-xs text-gray-500">{patient?.phone || 'No phone'}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Stethoscope className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">{dentist?.name || 'Unknown Dentist'}</p>
              <p className="text-xs text-gray-500">{dentist?.specialization || 'General Dentistry'}</p>
            </div>
          </div>
          
          {appointment.notes && (
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <p className="text-sm text-gray-600">{appointment.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex justify-between w-full">
          <Badge variant={getTypeBadgeVariant(appointment.type)}>
            {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace('-', ' ')}
          </Badge>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(appointment)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(appointment.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
