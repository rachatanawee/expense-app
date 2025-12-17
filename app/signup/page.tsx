// app/signup/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignupForm from './signup-form'

export default async function SignupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/categories')  // Redirect ไปหน้า categories
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignupForm />
    </div>
  )
}