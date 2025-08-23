'use client'

import { addMockBlogData, addMockToolData } from '@/lib/mockData'

export default function SetupMockDataPage() {
  const handleAddMockData = async () => {
    await addMockBlogData()
    await addMockToolData()
    alert('Mock data added successfully!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleAddMockData}
        className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700"
      >
        Add Mock Data to Firestore
      </button>
    </div>
  )
}
