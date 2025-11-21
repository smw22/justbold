import React from 'react';
import type { SVGProps } from 'react';

export default function CircleCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2a9.981 9.981 0 0 1 7.807 3.75A9.958 9.958 0 0 1 22 12Z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8 12 3 3 5-5" />
    </svg>
  );
}
