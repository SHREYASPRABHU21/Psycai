export interface AITool {
  id: string
  name: string
  description: string
  longDescription: string
  category: string
  version: string
  status: 'live' | 'beta' | 'coming-soon' | 'development'
  icon: string
  screenshot?: string
  technologies: string[]
  features: string[]
  demoUrl?: string
  githubUrl?: string
  documentationUrl?: string
  videoUrl?: string
  releaseDate: string
  downloadCount?: number
  lastUpdated: string
  tags: string[]
  compatibility: string[]
}

export const myAITools: AITool[] = [
  {
    id: 'smart-content-generator',
    name: 'Smart Content Generator',
    description: 'AI-powered content creation tool for blogs, social media, and marketing copy',
    longDescription: 'A sophisticated content generation platform that leverages advanced language models to create high-quality, SEO-optimized content for various purposes. Features include tone adjustment, content templates, and multi-language support.',
    category: 'content-creation',
    version: '2.1.0',
    status: 'live',
    icon: '✨',
    screenshot: '/screenshots/content-generator.jpg',
    technologies: ['Next.js', 'OpenAI GPT-4', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Multi-format content generation',
      'SEO optimization',
      'Tone and style customization',
      'Template library',
      'Real-time editing',
      'Export to multiple formats'
    ],
    demoUrl: 'https://demo.psycai.com/content-generator',
    githubUrl: 'https://github.com/yourusername/smart-content-generator',
    documentationUrl: 'https://docs.psycai.com/content-generator',
    releaseDate: '2024-12-15',
    downloadCount: 2847,
    lastUpdated: '2025-08-15',
    tags: ['content', 'ai', 'writing', 'marketing'],
    compatibility: ['Web', 'API', 'Chrome Extension']
  },
  {
    id: 'ai-code-reviewer',
    name: 'AI Code Reviewer',
    description: 'Intelligent code analysis and review assistant for developers',
    longDescription: 'An advanced code review tool that uses machine learning to identify bugs, suggest improvements, and enforce coding standards across multiple programming languages.',
    category: 'developer-tools',
    version: '1.5.2',
    status: 'beta',
    icon: '🔍',
    screenshot: '/screenshots/code-reviewer.jpg',
    technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Docker'],
    features: [
      'Multi-language support',
      'Vulnerability detection',
      'Performance optimization suggestions',
      'Code style enforcement',
      'Integration with Git',
      'Team collaboration tools'
    ],
    demoUrl: 'https://demo.psycai.com/code-reviewer',
    githubUrl: 'https://github.com/yourusername/ai-code-reviewer',
    documentationUrl: 'https://docs.psycai.com/code-reviewer',
    releaseDate: '2025-01-20',
    downloadCount: 1253,
    lastUpdated: '2025-08-10',
    tags: ['code', 'review', 'development', 'quality'],
    compatibility: ['VS Code', 'Web', 'API', 'CLI']
  },
  {
    id: 'voice-synthesis-engine',
    name: 'Voice Synthesis Engine',
    description: 'High-quality text-to-speech with custom voice cloning capabilities',
    longDescription: 'A cutting-edge voice synthesis platform that creates natural-sounding speech from text with the ability to clone and customize voices for personalized applications.',
    category: 'audio-ai',
    version: '0.8.0',
    status: 'coming-soon',
    icon: '🎙️',
    technologies: ['PyTorch', 'CUDA', 'WebRTC', 'Node.js', 'Redis'],
    features: [
      'Natural voice synthesis',
      'Voice cloning technology',
      'Multi-language support',
      'Real-time processing',
      'Custom voice training',
      'API integration'
    ],
    documentationUrl: 'https://docs.psycai.com/voice-synthesis',
    releaseDate: '2025-09-15',
    lastUpdated: '2025-08-20',
    tags: ['voice', 'audio', 'synthesis', 'ai'],
    compatibility: ['Web', 'API', 'Mobile SDK']
  },
  {
    id: 'smart-image-enhancer',
    name: 'Smart Image Enhancer',
    description: 'AI-powered image upscaling and quality enhancement tool',
    longDescription: 'Advanced image processing tool that uses deep learning to enhance image quality, remove noise, and upscale images while preserving fine details.',
    category: 'image-processing',
    version: '1.2.1',
    status: 'live',
    icon: '🖼️',
    screenshot: '/screenshots/image-enhancer.jpg',
    technologies: ['TensorFlow', 'OpenCV', 'Flask', 'React', 'AWS S3'],
    features: [
      '4x image upscaling',
      'Noise reduction',
      'Detail preservation',
      'Batch processing',
      'Multiple format support',
      'Cloud processing'
    ],
    demoUrl: 'https://demo.psycai.com/image-enhancer',
    githubUrl: 'https://github.com/yourusername/smart-image-enhancer',
    documentationUrl: 'https://docs.psycai.com/image-enhancer',
    videoUrl: 'https://youtube.com/watch?v=demo-video',
    releaseDate: '2024-11-30',
    downloadCount: 5432,
    lastUpdated: '2025-07-25',
    tags: ['image', 'enhancement', 'upscaling', 'ai'],
    compatibility: ['Web', 'API', 'Desktop App']
  }
]

export const toolCategories = [
  { id: 'all', name: 'All Tools', icon: '🛠️', description: 'All available AI tools' },
  { id: 'content-creation', name: 'Content Creation', icon: '✍️', description: 'Tools for generating and editing content' },
  { id: 'developer-tools', name: 'Developer Tools', icon: '⚡', description: 'AI-powered development utilities' },
  { id: 'image-processing', name: 'Image Processing', icon: '🎨', description: 'AI tools for image manipulation and enhancement' },
  { id: 'audio-ai', name: 'Audio & Voice', icon: '🔊', description: 'Voice synthesis and audio processing tools' },
]

export const getToolsByStatus = (status: string) => {
  if (status === 'all') return myAITools
  return myAITools.filter(tool => tool.status === status)
}

export const getToolsByCategory = (category: string) => {
  if (category === 'all') return myAITools
  return myAITools.filter(tool => tool.category === category)
}
