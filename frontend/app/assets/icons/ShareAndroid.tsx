import React from 'react';
import type { SVGProps } from 'react';

export default function ShareAndroid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path stroke="currentColor" strokeWidth="1.5" d="m15.5 6.5-7 4m0 3 7 4" />
    </svg>
  );
}
