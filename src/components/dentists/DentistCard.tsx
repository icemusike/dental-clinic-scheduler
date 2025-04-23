import React from 'react';
import { Mail, Phone, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Dentist } from '../../types';

interface DentistCardProps {
  dentist: Dentist;
  onEdit: (dentist: Dentist) => void;
  onDelete: (id: string) => void;
  onViewAppointments: (id: string) => void;
}

const DentistCard: React.FC<DentistCardProps> = ({
  dentist,
  onEdit,
  onDelete,
  onViewAppointments,
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{dentist.name}</h3>
            <Badge variant="primary" className="mt-1">
              {dentist.specialization}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">{dentist.email}</p>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">{dentist.phone}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
            <div className="space-y-2">
              {dentist.availability.map((slot, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="font-medium w-24">{slot.day}:</span>
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{slot.startTime} - {slot.endTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex justify-between w-full">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewAppointments(dentist.id)}
          >
            View Schedule
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(dentist)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(dentist.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DentistCard;
