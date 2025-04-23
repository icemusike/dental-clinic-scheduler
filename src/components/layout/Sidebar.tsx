import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  UserCircle, 
  Settings, 
  BarChart3, 
  Home,
  Stethoscope,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'dentist', 'receptionist'] },
    { name: 'Calendar', href: '/calendar', icon: Calendar, roles: ['admin', 'dentist', 'receptionist'] },
    { name: 'Patients', href: '/patients', icon: Users, roles: ['admin', 'dentist', 'receptionist'] },
    { name: 'Dentists', href: '/dentists', icon: Stethoscope, roles: ['admin', 'receptionist'] },
    { name: 'Appointments', href: '/appointments', icon: ClipboardList, roles: ['admin', 'dentist', 'receptionist'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['admin'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
  ];
  
  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );
  
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-600 rounded-md">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">DentalSchedule</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon
                  className={`
                    mr-3 flex-shrink-0 h-5 w-5
                    ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <UserCircle className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
            <p className="text-xs font-medium text-gray-500 capitalize">{user?.role || 'Role'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
