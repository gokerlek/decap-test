import { getProjects } from '@/lib/content'
import Image from 'next/image'
import Link from 'next/link'

export default function WorksPage() {
  const projects = getProjects()

  if (projects.length === 0) {
    return (
      <section className="grid gap-8">
        <h1>Works</h1>
        <p className="text-black/60">No projects yet. Add some via <a href="/admin" className="underline">CMS</a>.</p>
      </section>
    )
  }

  return (
    <section className="grid gap-8">
      <h1>Works</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map(project => (
          <li key={project.slug}>
            <Link href={`/works/${project.slug}`} className="block group border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] relative bg-black/5">
                {project.video ? (
                  <video
                    src={project.video}
                    className="w-full h-full object-cover pointer-events-none"
                    preload="metadata"
                    muted
                  >
                    Your browser does not support video.
                  </video>
                ) : project.thumb ? (
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-medium group-hover:underline">{project.title}</h3>
                {project.tags && project.tags.length > 0 && (
                  <p className="text-sm text-black/60">{project.tags.join(' • ')}</p>
                )}
                {project.video && project.thumb && (
                  <p className="text-xs text-black/40 mt-1">Video + Thumbnail</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
