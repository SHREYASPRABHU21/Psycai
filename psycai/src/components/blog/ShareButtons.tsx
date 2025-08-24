"use client"

import { Heart, Share2 } from "lucide-react"

export default function ShareButtons({ title, excerpt }: { title: string; excerpt: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied!")
    }
  }

  return (
    <div className="mt-12 flex space-x-4">
      <button className="flex items-center space-x-1 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
        <Heart className="w-5 h-5" /> <span>Like</span>
      </button>
      <button
        onClick={handleShare}
        className="flex items-center space-x-1 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <Share2 className="w-5 h-5" /> <span>Share</span>
      </button>
    </div>
  )
}
