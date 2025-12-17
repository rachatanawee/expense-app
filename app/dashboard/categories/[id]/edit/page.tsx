// app/dashboard/categories/[id]/edit/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { updateCategory } from '@/app/actions/categories'

async function getCategory(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only access their own categories
    .single()

  return data
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await getCategory(id)

  if (!category) {
    notFound()
  }

  const updateWithId = updateCategory.bind(null, id)
  
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      
      <form action={updateWithId} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={category.name}
            className="w-full px-3 py-2 border rounded text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select 
            name="type" 
            required 
            defaultValue={category.type}
            className="w-full px-3 py-2 border rounded text-gray-900"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Icon</label>
          <input
            name="icon"
            type="text"
            defaultValue={category.icon || ''}
            className="w-full px-3 py-2 border rounded text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            name="color"
            type="color"
            defaultValue={category.color || '#3b82f6'}
            className="w-full h-10 border rounded"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <a href="/dashboard/categories" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
