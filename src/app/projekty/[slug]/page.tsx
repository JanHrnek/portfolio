import { notFound } from "next/navigation"
import { mainProjects } from "@/data/projects"
import ProjectDetail from "./ProjectDetail"
import ProjectWip from "./ProjectWip"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return mainProjects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = mainProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  if (project.inProgress) return <ProjectWip project={project} />

  const nextProject =
    mainProjects.find((p) => p.slug === project.nextProjectSlug) ?? mainProjects[0]

  return <ProjectDetail project={project} nextProject={nextProject} />
}
