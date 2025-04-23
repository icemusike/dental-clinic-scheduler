import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Appointment } from '../../types';
import { formatDate, formatTime, calculateEndTime } from '../../utils/dateUtils';

const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  dentistId: z.string().min(1, 'Dentist is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  type: z.enum(['checkup', 'cleaning', 'filling', 'extraction', 'root-canal', 'crown', 'other']),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show']),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  appointment?: Appointment;
  onSubmit: (data: Appointment) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSubmit,
  onCancel,
}) => {
  const { patients, dentists, treatments } = useAppContext();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointment || {
      patientId: '',
      dentistId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      type: 'checkup',
      status: 'scheduled',
      notes: '',
    },
  });
  
  const selectedType = watch('type');
  const selectedTreatment = treatments.find(t => t.name.toLowerCase().includes(selectedType));
  
  const onFormSubmit = (data: AppointmentFormData) => {
    const endTime = calculateEndTime(
      data.startTime,
      selectedTreatment?.duration || 30
    );
    
    onSubmit({
      id: appointment?.id || `appointment-${Date.now()}`,
      ...data,
      endTime,
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="patientId"
          control={control}
          render={({ field }) => (
            <Select
              label="Patient"
              options={patients.map(p => ({ value: p.id, label: p.name }))}
              error={errors.patientId?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="dentistId"
          control={control}
          render={({ field }) => (
            <Select
              label="Dentist"
              options={dentists.map(d => ({ value: d.id, label: d.name }))}
              error={errors.dentistId?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Input
              type="date"
              label="Date"
              error={errors.date?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <Input
              type="time"
              label="Start Time"
              error={errors.startTime?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Appointment Type"
              options={[
                { value: 'checkup', label: 'Regular Checkup' },
                { value: 'cleaning', label: 'Teeth Cleaning' },
                { value: 'filling', label: 'Cavity Filling' },
                { value: 'extraction', label: 'Tooth Extraction' },
                { value: 'root-canal', label: 'Root Canal' },
                { value: 'crown', label: 'Crown Placement' },
                { value: 'other', label: 'Other' },
              ]}
              error={errors.type?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label="Status"
              options={[
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'no-show', label: 'No Show' },
              ]}
              error={errors.status?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Notes"
            rows={3}
            error={errors.notes?.message}
            {...field}
          />
        )}
      />
      
      {selectedTreatment && (
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Treatment Info:</span> {selectedTreatment.name} - 
            Duration: {selectedTreatment.duration} minutes, 
            Cost: ${selectedTreatment.cost}
          </p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {appointment ? 'Update Appointment' : 'Create Appointment'}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
