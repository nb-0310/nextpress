"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
}

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${WP_API_URL}/project?_embed`)
      .then((res) => res.json())
      .then((data) => {
			console.log('peojects: ', data);
			setProjects(data)
  		}
	);
  }, []);

  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4">
            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-xl font-semibold">{project.title.rendered}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </section>
  );
}
