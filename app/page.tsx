// app/page.tsx - แทนที่เนื้อหาเดิมทั้งหมด
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // ถ้า login แล้ว → ไป dashboard
  if (user) {
    redirect('/dashboard')
  }
  
  // ถ้ายัง login → ไป login page
  redirect('/login')
}
