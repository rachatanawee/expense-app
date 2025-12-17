// app/dashboard/categories/new/page.tsx
import { createCategory } from '@/app/actions/categories'

export default function NewCategoryPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      
      <form action={createCategory} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
            placeholder="e.g. Salary, Food"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="type" required className="w-full px-3 py-2 border rounded text-gray-900">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Icon</label>
          <input
            name="icon"
            type="text"
            className="w-full px-3 py-2 border rounded text-gray-900"
            placeholder="e.g. 💵, 🍔, 🚗"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            name="color"
            type="color"
            defaultValue="#3b82f6"
            className="w-full h-10 border rounded"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
          <a href="/dashboard/categories" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}