"use client" // Ensure client-side execution

import { useEffect, useState } from "react"
import { Zap, Search, RefreshCcw, Palette, Link, Wrench } from "lucide-react"

interface ItemProps {
  title: string
  description: string
  icon: React.ElementType
}

const initialItems: ItemProps[] = [
  {
    title: "Blazing Fast",
    description: "Next.js ensures fast performance with SSG & SSR.",
    icon: Zap,
  },
  {
    title: "SEO Optimized",
    description: "Automatic meta tags, sitemap, and better ranking.",
    icon: Search,
  },
  {
    title: "Real-time Updates",
    description: "Fetch new WP content instantly with API updates.",
    icon: RefreshCcw,
  },
  {
    title: "Customizable",
    description: "Easily change themes, layouts, and styles.",
    icon: Palette,
  },
  {
    title: "WP REST API",
    description: "Secure, flexible integration with WordPress.",
    icon: Link,
  },
  {
    title: "Developer Friendly",
    description: "Built with modern tech like Next.js & ShadCN.",
    icon: Wrench,
  },
]

// 🟢 Simple Card Component
function ItemCard({
  title,
  description,
  Icon,
}: {
  title: string
  description: string
  Icon: React.ElementType
}) {
  return (
    <div className="flex p-4 gap-2">
      <Icon className="size-6" />
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  )
}

// 🟢 Main Component
export default function Features() {
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    setItems(initialItems) // Ensure it's set on client-side only
  }, [])

  return (
    <section className="max-w-5xl mx-auto py-12">
      <h2 className="text-center text-3xl font-bold mb-8">
        Everything you need. Nothing you don’t.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            title={item.title}
            description={item.description}
            Icon={item.icon}
          />
        ))}
      </div>
    </section>
  )
}
