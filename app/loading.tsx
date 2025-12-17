// app/categories/loading.tsx
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img 
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZDN5YzBxMnBtdGJ5aWJ5aWJ5aWJ5aWJ5aWJ5aWJ5aWJ5aWJ5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="Loading..."
        className="w-32 h-32"
      />
      <p className="mt-4 text-gray-600">Loading ...</p>
    </div>
  )
}