// app/(dashboard)/layout.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardNav from '@/app/components/dashboard-nav'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // ถ้าไม่ได้ login redirect ไป /login
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <DashboardNav user={{ email: user.email || '' }} />
      <main className="max-w-7xl mx-auto px-4 py-4 md:p-6">
        {children}
      </main>
    </div>
  )
}