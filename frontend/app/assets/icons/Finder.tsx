import React from 'react';
import type { SVGProps } from 'react';

export default function Finder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <rect width={18} height={18} x={3} y={3} stroke="currentColor" strokeWidth="1.5" rx={4} />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 8v1m8-1v1" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m11 10-.78 2.342a.5.5 0 0 0 .474.658H13" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 16s1.6 1 4 1 4-1 4-1" />
    </svg>
  );
}
