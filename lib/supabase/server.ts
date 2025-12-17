import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'  // เพิ่ม import

export async function createClient() {
  const cookieStore = await cookies() // ใน Next.js 15 cookies() เป็น async แล้ว

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // เปลี่ยนจาก get() เป็น getAll()
        getAll() {
          return cookieStore.getAll()
        },
        // เปลี่ยนจาก set() / remove() เป็น setAll() ทีเดียว
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // ส่วนนี้ใช้จัดการกรณีเรียก set cookie จาก Server Component (ซึ่งทำไม่ได้)
            // แต่ไม่มีผลอะไรถ้าเรียกจาก Server Action หรือ Middleware
          }
        },
      },
    }
  )
}