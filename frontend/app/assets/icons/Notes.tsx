import React from 'react';
import type { SVGProps } from 'react';

export default function Notes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
      <path stroke="currentColor" strokeWidth="1.5" d="M11 20a4.83 4.83 0 0 0 3.414-1.414l4.172-4.172A4.828 4.828 0 0 0 20 11" />
    </svg>
  );
}
