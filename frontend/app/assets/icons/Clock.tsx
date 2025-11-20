import React from 'react';

export default function Clock(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} r={8} stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7.5V12l4 2" />
    </svg>
  );
}
