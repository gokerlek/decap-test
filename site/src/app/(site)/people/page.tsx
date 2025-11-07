interface Person { name: string; role: string }
const people: Person[] = [
  { name: 'Göker Zafer', role: 'Frontend / Motion' },
  { name: 'Gizem Gonca', role: 'Art Direction' }
]
export default function PeoplePage() {
  return (
    <section className="grid gap-6">
      <h1>People</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {people.map((p) => (
          <li key={p.name} className="border rounded-2xl p-4 bg-white">
            <div className="h-32 w-32 rounded-xl bg-black/5" />
            <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-black/60">{p.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
