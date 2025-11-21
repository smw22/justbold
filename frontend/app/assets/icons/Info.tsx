import React from 'react';
import type { SVGProps } from 'react';

export default function Info(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M12 9v.001M12 12v4" />
    </svg>
  );
}
