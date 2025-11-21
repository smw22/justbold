import React from 'react';
import type { SVGProps } from 'react';

export default function Percentage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm12-4L5 19" />
    </svg>
  );
}
