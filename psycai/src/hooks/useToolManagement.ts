'use client'

import { useState, useEffect } from 'react'
import { AITool } from '@/lib/tools'

export function useToolManagement() {
  const [recentTools, setRecentTools] = useState<AITool[]>([])
  const [favoriteTools, setFavoriteTools] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('psycai-recent-tools')
    if (stored) {
      try {
        setRecentTools(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading recent tools:', error)
      }
    }

    const storedFavorites = localStorage.getItem('psycai-favorite-tools')
    if (storedFavorites) {
      try {
        setFavoriteTools(JSON.parse(storedFavorites))
      } catch (error) {
        console.error('Error loading favorite tools:', error)
      }
    }
  }, [])

  const addToRecent = (tool: AITool) => {
    setRecentTools(prev => {
      const filtered = prev.filter(t => t.id !== tool.id)
      const updated = [tool, ...filtered].slice(0, 5) // Keep last 5
      localStorage.setItem('psycai-recent-tools', JSON.stringify(updated))
      return updated
    })
  }

  const toggleFavorite = (toolId: string) => {
    setFavoriteTools(prev => {
      const updated = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
      localStorage.setItem('psycai-favorite-tools', JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (toolId: string) => favoriteTools.includes(toolId)

  return {
    recentTools,
    favoriteTools,
    addToRecent,
    toggleFavorite,
    isFavorite
  }
}
