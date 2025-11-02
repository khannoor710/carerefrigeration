import React from 'react';
import { HomeIcon } from './icons/HomeIcon';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <a href="#home" className={`flex items-center space-x-3 ${className}`}>
      <span className="bg-brand-primary p-2 rounded-md flex-shrink-0">
        <HomeIcon className="h-6 w-6 text-white" />
      </span>
      <span className="text-2xl font-bold">Care Refrigeration</span>
    </a>
  );
};

export default Logo;
