"use client"
import { SignedIn } from '@clerk/nextjs'
import React from 'react'

const DashboardLayout = ({children}) => {
  return (
    <SignedIn>
    <div>
    <div>
    {children}
    </div>
    </div>
    </SignedIn>
  )
}

export default DashboardLayout