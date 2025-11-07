import { getPeople } from '@/lib/content'
import Image from 'next/image'

export default function PeoplePage() {
  const people = getPeople()

  if (people.length === 0) {
    return (
      <section className="grid gap-6">
        <h1>People</h1>
        <p className="text-black/60">No team members yet. Add some via <a href="/admin" className="underline">CMS</a>.</p>
      </section>
    )
  }

  return (
    <section className="grid gap-6">
      <h1>People</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((person) => (
          <li key={person.slug} className="border rounded-2xl p-6 bg-white hover:shadow-lg transition-shadow">
            {person.avatar ? (
              <div className="h-32 w-32 rounded-xl relative overflow-hidden bg-black/5">
                <Image
                  src={person.avatar}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-32 w-32 rounded-xl bg-black/5" />
            )}
            <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
            <p className="text-sm text-black/60">{person.role}</p>
            {person.bio && (
              <p className="mt-2 text-sm text-black/70 line-clamp-3">{person.bio}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
