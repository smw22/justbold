import React from 'react';

export default function Calendar(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <rect width={16} height={13} x={4} y={7} stroke="currentColor" strokeWidth="1.5" rx={2} />
      <path stroke="currentColor" strokeWidth="1.5" d="M4 11h16" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9 4v3m6-3v3" />
    </svg>
  );
}
