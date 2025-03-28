import { GetStaticProps, GetStaticPaths } from "next";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface Project {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <article className="p-10">
      <h1 className="text-4xl font-bold mb-4">{project.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
    </article>
  );
}

// Generate static paths for all projects
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${WP_API_URL}/projects`);
  const projects = await res.json();

  const paths = projects.map((project: Project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: "blocking" };
};

// Fetch project data based on slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${WP_API_URL}/projects?slug=${params?.slug}`);
  const project = await res.json();

  if (!project.length) {
    return { notFound: true };
  }

  return {
    props: { project: project[0] },
    revalidate: 10, // ISR support
  };
};
