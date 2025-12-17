// app/components/logout-button.tsx
'use client'
import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
      >
        Logout
      </button>
    </form>
  )
}