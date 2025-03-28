"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

interface Author {
  id: number
  name: string
  description: string
  slug: string
  avatar_urls: { "96": string }
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    fetch(`${WP_API_URL}/users?per_page=100`, {
      headers: {
        Authorization: `Basic ${btoa("nb@0310:Nb@03102000")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAuthors(data))
  }, [])

  return (
    <section className="py-20 px-6 md:px-12 lg:px-60">
      <h1 className="text-3xl font-bold mb-6 text-center">Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div key={author.id} className="p-6 border rounded-lg shadow-md">
            <img
              src={author.avatar_urls["96"]}
              alt={author.name}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4 text-center">{author.name}</h2>
            {author.description && (
              <p className="text-sm text-gray-600 mt-2 text-center">{author.description}</p>
            )}
            <div className="mt-4 text-center">
              <Link href={`/authors/${author.slug}`} className="text-blue-500 hover:underline">
                View Posts →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
