import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  className = '',
}) => {
  const baseClasses = 'p-4 rounded-md flex items-start';
  
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
  };
  
  const iconMap = {
    info: <Info className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />,
    success: <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />,
    error: <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />,
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={classes}>
      {iconMap[variant]}
      <div>{children}</div>
    </div>
  );
};

export default Alert;
