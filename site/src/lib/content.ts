import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), '../../content')

export interface Project {
  slug: string
  title: string
  thumb?: string
  tags: string[]
  body: string
}

export interface Person {
  slug: string
  name: string
  role: string
  avatar?: string
  bio?: string
}

export interface Page {
  slug: string
  title: string
  body: string
}

function getContentFiles(folder: string) {
  const fullPath = path.join(contentDirectory, folder)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const files = fs.readdirSync(fullPath)
  return files.filter(file => file.endsWith('.md'))
}

function parseContent<T>(folder: string, fileName: string): T & { slug: string } {
  const fullPath = path.join(contentDirectory, folder, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const slug = fileName.replace(/\.md$/, '')

  return {
    slug,
    ...data,
    body: content
  } as T & { slug: string }
}

export function getProjects(): Project[] {
  const files = getContentFiles('projects')
  const projects = files.map(file => parseContent<Omit<Project, 'slug'>>('projects', file))
  return projects.sort((a, b) => a.title.localeCompare(b.title))
}

export function getPeople(): Person[] {
  const files = getContentFiles('people')
  const people = files.map(file => parseContent<Omit<Person, 'slug'>>('people', file))
  return people.sort((a, b) => a.name.localeCompare(b.name))
}

export function getPages(): Page[] {
  const files = getContentFiles('pages')
  const pages = files.map(file => parseContent<Omit<Page, 'slug'>>('pages', file))
  return pages.sort((a, b) => a.title.localeCompare(b.title))
}

export function getProject(slug: string): Project | undefined {
  try {
    return parseContent<Omit<Project, 'slug'>>('projects', `${slug}.md`)
  } catch {
    return undefined
  }
}

export function getPerson(slug: string): Person | undefined {
  try {
    return parseContent<Omit<Person, 'slug'>>('people', `${slug}.md`)
  } catch {
    return undefined
  }
}
