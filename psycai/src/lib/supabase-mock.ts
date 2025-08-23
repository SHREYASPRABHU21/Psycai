import { createBlog } from './supabase-blog'
import { createTool } from './supabase-tools'

export const addMockBlogData = async () => {
  const mockBlog = {
    title: 'The Future of Artificial Intelligence in Healthcare',
    slug: 'future-ai-healthcare',
    excerpt: 'Discover how artificial intelligence is revolutionizing medical diagnosis, treatment planning, and patient care across the globe.',
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence (AI) is transforming healthcare in unprecedented ways. From diagnostic imaging to personalized treatment plans, AI technologies are enhancing medical capabilities and improving patient outcomes.</p>
      
      <h2>Key Applications</h2>
      <p>AI is being implemented across various healthcare domains:</p>
      <ul>
        <li><strong>Medical Imaging:</strong> AI algorithms can detect diseases in X-rays, MRIs, and CT scans with remarkable accuracy.</li>
        <li><strong>Drug Discovery:</strong> Machine learning accelerates the identification of potential drug candidates.</li>
        <li><strong>Predictive Analytics:</strong> AI helps predict patient deterioration and disease progression.</li>
        <li><strong>Personalized Medicine:</strong> Treatment plans tailored to individual genetic profiles and medical histories.</li>
      </ul>
      
      <h2>Current Challenges</h2>
      <p>Despite the promise, several challenges remain:</p>
      <ul>
        <li>Data privacy and security concerns</li>
        <li>Regulatory approval processes</li>
        <li>Integration with existing healthcare systems</li>
        <li>Training healthcare professionals on AI tools</li>
      </ul>
      
      <h2>Future Outlook</h2>
      <p>The future of AI in healthcare looks promising, with continued advancements in machine learning, natural language processing, and robotics. We can expect to see more sophisticated AI tools that will further revolutionize patient care and medical research.</p>
      
      <p>As we move forward, the collaboration between healthcare professionals, AI researchers, and technology companies will be crucial in realizing the full potential of AI in medicine.</p>
    `,
    category: 'AI Research',
    tags: ['AI', 'Healthcare', 'Machine Learning', 'Medical Technology'],
    cover_image: 'https://picsum.photos/1200/600?random=30',
    published: true
  }

  const authorData = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah@psycai.site',
    photoURL: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff',
    uid: 'mock-author-id'
  }

  try {
    const blogId = await createBlog(mockBlog, authorData)
    console.log('Mock blog created with ID:', blogId)
  } catch (error) {
    console.error('Error creating mock blog:', error)
  }
}

export const addMockToolData = async () => {
  const mockTools = [
    {
      name: 'GPT-4 Writer',
      description: 'Advanced AI writing assistant for creating high-quality content',
      image: 'https://picsum.photos/600/400?random=40',
      link: 'https://openai.com/gpt-4',
      category: 'Writing',
      rating: 4.8,
      users: '2.1M',
      featured: true
    },
    {
      name: 'Midjourney',
      description: 'AI-powered image generation tool for creative professionals',
      image: 'https://picsum.photos/600/400?random=41',
      link: 'https://midjourney.com',
      category: 'Design',
      rating: 4.9,
      users: '1.8M',
      featured: true
    },
    {
      name: 'GitHub Copilot',
      description: 'AI pair programmer that helps you write code faster',
      image: 'https://picsum.photos/600/400?random=42',
      link: 'https://github.com/features/copilot',
      category: 'Development',
      rating: 4.7,
      users: '1.5M',
      featured: false
    }
  ]

  try {
    for (const tool of mockTools) {
      const toolId = await createTool(tool)
      console.log('Mock tool created with ID:', toolId)
    }
  } catch (error) {
    console.error('Error creating mock tools:', error)
  }
}
