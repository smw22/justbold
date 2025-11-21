import React from 'react';
import type { SVGProps } from 'react';

export default function MailOut(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5 9 4.5 3L14 9" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M17 19H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v2" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14h6m0 0-3-3m3 3-3 3" />
    </svg>
  );
}
