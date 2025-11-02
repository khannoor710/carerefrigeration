import React from 'react';

export const GeyserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M9 2v6" />
    <path d="M15 2v6" />
    <path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
    <path d="M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  </svg>
);
