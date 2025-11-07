export default function AboutPage() {
  return (
    <section className="grid gap-6 max-w-prose">
      <h1>About</h1>
      <p>We're a small, senior team crafting motion‑driven experiences. This boilerplate ships with static export, CMS integration, and fast media delivery.</p>
      <ul className="list-disc pl-5 text-sm text-black/70">
        <li>Static export via Next.js</li>
        <li>Decap CMS (Git‑based, zero server)</li>
        <li>Framer Motion page transitions</li>
      </ul>
    </section>
  )
}
