import React from 'react';
import type { SVGProps } from 'react';

export default function ArrowEmailForward(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M22 10H8c-8 0-8 11 0 11m14-11-7-7m7 7-7 7" />
    </svg>
  );
}
