import Link from 'next/link'
export default function Home() {
  return (
    <section className="grid gap-6">
      <h1>We design & build bold digital experiences.</h1>
      <p className="max-w-prose">Fully static, animated, CMS‑editable website boilerplate. Zero monthly cost. Optimized images & videos, smooth transitions.</p>
      <div className="flex gap-2">
        <Link href="/works" className="px-4 py-2 bg-black text-white rounded-lg">View Works</Link>
        <Link href="/contact" className="px-4 py-2 border rounded-lg">Start a Project</Link>
      </div>
    </section>
  )
}
