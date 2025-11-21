import React from 'react';
import type { SVGProps } from 'react';

export default function Trash2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" d="M7 8h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Zm2-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1H9V7Z" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M5 8h14" />
    </svg>
  );
}
