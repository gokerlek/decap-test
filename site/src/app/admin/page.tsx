'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Dynamically import CMS to avoid SSR issues
    import('decap-cms-app').then((CMS) => {
      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'gokerlek/decap-test',
            branch: 'claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ'
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
    })
  }, [])

  return <div id="nc-root" />
}
