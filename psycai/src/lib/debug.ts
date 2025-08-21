export const debugLog = (component: string, action: string, data?: any, error?: any) => {
  const timestamp = new Date().toISOString()
  console.group(`🔍 [${timestamp}] ${component} - ${action}`)
  
  if (data) {
    console.log('Data:', data)
  }
  
  if (error) {
    console.error('Error:', error)
  }
  
  console.groupEnd()
}

export const logSupabaseOperation = async (operation: string, fn: () => Promise<any>) => {
  try {
    debugLog('Supabase', `${operation} - Starting`)
    const result = await fn()
    debugLog('Supabase', `${operation} - Success`, result)
    return result
  } catch (error) {
    debugLog('Supabase', `${operation} - Error`, null, error)
    throw error
  }
}
