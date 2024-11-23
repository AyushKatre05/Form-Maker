"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import ThemeToggleButton from './ThemeToggleButton'

const Header = () => {
  const { user, isSignedIn } = useUser()
  const path = usePathname()

  return (
    !path.includes('aiform') && (
      <header className="p-4 bg-blue-600 text-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={120}
              height={50}
              className="cursor-pointer"
            />
          </Link>

          {/* Navigation */}
          {isSignedIn ? (
            <nav className="flex items-center gap-6">
              <div className="flex items-center gap-5">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/responses">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Responses
                  </Button>
                </Link>
                {/* Theme Toggle */}
                <ThemeToggleButton />
              </div>
              {/* User Profile */}
              <UserButton />
            </nav>
          ) : (
            <SignInButton>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600">
                Get Started
              </Button>
            </SignInButton>
          )}
        </div>
      </header>
    )
  )
}

export default Header
