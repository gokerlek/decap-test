'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    CMS: any
  }
}

export default function AdminPage() {
  useEffect(() => {
    // Decap CMS'i dinamik olarak yükle
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
    script.async = true

    script.onload = () => {
      if (window.CMS) {
        window.CMS.init({
          config: {
            backend: {
              name: 'github',
              repo: 'gokerlek/decap-test',
              branch: 'main'
            },
            load_config_file: false,
            media_folder: 'content/media',
            public_folder: '/media',
            collections: [
              {
                name: 'pages',
                label: 'Pages',
                folder: 'content/pages',
                create: true,
                format: 'frontmatter',
                slug: '{{slug}}',
                fields: [
                  { name: 'title', label: 'Title', widget: 'string' },
                  { name: 'slug', label: 'Slug', widget: 'string' },
                  { name: 'body', label: 'Body', widget: 'markdown' }
                ]
              },
              {
                name: 'projects',
                label: 'Projects',
                folder: 'content/projects',
                create: true,
                format: 'frontmatter',
                slug: '{{slug}}',
                fields: [
                  { name: 'title', label: 'Title', widget: 'string' },
                  { name: 'slug', label: 'Slug', widget: 'string' },
                  { name: 'thumb', label: 'Thumbnail', widget: 'image' },
                  { name: 'tags', label: 'Tags', widget: 'list', default: [] },
                  { name: 'body', label: 'Body', widget: 'markdown' }
                ]
              },
              {
                name: 'people',
                label: 'People',
                folder: 'content/people',
                create: true,
                format: 'frontmatter',
                slug: '{{slug}}',
                fields: [
                  { name: 'name', label: 'Name', widget: 'string' },
                  { name: 'role', label: 'Role', widget: 'string' },
                  { name: 'avatar', label: 'Avatar', widget: 'image', required: false },
                  { name: 'bio', label: 'Bio', widget: 'markdown', required: false }
                ]
              }
            ]
          }
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null
}
