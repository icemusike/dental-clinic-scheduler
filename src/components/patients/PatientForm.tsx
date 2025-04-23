import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Patient } from '../../types';

const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  notes: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: Patient) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient || {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      insuranceProvider: '',
      insuranceNumber: '',
      notes: '',
    },
  });
  
  const onFormSubmit = (data: PatientFormData) => {
    onSubmit({
      id: patient?.id || `patient-${Date.now()}`,
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
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <Input
              type="date"
              label="Date of Birth"
              error={errors.dateOfBirth?.message}
              {...field}
            />
          )}
        />
      </div>
      
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input
            label="Address"
            error={errors.address?.message}
            {...field}
          />
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="insuranceProvider"
          control={control}
          render={({ field }) => (
            <Input
              label="Insurance Provider"
              error={errors.insuranceProvider?.message}
              {...field}
            />
          )}
        />
        
        <Controller
          name="insuranceNumber"
          control={control}
          render={({ field }) => (
            <Input
              label="Insurance Number"
              error={errors.insuranceNumber?.message}
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
            label="Medical Notes"
            rows={3}
            error={errors.notes?.message}
            {...field}
          />
        )}
      />
      
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
          {patient ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
