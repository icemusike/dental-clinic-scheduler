import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, patients, dentists } = useAppContext();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter appointments for today
  const todayAppointments = appointments.filter(app => app.date === today);
  
  // Count appointments by status
  const appointmentCounts = {
    total: appointments.length,
    scheduled: appointments.filter(app => app.status === 'scheduled').length,
    confirmed: appointments.filter(app => app.status === 'confirmed').length,
    completed: appointments.filter(app => app.status === 'completed').length,
    cancelled: appointments.filter(app => app.status === 'cancelled').length,
    noShow: appointments.filter(app => app.status === 'no-show').length,
  };
  
  // Sort today's appointments by start time
  const sortedTodayAppointments = [...todayAppointments].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
  
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-md">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-semibold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-md">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-semibold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-md">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(app => app.date > today && app.status !== 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-md">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Dentists Available Today</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dentists.filter(d => 
                    d.availability.some(a => {
                      const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                      return a.day === dayOfWeek;
                    })
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Today's Schedule</h3>
              <p className="mt-1 text-sm text-gray-500">{formatDate(today)}</p>
            </div>
            <CardContent className="p-0">
              {sortedTodayAppointments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {sortedTodayAppointments.map((appointment) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    const dentist = dentists.find(d => d.id === appointment.dentistId);
                    
                    let statusIcon;
                    let statusColor;
                    
                    switch (appointment.status) {
                      case 'confirmed':
                        statusIcon = <CheckCircle className="h-5 w-5 text-green-500" />;
                        statusColor = 'text-green-500';
                        break;
                      case 'cancelled':
                        statusIcon = <XCircle className="h-5 w-5 text-red-500" />;
                        statusColor = 'text-red-500';
                        break;
                      case 'no-show':
                        statusIcon = <AlertCircle className="h-5 w-5 text-yellow-500" />;
                        statusColor = 'text-yellow-500';
                        break;
                      default:
                        statusIcon = <Clock className="h-5 w-5 text-blue-500" />;
                        statusColor = 'text-blue-500';
                        break;
                    }
                    
                    return (
                      <li key={appointment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {statusIcon}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.startTime} - {appointment.endTime}
                              </div>
                              <div className="text-sm text-gray-500">
                                {patient?.name || 'Unknown Patient'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace('-', ' ')}
                              </div>
                              <div className="text-sm text-gray-500">
                                {dentist?.name || 'Unknown Dentist'}
                              </div>
                            </div>
                            <div className={`ml-2 flex-shrink-0 ${statusColor}`}>
                              <span className="text-xs font-medium">
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments scheduled for today</p>
                </div>
              )}
              
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                <Button
                  onClick={() => navigate('/calendar')}
                  className="w-full"
                >
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Appointment Statistics</h3>
              <p className="mt-1 text-sm text-gray-500">Overview of all appointments</p>
            </div>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-sm font-medium">{appointmentCounts.total}</span>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Scheduled</span>
                    <span className="text-sm font-medium">{appointmentCounts.scheduled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(appointmentCounts.scheduled / appointmentCounts.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Confirmed</span>
                    <span className="text-sm font-medium">{appointmentCounts.confirmed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(appointmentCounts.confirmed / appointmentCounts.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="text-sm font-medium">{appointmentCounts.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{ width: `${(appointmentCounts.completed / appointmentCounts.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Cancelled</span>
                    <span className="text-sm font-medium">{appointmentCounts.cancelled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(appointmentCounts.cancelled / appointmentCounts.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">No Show</span>
                    <span className="text-sm font-medium">{appointmentCounts.noShow}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(appointmentCounts.noShow / appointmentCounts.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  onClick={() => navigate('/reports')}
                  variant="outline"
                  className="w-full"
                >
                  View Detailed Reports
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/appointments/new')}
                  className="w-full"
                >
                  New Appointment
                </Button>
                <Button
                  onClick={() => navigate('/patients/new')}
                  variant="outline"
                  className="w-full"
                >
                  Add Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
