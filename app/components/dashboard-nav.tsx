// app/components/dashboard-nav.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import LogoutButton from '@/app/components/logout-button'

export default function DashboardNav({ user }: { user: { email: string } }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/dashboard/accounts', label: 'Accounts' },
    { href: '/dashboard/categories', label: 'Categories' },
    { href: '/dashboard/transactions', label: 'Transactions' },
  ]

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-white">💰 Money Tracker</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <div className="flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-white/20 pl-4 ml-4">
              <span className="text-sm text-white/80 truncate max-w-[150px]">
                {user.email}
              </span>
              <LogoutButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-600 to-indigo-600 border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-4 border-t border-white/20">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-sm font-medium leading-none text-white/60">Signed in as</div>
                <div className="text-sm font-medium leading-none text-white mt-1">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <div className="block px-3 py-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}