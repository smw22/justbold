import React from 'react';
import type { SVGProps } from 'react';

export default function MoreVert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path fill="#131927" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm0 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm0-12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </svg>
  );
}
