import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Dentist } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

const availabilitySchema = z.object({
  day: z.string().min(1, 'Day is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

const dentistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  availability: z.array(availabilitySchema).min(1, 'At least one availability slot is required'),
});

type DentistFormData = z.infer<typeof dentistSchema>;

interface DentistFormProps {
  dentist?: Dentist;
  onSubmit: (data: Dentist) => void;
  onCancel: () => void;
}

const DentistForm: React.FC<DentistFormProps> = ({
  dentist,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DentistFormData>({
    resolver: zodResolver(dentistSchema),
    defaultValues: dentist || {
      name: '',
      email: '',
      phone: '',
      specialization: '',
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      ],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availability',
  });
  
  const onFormSubmit = (data: DentistFormData) => {
    onSubmit({
      id: dentist?.id || `dentist-${Date.now()}`,
      ...data,
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Full Name"
              error={errors.name?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="Email Address"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              label="Phone Number"
              error={errors.phone?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="specialization"
          control={control}
          render={({ field }) => (
            <Select
              label="Specialization"
              options={[
                { value: 'General Dentistry', label: 'General Dentistry' },
                { value: 'Orthodontics', label: 'Orthodontics' },
                { value: 'Pediatric Dentistry', label: 'Pediatric Dentistry' },
                { value: 'Endodontics', label: 'Endodontics' },
                { value: 'Periodontics', label: 'Periodontics' },
                { value: 'Prosthodontics', label: 'Prosthodontics' },
                { value: 'Oral Surgery', label: 'Oral Surgery' },
              ]}
              error={errors.specialization?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium text-gray-900">Availability</h3>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ day: 'Monday', startTime: '09:00', endTime: '17:00' })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Slot
          </Button>
        </div>
        
        {errors.availability?.message && (
          <p className="text-sm text-red-600">{errors.availability.message}</p>
        )}
        
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">Availability Slot {index + 1}</h4>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name={`availability.${index}.day`}
                control={control}
                render={({ field }) => (
                  <Select
                    label="Day"
                    options={[
                      { value: 'Monday', label: 'Monday' },
                      { value: 'Tuesday', label: 'Tuesday' },
                      { value: 'Wednesday', label: 'Wednesday' },
                      { value: 'Thursday', label: 'Thursday' },
                      { value: 'Friday', label: 'Friday' },
                      { value: 'Saturday', label: 'Saturday' },
                      { value: 'Sunday', label: 'Sunday' },
                    ]}
                    error={errors.availability?.[index]?.day?.message}
                    {...field}
                  />
                )}
              />
              
              <Controller
                name={`availability.${index}.startTime`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="time"
                    label="Start Time"
                    error={errors.availability?.[index]?.startTime?.message}
                    {...field}
                  />
                )}
              />
              
              <Controller
                name={`availability.${index}.endTime`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="time"
                    label="End Time"
                    error={errors.availability?.[index]?.endTime?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
      
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
          {dentist ? 'Update Dentist' : 'Add Dentist'}
        </Button>
      </div>
    </form>
  );
};

export default DentistForm;
