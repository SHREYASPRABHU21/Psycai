export interface AITool {
  id: string
  name: string
  description: string
  category: string
  url: string
  icon: string
  isActive: boolean
  requiresAuth?: boolean
  sandboxAttributes: string[]
  allowAttributes: string[]
  features: string[]
  pricing: 'free' | 'freemium' | 'paid'
}

export const aiToolsDatabase: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for general tasks, creative writing, and problem-solving',
    category: 'conversational',
    url: 'https://chat.openai.com',
    icon: '🤖',
    isActive: true,
    requiresAuth: false,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['camera', 'microphone', 'clipboard-write'],
    features: ['Natural conversation', 'Code generation', 'Creative writing', 'Problem solving'],
    pricing: 'freemium'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant focused on helpful, harmless, and honest interactions',
    category: 'conversational',
    url: 'https://claude.ai',
    icon: '🎭',
    isActive: true,
    requiresAuth: false,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['clipboard-write'],
    features: ['Ethical AI responses', 'Long-form analysis', 'Document processing', 'Code review'],
    pricing: 'freemium'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'s multimodal AI for text, images, and complex reasoning tasks',
    category: 'conversational',
    url: 'https://gemini.google.com',
    icon: '✨',
    isActive: true,
    requiresAuth: false,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['camera', 'microphone', 'clipboard-write'],
    features: ['Multimodal capabilities', 'Real-time data', 'Google integration', 'Advanced reasoning'],
    pricing: 'freemium'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered research engine that provides cited answers with real-time information',
    category: 'research',
    url: 'https://www.perplexity.ai',
    icon: '🔍',
    isActive: true,
    requiresAuth: false,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['clipboard-write'],
    features: ['Research assistance', 'Source citations', 'Real-time data', 'Academic writing'],
    pricing: 'freemium'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool for creating stunning artwork and designs',
    category: 'creative',
    url: 'https://www.midjourney.com',
    icon: '🎨',
    isActive: true,
    requiresAuth: true,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['clipboard-write'],
    features: ['AI image generation', 'Art creation', 'Style variations', 'High-quality output'],
    pricing: 'paid'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster and smarter',
    category: 'development',
    url: 'https://copilot.github.com',
    icon: '💻',
    isActive: true,
    requiresAuth: true,
    sandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'],
    allowAttributes: ['clipboard-write'],
    features: ['Code completion', 'Code suggestions', 'Multiple languages', 'IDE integration'],
    pricing: 'paid'
  }
]

export const toolCategories = [
  { id: 'all', name: 'All Tools', icon: '🔧' },
  { id: 'conversational', name: 'Conversational AI', icon: '💬' },
  { id: 'research', name: 'Research', icon: '📚' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
  { id: 'development', name: 'Development', icon: '💻' }
]
