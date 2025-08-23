'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabasePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('blogs')
        .select('count(*)')
        .limit(1)

      if (error) {
        setResult({ error: error.message, details: error })
      } else {
        setResult({ success: true, data })
      }
    } catch (err) {
      setResult({ error: 'Connection failed', details: err })
    }
    setLoading(false)
  }

  const testInsert = async () => {
    setLoading(true)
    try {
      const testBlog = {
        title: 'Test Blog',
        slug: `test-blog-${Date.now()}`,
        excerpt: 'Test excerpt',
        content: 'Test content',
        author_name: 'Test Author',
        author_email: 'test@example.com',
        author_uid: 'test-uid',
        cover_image: 'https://picsum.photos/600/400',
        category: 'AI Research',
        tags: ['test'],
        published: true
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert(testBlog)
        .select('id')
        .single()

      if (error) {
        setResult({ error: error.message, details: error })
      } else {
        setResult({ success: true, insertedId: data.id })
      }
    } catch (err) {
      setResult({ error: 'Insert failed', details: err })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Test Supabase Connection</h1>
        
        <div className="space-y-4">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
          
          <button
            onClick={testInsert}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Insert'}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Result:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
          <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
        </div>
      </div>
    </div>
  )
}
