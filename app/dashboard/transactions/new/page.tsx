// app/dashboard/transactions/new/page.tsx
import { createClient } from '@/lib/supabase/server'
import { createTransaction } from '@/app/actions/transactions'
import { getIcon } from '@/lib/icons'

async function getFormData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const [{ data: accounts }, { data: categories }] = await Promise.all([
    supabase.from('accounts').select('*').eq('user_id', user!.id),
    supabase.from('categories').select('*'),
  ])
  
  return { accounts: accounts || [], categories: categories || [] }
}

export default async function NewTransactionPage() {
  const { accounts, categories } = await getFormData()

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      
      <form action={createTransaction} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="type" required className="w-full px-3 py-2 border rounded">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Account</label>
          <select name="account_id" required className="w-full px-3 py-2 border rounded" defaultValue={accounts[0]?.id || ''}>
            <option value="">Select account</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category_id" className="w-full px-3 py-2 border rounded">
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {getIcon(cat.icon)} {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            name="date"
            type="datetime-local"
            defaultValue={new Date().toISOString().slice(0, 16)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Note</label>
          <textarea
            name="note"
            rows={3}
            className="w-full px-3 py-2 border rounded"
            placeholder="Optional note..."
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <a href="/transactions" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}