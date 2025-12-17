// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'  // เพิ่ม import

export function createClient() {
  return createBrowserClient<Database>(  // เพิ่ม <Database>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}