import React from 'react';

export default function CircleArrowRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} r={8} stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13 9 3 3m-3 3 3-3m0 0H8" />
    </svg>
  );
}
