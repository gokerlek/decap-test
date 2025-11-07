import { ReactNode } from 'react'

export const metadata = {
  title: 'Content Manager',
  robots: 'noindex'
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}
