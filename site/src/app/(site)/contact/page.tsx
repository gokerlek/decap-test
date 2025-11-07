import { getContactPage } from '@/lib/content'

export default function ContactPage() {
  const contact = getContactPage()

  return (
    <section className="grid gap-6 max-w-prose">
      <h1>{contact.title || 'Contact'}</h1>
      {contact.subtitle && (
        <p className="text-lg text-black/80">{contact.subtitle}</p>
      )}
      {contact.body && (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: contact.body.replace(/\n/g, '<br />') }}
        />
      )}
      <form className="grid gap-3 mt-4">
        <input required placeholder="Your name" className="h-11 px-3 rounded-lg border" />
        <input required type="email" placeholder="Email" className="h-11 px-3 rounded-lg border" />
        <textarea required placeholder="Project details" rows={6} className="p-3 rounded-lg border" />
        <button className="h-11 px-4 rounded-lg bg-black text-white">Send</button>
      </form>
      <p className="text-sm text-black/60">*Static form. Hook up later if needed.</p>
    </section>
  )
}
