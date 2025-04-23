import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';
import Tabs from '../components/ui/Tabs';
import { Save, Building, Clock, Bell, Shield, CreditCard } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const tabs = [
    {
      id: 'clinic',
      label: 'Clinic Information',
      content: (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Clinic Details</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4">
              <Input
                label="Clinic Name"
                defaultValue="Smile Dental Clinic"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  defaultValue="contact@smiledentalclinic.com"
                />
                
                <Input
                  label="Phone Number"
                  defaultValue="(555) 123-4567"
                />
              </div>
              
              <Input
                label="Address"
                defaultValue="123 Main Street, Suite 200, Anytown, CA 94321"
              />
              
              <TextArea
                label="Description"
                rows={3}
                defaultValue="Smile Dental Clinic provides comprehensive dental care for the whole family. Our team of experienced dentists and staff are dedicated to providing the highest quality dental care in a comfortable and friendly environment."
              />
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'schedule',
      label: 'Schedule Settings',
      content: (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4">
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-28">
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                    </div>
                    
                    <Select
                      options={[
                        { value: 'open', label: 'Open' },
                        { value: 'closed', label: 'Closed' },
                      ]}
                      defaultValue={day === 'Sunday' ? 'closed' : 'open'}
                      className="w-24"
                    />
                    
                    {day !== 'Sunday' && (
                      <>
                        <Input
                          type="time"
                          defaultValue="09:00"
                          className="w-32"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          defaultValue={day === 'Saturday' ? '13:00' : '17:00'}
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Appointment Settings</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Default Appointment Duration"
                    options={[
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '45', label: '45 minutes' },
                      { value: '60', label: '60 minutes' },
                    ]}
                    defaultValue="30"
                  />
                  
                  <Select
                    label="Minimum Notice for Booking"
                    options={[
                      { value: '0', label: 'No minimum' },
                      { value: '1', label: '1 hour' },
                      { value: '2', label: '2 hours' },
                      { value: '4', label: '4 hours' },
                      { value: '24', label: '24 hours' },
                    ]}
                    defaultValue="2"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Appointment Reminders</h4>
                    <p className="text-sm text-gray-500">Send reminders to patients before their appointments</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="appointment-reminders"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="appointment-reminders" className="ml-2 text-sm text-gray-900">
                      Enabled
                    </label>
                  </div>
                </div>
                
                <div className="pl-6 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reminder-email"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="reminder-email" className="ml-2 text-sm text-gray-900">
                      Email
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reminder-sms"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="reminder-sms" className="ml-2 text-sm text-gray-900">
                      SMS
                    </label>
                  </div>
                  
                  <Select
                    label="Reminder Time"
                    options={[
                      { value: '1', label: '1 hour before' },
                      { value: '2', label: '2 hours before' },
                      { value: '4', label: '4 hours before' },
                      { value: '24', label: '24 hours before' },
                      { value: '48', label: '48 hours before' },
                    ]}
                    defaultValue="24"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Appointment Confirmations</h4>
                    <p className="text-sm text-gray-500">Send confirmation emails when appointments are booked or modified</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="appointment-confirmations"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="appointment-confirmations" className="ml-2 text-sm text-gray-900">
                      Enabled
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Cancellation Notifications</h4>
                    <p className="text-sm text-gray-500">Send notifications when appointments are cancelled</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cancellation-notifications"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="cancellation-notifications" className="ml-2 text-sm text-gray-900">
                      Enabled
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="two-factor"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="two-factor" className="ml-2 text-sm text-gray-900">
                      Enabled
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                    <p className="text-sm text-gray-500">Automatically log out after a period of inactivity</p>
                  </div>
                  <Select
                    options={[
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '60', label: '1 hour' },
                      { value: '120', label: '2 hours' },
                      { value: '0', label: 'Never' },
                    ]}
                    defaultValue="30"
                    className="w-40"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
                
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'billing',
      label: 'Billing',
      content: (
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Billing Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Current Plan</h4>
                    <p className="text-sm text-gray-500">Your current subscription plan</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Professional
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Billing Cycle</h4>
                    <p className="text-sm text-gray-500">Your billing frequency</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Monthly
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Next Billing Date</h4>
                    <p className="text-sm text-gray-500">Your next payment date</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    June 15, 2023
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Payment Method</h4>
                
                <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-md border border-gray-200">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Billing History</h4>
                
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          May 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $49.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Download
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          April 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          $49.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900">
                            Download
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ),
    },
  ];
  
  return (
    <Layout title="Settings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your clinic settings and preferences</p>
      </div>
      
      <Tabs tabs={tabs} defaultTabId="clinic" />
    </Layout>
  );
};

export default SettingsPage;
