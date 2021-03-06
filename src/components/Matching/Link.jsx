import React from 'react';

const Link = ({ url, children }) => (
  <a
    className="msg-link text-light"
    href={url}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

export default Link;
