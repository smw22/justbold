import React from 'react';
import type { SVGProps } from 'react';

export default function UserCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M7 18v-1a5 5 0 0 1 10 0v1" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
