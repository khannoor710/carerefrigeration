import React from 'react';

export const RoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3-2-3s-2 1-2 3-2 4-4 4-4-2-4-4 1-3 2-3c1 0 2 1 2 3" />
    <path d="M12 15V6.5A2.5 2.5 0 0 1 14.5 4h0A2.5 2.5 0 0 1 17 6.5V10" />
    <path d="M12 6.5A2.5 2.5 0 0 0 9.5 4h0A2.5 2.5 0 0 0 7 6.5V10" />
    <path d="M14 10h-4" />
    <path d="M10 2h4" />
  </svg>
);
