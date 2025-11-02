import React from 'react';

export const MicrowaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="7" width="18" height="12" rx="2" ry="2"></rect>
    <rect x="15" y="11" width="4" height="4" rx="1"></rect>
    <line x1="7" y1="12" x2="11" y2="12"></line>
    <line x1="7" y1="15" x2="9" y2="15"></line>
  </svg>
);
