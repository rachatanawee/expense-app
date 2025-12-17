// app/layout.tsx - เก็บไว้แต่ปรับแต่ง
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Expense App',
  description: 'Personal expense tracking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}  {/* จะแสดง page ต่างๆ ตรงนี้ */}
      </body>
    </html>
  )
}
