import React from 'react';
import type { SVGProps } from 'react';

export default function Filter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M7 12h10m-7 5h4" />
    </svg>
  );
}
