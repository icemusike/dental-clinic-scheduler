import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../../types';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
  className?: string;
  view?: 'month' | 'week' | 'day';
  date?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  onSelectEvent,
  onSelectSlot,
  className = '',
  view = 'month',
  date = new Date(),
}) => {
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3182ce'; // default blue
    
    switch (event.status) {
      case 'confirmed':
        backgroundColor = '#38a169'; // green
        break;
      case 'cancelled':
        backgroundColor = '#e53e3e'; // red
        break;
      case 'completed':
        backgroundColor = '#718096'; // gray
        break;
      case 'no-show':
        backgroundColor = '#d69e2e'; // yellow
        break;
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block',
      },
    };
  };

  return (
    <div className={`h-full ${className}`}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', minHeight: '500px' }}
        onSelectEvent={(event) => onSelectEvent && onSelectEvent(event as CalendarEvent)}
        onSelectSlot={(slotInfo) => onSelectSlot && onSelectSlot(slotInfo)}
        selectable
        eventPropGetter={eventStyleGetter}
        view={view as View}
        date={date}
      />
    </div>
  );
};

export default Calendar;
