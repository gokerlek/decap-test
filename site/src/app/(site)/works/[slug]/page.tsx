import { getProject, getProjects } from '@/lib/content'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="grid gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/works" className="text-sm text-black/60 hover:text-black">
          ← Back to Works
        </Link>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-black/5">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <header>
        <h1>{project.title}</h1>
      </header>

      {/* Video */}
      {project.video && (
        <div className="aspect-video relative bg-black rounded-xl overflow-hidden">
          <video
            src={project.video}
            controls
            className="w-full h-full"
            preload="metadata"
          >
            Your browser does not support video.
          </video>
        </div>
      )}

      {/* Thumbnail (if no video or as additional image) */}
      {project.thumb && !project.video && (
        <div className="aspect-video relative bg-black/5 rounded-xl overflow-hidden">
          <Image
            src={project.thumb}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Body content */}
      {project.body && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.body.replace(/\n/g, '<br />') }}
        />
      )}

      {/* Show thumbnail as gallery if video exists */}
      {project.thumb && project.video && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="aspect-video relative bg-black/5 rounded-xl overflow-hidden">
            <Image
              src={project.thumb}
              alt={`${project.title} thumbnail`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </article>
  )
}
