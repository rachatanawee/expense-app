// app/(dashboard)/page.tsx
import { createClient } from '@/lib/supabase/server'

async function getDashboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get summary data
//   const { data: accounts } = await supabase
//     .from('accounts')
//     .select('balance')
//     .eq('user_id', user!.id)

//   const totalBalance = accounts?.reduce((sum, acc) => sum + Number(acc.balance), 0) || 0

  return { totalBalance: 0 }
}

export default async function DashboardPage() {
  const { totalBalance } = await getDashboardData()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm text-gray-600">Total Balance</p>
        <p className="text-3xl font-bold text-blue-600">
          ฿{totalBalance.toLocaleString()}
        </p>
      </div>
    </div>
  )
}