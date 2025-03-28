"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

// Define the TypeScript type for WordPress posts
export interface Post {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  date: string
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch(`${WP_API_URL}/posts?_embed`, {
      headers: {
        Authorization: `Basic ${btoa("nb@0310:Nb@03102000")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const processedPosts = data.map((post: Post) => ({
          ...post,
          excerpt: {
            ...post.excerpt,
            rendered: new DOMParser()
              .parseFromString(post.excerpt.rendered, "text/html")
              .body.textContent?.replace(" […]", "…") || "", // Replace `[…]` with `…`
          },
        }));
  
        setPosts(processedPosts);
      });
  }, []);
  

  return (
    <section className="py-20 px-6 md:px-12 lg:px-60">
      <h2 className="text-3xl font-semibold mb-6 text-center">Latest Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => {
          // Extract featured image (fallback to placeholder)
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url

          return (
            <Card
              key={post.id}
              className="shadow-lg hover:shadow-xl transition p-0"
            >
              <CardContent className="p-4">
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-48 md:h-52 object-cover rounded-md"
                />
                <CardTitle className="mt-4 text-lg md:text-xl">
                  {post.title.rendered}
                </CardTitle>
                <div className="text-xs text-neutral-500 mt-2">
                  <span>{new Date(post.date).toDateString()}</span>
                </div>
                <CardDescription className="text-neutral-500 mt-4">
                  {/* Shorten post content (optional) */}
                  {new DOMParser().parseFromString(post.excerpt.rendered, "text/html").body.textContent}
                  </CardDescription>
                <div className="mt-4">
                  <Button asChild>
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 text-end">
        <Button asChild variant="ghost">
          <Link href="/blog">
            View All Posts <MoveRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
