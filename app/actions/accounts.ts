// app/actions/accounts.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAccount(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const { error } = await supabase.from('accounts').insert({
    user_id: user.id,
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    balance: Number(formData.get('balance')),
    color: formData.get('color') as string,
  })
  
  if (error) throw new Error(error.message)
  
  revalidatePath('/dashboard/accounts')
  redirect('/dashboard/accounts')
}