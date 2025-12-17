// app/dashboard/accounts/page.tsx
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getAccounts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
  
  return data || []
}

export default async function AccountsPage() {
  const accounts = await getAccounts()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Link 
          href="/dashboard/accounts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Account
        </Link>
      </div>

      <div className="grid gap-4">
        {accounts.map(account => (
          <div key={account.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{account.name}</h3>
                <span 
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: account.color || '#6b7280', color: 'white' }}
                >
                  {account.type}
                </span>
              </div>
              <p className="text-2xl font-bold">
                ฿{Number(account.balance).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}