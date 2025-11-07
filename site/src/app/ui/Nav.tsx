import Link from 'next/link'

const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="px-3 py-1 rounded-full hover:bg-black/5 transition-colors">
    {children}
  </Link>
)

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <nav className="mx-auto max-w-5xl flex items-center gap-2 px-4 h-14">
        <Link href="/" className="font-semibold tracking-tight mr-auto">{process.env.NEXT_PUBLIC_SITE_NAME || 'agency'}</Link>
        <LinkItem href="/works">Works</LinkItem>
        <LinkItem href="/people">People</LinkItem>
        <LinkItem href="/about">About</LinkItem>
        <LinkItem href="/contact">Contact</LinkItem>
      </nav>
    </header>
  )
}
