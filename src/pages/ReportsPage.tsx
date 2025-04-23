import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { BarChart3, PieChart, TrendingUp, Calendar, Users, Stethoscope } from 'lucide-react';
import Tabs from '../components/ui/Tabs';

const ReportsPage: React.FC = () => {
  const { appointments, patients, dentists } = useAppContext();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Count appointments by status
  const appointmentsByStatus = {
    scheduled: appointments.filter(app => app.status === 'scheduled').length,
    confirmed: appointments.filter(app => app.status === 'confirmed').length,
    completed: appointments.filter(app => app.status === 'completed').length,
    cancelled: appointments.filter(app => app.status === 'cancelled').length,
    noShow: appointments.filter(app => app.status === 'no-show').length,
  };
  
  // Count appointments by type
  const appointmentsByType = {
    checkup: appointments.filter(app => app.type === 'checkup').length,
    cleaning: appointments.filter(app => app.type === 'cleaning').length,
    filling: appointments.filter(app => app.type === 'filling').length,
    extraction: appointments.filter(app => app.type === 'extraction').length,
    rootCanal: appointments.filter(app => app.type === 'root-canal').length,
    crown: appointments.filter(app => app.type === 'crown').length,
    other: appointments.filter(app => app.type === 'other').length,
  };
  
  // Count appointments by dentist
  const appointmentsByDentist = dentists.map(dentist => ({
    dentistName: dentist.name,
    count: appointments.filter(app => app.dentistId === dentist.id).length,
  }));
  
  // Sort dentists by appointment count
  const sortedDentistsByAppointments = [...appointmentsByDentist].sort((a, b) => b.count - a.count);
  
  // Calculate completion rate
  const completionRate = appointments.length > 0
    ? (appointmentsByStatus.completed / appointments.length) * 100
    : 0;
  
  // Calculate cancellation rate
  const cancellationRate = appointments.length > 0
    ? ((appointmentsByStatus.cancelled + appointmentsByStatus.noShow) / appointments.length) * 100
    : 0;
  
  // Get upcoming appointments
  const upcomingAppointments = appointments.filter(app => app.date > today && app.status !== 'cancelled').length;
  
  // Get appointments for today
  const todayAppointments = appointments.filter(app => app.date === today).length;
  
  // Get appointments for this month
  const thisMonth = today.substring(0, 7); // YYYY-MM
  const thisMonthAppointments = appointments.filter(app => app.date.startsWith(thisMonth)).length;
  
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Appointment Status</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Scheduled</span>
                    <span className="text-sm font-medium">{appointmentsByStatus.scheduled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByStatus.scheduled / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Confirmed</span>
                    <span className="text-sm font-medium">{appointmentsByStatus.confirmed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByStatus.confirmed / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="text-sm font-medium">{appointmentsByStatus.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByStatus.completed / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Cancelled</span>
                    <span className="text-sm font-medium">{appointmentsByStatus.cancelled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByStatus.cancelled / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">No Show</span>
                    <span className="text-sm font-medium">{appointmentsByStatus.noShow}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByStatus.noShow / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Appointment Types</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Checkup</span>
                    <span className="text-sm font-medium">{appointmentsByType.checkup}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByType.checkup / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Cleaning</span>
                    <span className="text-sm font-medium">{appointmentsByType.cleaning}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByType.cleaning / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Filling</span>
                    <span className="text-sm font-medium">{appointmentsByType.filling}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByType.filling / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Extraction</span>
                    <span className="text-sm font-medium">{appointmentsByType.extraction}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByType.extraction / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Root Canal</span>
                    <span className="text-sm font-medium">{appointmentsByType.rootCanal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(appointmentsByType.rootCanal / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Key Metrics</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                    <p className="text-xl font-semibold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-md">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{completionRate.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-md">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Cancellation Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{cancellationRate.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Patients</p>
                    <p className="text-xl font-semibold text-gray-900">{patients.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Appointments by Dentist</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {sortedDentistsByAppointments.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">{item.dentistName}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.count / appointments.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Schedule</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                    <p className="text-xl font-semibold text-gray-900">{todayAppointments}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-md">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">This Month</p>
                    <p className="text-xl font-semibold text-gray-900">{thisMonthAppointments}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-md">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                    <p className="text-xl font-semibold text-gray-900">{upcomingAppointments}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'appointments',
      label: 'Appointments',
      content: (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Appointment Trends</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center py-12">
                <BarChart3 className="h-24 w-24 text-gray-300 mx-auto" />
                <p className="mt-4 text-gray-500">Appointment trend visualization would appear here in a real application.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Appointment Distribution</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center py-12">
                <PieChart className="h-24 w-24 text-gray-300 mx-auto" />
                <p className="mt-4 text-gray-500">Appointment distribution visualization would appear here in a real application.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'patients',
      label: 'Patients',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Patient Demographics</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center py-12">
                <PieChart className="h-24 w-24 text-gray-300 mx-auto" />
                <p className="mt-4 text-gray-500">Patient demographics visualization would appear here in a real application.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Patient Growth</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center py-12">
                <TrendingUp className="h-24 w-24 text-gray-300 mx-auto" />
                <p className="mt-4 text-gray-500">Patient growth visualization would appear here in a real application.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'dentists',
      label: 'Dentists',
      content: (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Dentist Performance</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {sortedDentistsByAppointments.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">{item.dentistName}</span>
                      <span className="text-sm font-medium">{item.count} appointments</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.count / appointments.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium text-gray-900">Dentist Specializations</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center py-12">
                <Stethoscope className="h-24 w-24 text-gray-300 mx-auto" />
                <p className="mt-4 text-gray-500">Dentist specialization visualization would appear here in a real application.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];
  
  return (
    <Layout title="Reports">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500">View detailed reports and analytics about your dental practice</p>
      </div>
      
      <Tabs tabs={tabs} defaultTabId="overview" />
    </Layout>
  );
};

export default ReportsPage;
