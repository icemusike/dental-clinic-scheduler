import { format, parse, addMinutes, isWithinInterval, areIntervalsOverlapping } from 'date-fns';
import { Appointment, CalendarEvent } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMMM d, yyyy');
};

export const formatTime = (timeString: string): string => {
  const date = parse(timeString, 'HH:mm', new Date());
  return format(date, 'h:mm a');
};

export const formatDateTime = (dateString: string, timeString: string): Date => {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(':').map(Number);
  date.setHours(hours, minutes);
  return date;
};

export const calculateEndTime = (startTime: string, durationMinutes: number): string => {
  const startDate = parse(startTime, 'HH:mm', new Date());
  const endDate = addMinutes(startDate, durationMinutes);
  return format(endDate, 'HH:mm');
};

export const appointmentToCalendarEvent = (appointment: Appointment): CalendarEvent => {
  const start = formatDateTime(appointment.date, appointment.startTime);
  const end = formatDateTime(appointment.date, appointment.endTime);
  
  return {
    id: appointment.id,
    title: `Appointment: ${appointment.type}`,
    start,
    end,
    patientId: appointment.patientId,
    dentistId: appointment.dentistId,
    status: appointment.status,
    type: appointment.type
  };
};

export const checkTimeSlotAvailable = (
  date: string,
  startTime: string,
  endTime: string,
  dentistId: string,
  existingAppointments: Appointment[],
  excludeAppointmentId?: string
): boolean => {
  const newStart = formatDateTime(date, startTime);
  const newEnd = formatDateTime(date, endTime);
  
  const dentistAppointments = existingAppointments.filter(
    app => app.dentistId === dentistId && app.date === date && app.id !== excludeAppointmentId
  );
  
  return !dentistAppointments.some(app => {
    const appStart = formatDateTime(app.date, app.startTime);
    const appEnd = formatDateTime(app.date, app.endTime);
    
    return areIntervalsOverlapping(
      { start: newStart, end: newEnd },
      { start: appStart, end: appEnd }
    );
  });
};

export const getAvailableTimeSlots = (
  date: string,
  dentistId: string,
  duration: number,
  existingAppointments: Appointment[]
): { startTime: string; endTime: string }[] => {
  // This is a simplified implementation
  // In a real app, you would check against dentist availability for the specific day
  const timeSlots: { startTime: string; endTime: string }[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endTime = calculateEndTime(startTime, duration);
      
      // Don't add slots that would end after business hours
      const endHourMinute = endTime.split(':').map(Number);
      if (endHourMinute[0] > endHour || (endHourMinute[0] === endHour && endHourMinute[1] > 0)) {
        continue;
      }
      
      if (checkTimeSlotAvailable(date, startTime, endTime, dentistId, existingAppointments)) {
        timeSlots.push({ startTime, endTime });
      }
    }
  }
  
  return timeSlots;
};
