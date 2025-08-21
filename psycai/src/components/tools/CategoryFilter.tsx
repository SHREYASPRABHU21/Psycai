'use client'

interface Category {
  id: string
  name: string
  icon: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
  toolCounts: Record<string, number>
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  toolCounts 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id
        const count = toolCounts[category.id] || 0

        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300
              ${isSelected
                ? 'bg-primary text-white shadow-lg transform scale-105'
                : 'bg-white text-text border border-gray-200 hover:border-primary/50 hover:shadow-md'
              }
            `}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
            <span className={`
              text-xs px-2 py-1 rounded-full
              ${isSelected 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
