"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

interface Post {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  date: string
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] }
}

export default function SinglePostPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (!slug) return

    fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      headers: {
        Authorization: `Basic ${btoa("nb@0310:Nb@03102000")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          router.push("/404") // Redirect if post not found
          return
        }
        setPost(data[0])
      })
  }, [slug])

  if (!post) return <p className="text-center">Loading...</p>

  return (
    <section className="py-20 px-6 md:px-12 lg:px-96">
      <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.date).toDateString()}
      </p>

      {/* <div className="px-48"> */}
        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className="w-full max-h-96 object-cover my-6 rounded-lg"
          />
        )}

		<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

        <div className="mt-6">
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      {/* </div> */}
    </section>
  )
}
