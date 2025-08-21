'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Bug, ChevronDown, ChevronUp } from 'lucide-react'

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [testResults, setTestResults] = useState<any>({})
  const { user, session, loading, error, debugInfo } = useAuth()

  const runTests = async () => {
    const supabase = createClient()
    const results: any = {}

    // Test 1: Check Supabase connection
    try {
      const { data, error } = await supabase.from('blog_categories').select('count').single()
      results.connection = { success: !error, data, error: error?.message }
    } catch (err) {
      results.connection = { success: false, error: (err as Error).message }
    }

    // Test 2: Check blogs table
    try {
      const { data, error } = await supabase.from('blogs').select('count').single()
      results.blogs = { success: !error, data, error: error?.message }
    } catch (err) {
      results.blogs = { success: false, error: (err as Error).message }
    }

    // Test 3: Check categories
    try {
      const { data, error } = await supabase.from('blog_categories').select('*').limit(5)
      results.categories = { success: !error, data, error: error?.message }
    } catch (err) {
      results.categories = { success: false, error: (err as Error).message }
    }

    // Test 4: Check published blogs
    try {
      const { data, error } = await supabase.from('blogs').select('*').eq('published', true).limit(5)
      results.publishedBlogs = { success: !error, data, error: error?.message }
    } catch (err) {
      results.publishedBlogs = { success: false, error: (err as Error).message }
    }

    setTestResults(results)
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        <Bug className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-h-96 bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Debug Panel</h3>
              <button onClick={runTests} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                Run Tests
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 text-xs">
            {/* Auth Status */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Auth Status</h4>
              <div className="space-y-1 text-gray-600">
                <div>Loading: {loading ? 'Yes' : 'No'}</div>
                <div>User ID: {user?.id || 'None'}</div>
                <div>Email: {user?.email || 'None'}</div>
                <div>Session: {session ? 'Active' : 'None'}</div>
                <div>Error: {error?.message || 'None'}</div>
                <div>Debug: {JSON.stringify(debugInfo, null, 2)}</div>
              </div>
            </div>

            {/* Test Results */}
            {Object.keys(testResults).length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Test Results</h4>
                <div className="space-y-2">
                  {Object.entries(testResults).map(([test, result]: [string, any]) => (
                    <div key={test}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="font-medium">{test}</span>
                      </div>
                      {result.error && <div className="text-red-600 ml-4">{result.error}</div>}
                      {result.data && (
                        <div className="ml-4 mt-1">
                          <pre className="text-gray-600 whitespace-pre-wrap">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supabase Config */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Supabase Config</h4>
              <div className="text-gray-600">
                <div>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...</div>
                <div>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30)}...</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
