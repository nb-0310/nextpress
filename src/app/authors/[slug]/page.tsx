"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

interface Post {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  date: string
}

interface Author {
  name: string
  description: string
  avatar_urls: { "96": string }
}

export default function AuthorPage() {
  const { slug } = useParams()
  const [author, setAuthor] = useState<Author | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (!slug) return

    // Fetch author details
    fetch(`${WP_API_URL}/users?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAuthor(data[0])
          fetch(`${WP_API_URL}/posts?author=${data[0].id}`)
            .then((res) => res.json())
            .then((postData) => setPosts(postData))
        }
      })
  }, [slug])

  if (!author) return <p className="text-center">Loading...</p>

  return (
    <section className="py-20 px-6 md:px-12 lg:px-60">
      <div className="flex items-center gap-6">
        <img src={author.avatar_urls["96"]} alt={author.name} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-3xl font-bold">{author.name}</h1>
          {author.description && <p className="text-gray-600">{author.description}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8">Posts by {author.name}</h2>
      <div className="mt-4">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border-b py-4">
              <h3 className="text-xl font-medium">
                <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                  {post.title.rendered}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{new Date(post.date).toDateString()}</p>
              <p className="mt-2">{new DOMParser().parseFromString(post.excerpt.rendered, "text/html").body.textContent}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <Link href="/authors" className="text-blue-500 hover:underline">
          ← Back to Authors
        </Link>
      </div>
    </section>
  )
}
