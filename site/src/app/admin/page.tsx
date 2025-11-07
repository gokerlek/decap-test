'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Dynamically import CMS to avoid SSR issues
    import('decap-cms-app').then((module) => {
      const CMS = module.default || module
      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'gokerlek/decap-test',
            branch: 'claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ',
            base_url: 'https://api.netlify.com',
            auth_endpoint: 'auth',
            site_domain: 'lighthearted-gumption-7decab.netlify.app'
          },
          load_config_file: false,
          media_folder: 'site/public/media',
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
                { name: 'thumb', label: 'Thumbnail (Image)', widget: 'image', required: false },
                { name: 'video', label: 'Video (MP4)', widget: 'file', required: false },
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
            },
            {
              name: 'about',
              label: 'About Page',
              files: [
                {
                  name: 'about',
                  label: 'About',
                  file: 'content/site/about.md',
                  fields: [
                    { name: 'title', label: 'Title', widget: 'string' },
                    { name: 'body', label: 'Body', widget: 'markdown' }
                  ]
                }
              ]
            },
            {
              name: 'contact',
              label: 'Contact Page',
              files: [
                {
                  name: 'contact',
                  label: 'Contact',
                  file: 'content/site/contact.md',
                  fields: [
                    { name: 'title', label: 'Title', widget: 'string' },
                    { name: 'subtitle', label: 'Subtitle', widget: 'text', required: false },
                    { name: 'body', label: 'Body', widget: 'markdown' }
                  ]
                }
              ]
            }
          ]
        }
      })
    })
  }, [])

  return <div id="nc-root" />
}
