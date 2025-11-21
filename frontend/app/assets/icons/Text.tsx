import React from 'react';
import type { SVGProps } from 'react';

export default function Text(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7V5H5v2m7-2v14m0 0h-2m2 0h2" />
    </svg>
  );
}
