import React from 'react';
import type { SVGProps } from 'react';

export default function PinAlt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1 1 16 0Z" />
      <path fill="#131927" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}
