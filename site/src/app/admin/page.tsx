'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Redirect to public/admin/index.html
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      color: '#666'
    }}>
      <div>Loading CMS...</div>
    </div>
  )
}
