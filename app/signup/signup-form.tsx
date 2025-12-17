// app/signup/signup-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignup(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h1>
      <form action={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full px-3 py-2 border rounded text-gray-900"
            placeholder="••••••••"
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        
        <div className="text-center text-sm text-gray-900">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  )
}
