export default function ContactPage() {
  return (
    <section className="grid gap-6 max-w-prose">
      <h1>Contact</h1>
      <p>Tell us about your project. We'll get back within 24 hours.</p>
      <form className="grid gap-3" onSubmit={(e)=>e.preventDefault()}>
        <input required placeholder="Your name" className="h-11 px-3 rounded-lg border" />
        <input required type="email" placeholder="Email" className="h-11 px-3 rounded-lg border" />
        <textarea required placeholder="Project details" rows={6} className="p-3 rounded-lg border" />
        <button className="h-11 px-4 rounded-lg bg-black text-white">Send</button>
      </form>
      <p className="text-sm text-black/60">*Static form. Hook up later if needed.</p>
    </section>
  )
}
