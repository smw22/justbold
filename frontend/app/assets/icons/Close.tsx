import React from 'react';
import type { SVGProps } from 'react';

export default function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 7 10 10M7 17 17 7" />
    </svg>
  );
}
