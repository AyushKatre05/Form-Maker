'use client';

import { SignedIn } from '@clerk/nextjs';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <SignedIn>
      <div className="flex flex-col md:flex-row">
          {children}
        </div>
    </SignedIn>
  );
};

export default Layout;
