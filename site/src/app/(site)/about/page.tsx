import { getAboutPage } from '@/lib/content'

export default function AboutPage() {
  const about = getAboutPage()

  if (!about.title && !about.body) {
    return (
      <section className="grid gap-6 max-w-prose">
        <h1>About</h1>
        <p className="text-black/60">No content yet. Add some via <a href="/admin" className="underline">CMS</a> (About Page).</p>
      </section>
    )
  }

  return (
    <section className="grid gap-6 max-w-prose">
      <h1>{about.title || 'About'}</h1>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: about.body.replace(/\n/g, '<br />') }}
      />
    </section>
  )
}
