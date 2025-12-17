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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Accounts</h1>
        <Link 
          href="/dashboard/accounts/new"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all"
        >
          Add Account
        </Link>
      </div>

      <div className="grid gap-6">
        {accounts.map(account => (
          <div key={account.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{account.name}</h3>
                <span 
                  className="text-sm px-3 py-1 rounded-full font-medium shadow-sm"
                  style={{ backgroundColor: account.color || '#8b5cf6', color: 'white' }}
                >
                  {account.type}
                </span>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ฿{Number(account.balance).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}