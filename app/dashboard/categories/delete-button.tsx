// app/dashboard/categories/delete-button.tsx
'use client'
import { deleteCategory } from '@/app/actions/categories'
import { useState } from 'react'

export function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    setLoading(true)
    try {
      await deleteCategory(id)
    } catch (error) {
      alert('Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}