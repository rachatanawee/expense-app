// app/dashboard/accounts/new/page.tsx
import { createAccount } from '@/app/actions/accounts'

export default function NewAccountPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      
      <form action={createAccount} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. Cash, SCB Bank"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="type" required className="w-full px-3 py-2 border rounded">
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
            <option value="credit">Credit Card</option>
            <option value="wallet">E-Wallet</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Initial Balance</label>
          <input
            name="balance"
            type="number"
            step="0.01"
            defaultValue="0"
            className="w-full px-3 py-2 border rounded"
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
          <a href="/dashboard/accounts" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}