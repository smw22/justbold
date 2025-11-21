import React from 'react';
import type { SVGProps } from 'react';

export default function Stats(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2 15 4-4 3 8 6-14 3 10 4-4" />
    </svg>
  );
}
