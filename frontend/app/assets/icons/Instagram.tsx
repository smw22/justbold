import React from 'react';
import type { SVGProps } from 'react';

export default function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path stroke="currentColor" strokeWidth="1.5" d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m17.5 6.51.01-.011" />
    </svg>
  );
}
