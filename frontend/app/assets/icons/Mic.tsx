import React from 'react';

export default function Mic(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <rect width={6} height={12} x={9} y={2} stroke="currentColor" strokeWidth="1.5" rx={3} />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10v1a7 7 0 1 0 14 0v-1m-7 8v4m0 0H9m3 0h3" />
    </svg>
  );
}
