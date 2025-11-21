import React from 'react';
import type { SVGProps } from 'react';

export default function Community(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 18v-1a5 5 0 0 1 10 0v1M1 18v-1a3 3 0 0 1 3-3m19 4v-1a3 3 0 0 0-3-3" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}
