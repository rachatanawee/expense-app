// app/actions/categories.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const type = formData.get('type') as string
  const icon = formData.get('icon') as string
  const color = formData.get('color') as string
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }
  
  const { error } = await supabase
    .from('categories')
    .insert({ name, type, icon, color, user_id: user.id })
  
  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath('/dashboard/categories')
  redirect('/dashboard/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const name = formData.get('name') as string
  const type = formData.get('type') as string
  const icon = formData.get('icon') as string
  const color = formData.get('color') as string

  const { error } = await supabase
    .from('categories')
    .update({ name, type, icon, color })
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only update their own categories

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/categories')
  redirect('/dashboard/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only delete their own categories

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/categories')
}
