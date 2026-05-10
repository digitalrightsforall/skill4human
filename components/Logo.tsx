import React from 'react';

const Logo = ({ size = 32 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <rect width="32" height="32" rx="8" fill="#5E40E0"/>
    <path 
      d="M10 8V24M22 8V24" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    <path 
      d="M10 16C13 16 19 16 22 16" 
      stroke="#FDD400" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="2" fill="white" />
  </svg>
);

export default Logo;
