import React from 'react';

export default function Unlock(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <rect width={12} height={10} x={6} y={10} stroke="currentColor" strokeWidth="1.5" rx={2} />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10V6a3 3 0 1 1 6 0v.5" />
    </svg>
  );
}
