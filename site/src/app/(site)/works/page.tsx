interface Work { title: string; slug: string; thumb?: string; tags: string[] }
const works: Work[] = [
  { title: 'Brand A Website', slug: 'brand-a', tags: ['Web', 'E‑commerce'] },
  { title: 'Brand B Campaign', slug: 'brand-b', tags: ['Campaign', '3D'] }
]
export default function WorksPage() {
  return (
    <section className="grid gap-8">
      <h1>Works</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {works.map(w => (
          <li key={w.slug} className="group border rounded-xl overflow-hidden bg-white">
            <div className="aspect-[16/10] bg-black/5" />
            <div className="p-4">
              <h3 className="font-medium group-hover:underline">{w.title}</h3>
              <p className="text-sm text-black/60">{w.tags.join(' • ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
