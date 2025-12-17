// app/dashboard/transactions/page.tsx
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getTransactions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data } = await supabase
    .from('transactions')
    .select(`
      *,
      accounts(name),
      categories(name, icon)
    `)
    .eq('user_id', user!.id)
    .order('date', { ascending: false })
    .limit(50)
  
  return data || []
}

export default async function TransactionsPage() {
  const transactions = await getTransactions()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link 
          href="/dashboard/transactions/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Transaction
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Account</th>
              <th className="text-right p-4">Amount</th>
              <th className="text-left p-4">Note</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="p-4 w-24">
                  {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2">
                    {tx.categories?.icon} {tx.categories?.name}
                  </span>
                </td>
                <td className="p-4">{tx.accounts?.name}</td>
                <td className={`p-4 text-right font-semibold ${
                  tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {tx.type === 'income' ? '+' : '-'}฿{Number(tx.amount).toLocaleString()}
                </td>
                <td className="p-4 text-gray-600">{tx.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}