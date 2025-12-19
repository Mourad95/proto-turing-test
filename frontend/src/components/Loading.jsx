function Loading({ message = 'Chargement...' }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
        <div className="text-gray-500">{message}</div>
      </div>
    </div>
  )
}

export default Loading

