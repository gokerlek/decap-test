'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Check if we have a token from OAuth redirect in URL hash
    const hash = window.location.hash.slice(1)
    let authToken = null

    if (hash && !hash.startsWith('/')) {
      try {
        const authData = JSON.parse(atob(hash))
        authToken = authData.access_token
        console.log('Found auth token in URL hash:', authToken)

        // Store in localStorage for Decap CMS
        const userData = {
          backendName: 'github',
          token: authToken,
          login: 'github-user'
        }
        localStorage.setItem('netlify-cms-user', JSON.stringify(userData))
        console.log('Stored auth in localStorage')

        // Clear hash and reload to let CMS detect the token
        window.location.hash = ''
        window.location.reload()
        return
      } catch (e) {
        console.error('Failed to parse auth hash:', e)
      }
    }

    // Dynamically import CMS to avoid SSR issues
    import('decap-cms-app').then((module) => {
      const CMS = module.default || module

      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'gokerlek/decap-test',
            branch: 'claude/setup-nextjs-agency-boilerplate-011CUtJ9HCRqbFrXyMaVNBqZ',
            base_url: typeof window !== 'undefined' ? window.location.origin : '',
            auth_endpoint: 'api/auth'
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
