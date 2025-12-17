// app/dashboard/categories/page.tsx
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { DeleteButton } from './delete-button'
import { getIcon } from '@/lib/icons'

async function getCategories() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { categories: [], userId: null }
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return { categories: [], userId: user.id }
  }

  return { categories: data || [], userId: user.id }
}

export default async function CategoriesPage() {
  const { categories, userId } = await getCategories()
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Categories</h1>
        <Link 
          href="/dashboard/categories/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </Link>
      </div>
      
      <div className="grid gap-4">
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories yet. Create one!</p>
        ) : (
          categories.map(cat => {
            const isOwner = cat.user_id === userId
            
            return (
              <div 
                key={cat.id}
                className="p-4 border rounded bg-white flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getIcon(cat.icon)}</span>
                  <div>
                    <h2 className="font-semibold">{cat.name}</h2>
                    <span 
                      className="text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: cat.color || '#gray', color: 'white' }}
                    >
                      {cat.type}
                    </span>
                  </div>
                </div>
                {isOwner && (
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/categories/${cat.id}/edit`}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={cat.id} />
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
