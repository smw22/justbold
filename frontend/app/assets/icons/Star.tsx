import React from 'react';

export default function Star(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="#212529" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.072 4.31c.336-.836 1.52-.836 1.856 0l1.424 3.548a1 1 0 0 0 .86.625l3.814.258c.9.061 1.265 1.188.574 1.766l-2.934 2.45a1 1 0 0 0-.328 1.011l.932 3.707c.22.874-.738 1.57-1.501 1.091l-3.237-2.032a1 1 0 0 0-1.064 0l-3.237 2.032c-.763.48-1.721-.217-1.501-1.09l.932-3.707a1 1 0 0 0-.328-1.012L4.4 10.507c-.691-.578-.325-1.705.574-1.766l3.813-.258a1 1 0 0 0 .86-.625l1.425-3.547Z" />
    </svg>
  );
}
