// import React from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { MoveRight } from "lucide-react"
// import Features from "@/components/layout/Features"

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="fixed top-0 w-full bg-background border-b border-border py-3 px-6 flex items-center justify-between z-999">
//         <Link href="/" className="text-xl font-bold">
//           NextPress
//         </Link>
//         <div className="flex items-center gap-4">
//           <Link href="/blog" className="hover:underline">
//             Blog
//           </Link>
//           <Link href="/about" className="hover:underline">
//             About
//           </Link>
//           <ThemeToggle />
//         </div>
//       </nav>

//       {/* Hero Section */}
//       {/* <section className="flex flex-col items-center justify-center text-center h-[70vh] px-6 pt-6 relative">
//         <h1 className="text-5xl font-bold mb-4">
//           Your Headless WordPress Boilerplate
//         </h1>
//         <p className="text-lg text-muted-foreground max-w-2xl">
//           Built with Next.js, WordPress REST API, and Tailwind.
//         </p>
//         <div className="mt-6 flex gap-4">
//           <Button asChild>
//             <Link href="https://github.com/your-repo">View on GitHub</Link>
//           </Button>
//           <Button variant="outline" asChild>
//             <Link href="https://your-website.com" target="_blank">
//               Visit Website
//             </Link>
//           </Button>
//         </div>
//       </section> */}

//       {/* Dummy Blog Section */}
//       <section className="py-16 px-6 md:px-12 lg:px-60">
//         <h2 className="text-3xl font-semibold mb-6 text-center">
//           Latest Posts
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, index) => (
//             <Card key={index} className="shadow-lg hover:shadow-xl transition">
//               <CardContent className="p-4">
//                 <img
//                   src={`https://picsum.photos/600/400?text=Post+${index + 1}`}
//                   alt={`Post ${index + 1}`}
//                   className="w-full h-48 md:h-52 object-cover rounded-md"
//                 />
//                 <CardTitle className="mt-4 text-lg md:text-xl">
//                   Post Title {index + 1}
//                 </CardTitle>
//                 <div className="text-xs text-neutral-500 mt-2">
//                   By <span className="font-medium">John Doe</span> •{" "}
//                   <span>July 20, 2024</span>
//                 </div>
//                 <CardDescription className="text-neutral-500 mt-4">
//                   This is a short description of the blog post. Click to read
//                   more.
//                 </CardDescription>
//                 <div className="mt-4">
//                   <Button asChild>
//                     <Link href="/blog/post">Read More</Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="mt-6 text-end">
//           <Button asChild variant="ghost">
//             <Link href="/blog">
//               View All Posts <MoveRight className="ml-2" />
//             </Link>
//           </Button>
//         </div>
//       </section>

//       <Features />

//       {/* Footer */}
//       <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
//         © {new Date().getFullYear()} NextPress. All rights reserved.
//       </footer>
//     </div>
//   )
// }

"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme, resolvedTheme } = useTheme(); // Get the current theme (light/dark)
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear()); // Set the year on the client
  }, []);

  // Conditionally set the gradient colors based on the theme
  const gradientColor = resolvedTheme === 'dark' ? '#353535' : '#000'; // Example colors for dark and light mode

  return (
    <div className="h-screen flex flex-col">
      {/* <div className="absolute -z-1 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div> */}
        <div className={`absolute -z-10 h-full w-full bg-[radial-gradient(${gradientColor}_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]`}></div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-full px-6 pt-6 bg-transparent">
        <h1 className="text-6xl font-bold mb-4">Welcome to NextPress</h1>
        <p className="text-md text-muted-foreground max-w-2xl">
          Built with ♥️ using Next.js, Tailwind, ShadCN, and WordPress
        </p>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href="https://github.com/your-repo">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">Read Docs</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NextPress. All rights reserved.
      </footer>
    </div>
  )
}
