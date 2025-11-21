import React from 'react';
import type { SVGProps } from 'react';

export default function Italic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5h3m3 0h-3m0 0-4 14m0 0H7m3 0h3" />
    </svg>
  );
}
