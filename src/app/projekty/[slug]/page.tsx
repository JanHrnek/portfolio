import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import ProjectDetail from "./ProjectDetail"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const nextProject =
    projects.find((p) => p.slug === project.nextProjectSlug) ?? projects[0]

  return <ProjectDetail project={project} nextProject={nextProject} />
}
