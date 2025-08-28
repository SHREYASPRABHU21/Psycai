import { supabase } from './supabase'

export interface UserData {
  firebase_uid: string
  name: string
  email: string
  photo_url?: string
}

export interface NewsletterSubscription {
  email: string
}

export interface ContactMessage {
  first_name: string
  last_name: string
  email: string
  message: string
  user_id?: string
}

// Store or update user data
export const storeUser = async (userData: UserData): Promise<boolean> => {
  try {
    console.log('Attempting to store user:', userData)
    
    const { data, error } = await supabase
      .from('users')
      .upsert({
        firebase_uid: userData.firebase_uid,
        name: userData.name,
        email: userData.email,
        photo_url: userData.photo_url,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'firebase_uid'
      })

    if (error) {
      console.error('Supabase error storing user:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }

    console.log('User stored successfully:', data)
    return true
  } catch (error) {
    console.error('Unexpected error storing user:', error)
    return false
  }
}

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    console.log('Attempting to subscribe email:', email)
    
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .upsert({
        email: email.toLowerCase(),
        status: 'active'
      }, {
        onConflict: 'email'
      })

    if (error) {
      console.error('Supabase error subscribing to newsletter:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }

    console.log('Newsletter subscription successful:', data)
    return true
  } catch (error) {
    console.error('Unexpected error subscribing to newsletter:', error)
    return false
  }
}

// Submit contact message
export const submitContactMessage = async (messageData: ContactMessage): Promise<boolean> => {
  try {
    console.log('Attempting to submit contact message:', {
      first_name: messageData.first_name,
      last_name: messageData.last_name,
      email: messageData.email,
      message: messageData.message.substring(0, 50) + '...',
      user_id: messageData.user_id
    })
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        first_name: messageData.first_name,
        last_name: messageData.last_name,
        email: messageData.email.toLowerCase(),
        message: messageData.message,
        user_id: messageData.user_id || null
      })

    if (error) {
      console.error('Supabase error submitting contact message:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }

    console.log('Contact message submitted successfully:', data)
    return true
  } catch (error) {
    console.error('Unexpected error submitting contact message:', error)
    return false
  }
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Supabase connection...')
    
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return false
    }

    console.log('Supabase connection test successful')
    return true
  } catch (error) {
    console.error('Unexpected error testing Supabase connection:', error)
    return false
  }
}
