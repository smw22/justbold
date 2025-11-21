import React from 'react';
import type { SVGProps } from 'react';

export default function Drag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx={9} cy={6} r={1} fill="#212529" stroke="#212529" />
      <circle cx={9} cy={12} r={1} fill="#212529" stroke="#212529" />
      <circle cx={9} cy={18} r={1} fill="#212529" stroke="#212529" />
      <circle cx={15} cy={6} r={1} fill="#212529" stroke="#212529" />
      <circle cx={15} cy={12} r={1} fill="#212529" stroke="#212529" />
      <circle cx={15} cy={18} r={1} fill="#212529" stroke="#212529" />
    </svg>
  );
}
