// app/categories/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          ❌ เกิดข้อผิดพลาด!
        </h2>
        <p className="text-red-700 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ลองอีกครั้ง
        </button>
      </div>
    </div>
  )
}