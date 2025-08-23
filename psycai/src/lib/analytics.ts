import { logEvent, setUserId, setUserProperties } from 'firebase/analytics'
import { analytics } from './firebase'

// Track page views
export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  }
}

// Track user signup
export const trackSignup = (method: 'email' | 'google', userId: string) => {
  if (analytics) {
    logEvent(analytics, 'sign_up', {
      method: method,
      user_id: userId
    })
  }
}

// Track user login
export const trackLogin = (method: 'email' | 'google', userId: string) => {
  if (analytics) {
    logEvent(analytics, 'login', {
      method: method,
      user_id: userId
    })
  }
}

// Track tool usage
export const trackToolClick = (toolName: string, toolCategory: string) => {
  if (analytics) {
    logEvent(analytics, 'select_content', {
      content_type: 'tool',
      content_id: toolName.toLowerCase().replace(/\s+/g, '_'),
      item_category: toolCategory,
      item_name: toolName
    })
  }
}

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (analytics) {
    logEvent(analytics, 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    })
  }
}

// Track category filter
export const trackCategoryFilter = (category: string) => {
  if (analytics) {
    logEvent(analytics, 'filter_select', {
      filter_type: 'category',
      filter_value: category
    })
  }
}

// Set user properties when they log in
export const setAnalyticsUser = (userId: string, userData: any) => {
  if (analytics) {
    setUserId(analytics, userId)
    setUserProperties(analytics, {
      user_country: userData.country || 'unknown',
      login_method: userData.loginMethod || 'unknown',
      user_type: 'registered'
    })
  }
}

// Track engagement events
export const trackEngagement = (eventName: string, parameters?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters)
  }
}
