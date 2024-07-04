'use client';

import { SignedIn } from '@clerk/nextjs';
import React from 'react';
import SideNav from '../dashboard/(components)/SideNav';

const Layout = ({ children }) => {
  return (
    <SignedIn>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 md:fixed md:h-full">
          <SideNav />
        </div>
        <div className="flex-1 md:ml-64 p-3">
          {children}
        </div>
      </div>
    </SignedIn>
  );
};

export default Layout;
