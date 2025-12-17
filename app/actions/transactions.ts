// app/actions/transactions.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTransaction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const amount = Number(formData.get('amount'))
  const type = formData.get('type') as string
  const accountId = formData.get('account_id') as string
  
  // Insert transaction
  const categoryId = formData.get('category_id') as string
  const { error } = await supabase.from('transactions').insert({
    user_id: user.id,
    account_id: accountId,
    category_id: categoryId || null,
    amount,
    type,
    date: formData.get('date') as string,
    note: formData.get('note') as string,
  })
  
  if (error) throw new Error(error.message)
  
  // Update account balance
  const { data: account } = await supabase
    .from('accounts')
    .select('balance')
    .eq('id', accountId)
    .single()
  
  if (account) {
    const newBalance = type === 'income' 
      ? Number(account.balance) + amount
      : Number(account.balance) - amount
    
    await supabase
      .from('accounts')
      .update({ balance: newBalance })
      .eq('id', accountId)
  }
  
  revalidatePath('/dashboard/transactions')
  revalidatePath('/dashboard/accounts')
  revalidatePath('/dashboard')
  redirect('/dashboard/transactions')
}