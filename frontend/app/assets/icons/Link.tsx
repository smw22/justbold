import React from 'react';
import type { SVGProps } from 'react';

export default function Link(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="#212529" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13.56 7.404 1.415-1.415a3 3 0 1 1 4.243 4.243l-2.829 2.829a4 4 0 0 1-5.657 0l-.202-.203" />
      <path stroke="#212529" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.47 11.142-.203-.202a4 4 0 0 0-5.656 0l-2.829 2.828a3 3 0 1 0 4.243 4.243l1.414-1.414" />
    </svg>
  );
}
