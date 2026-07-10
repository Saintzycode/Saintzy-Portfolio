import atomPreview from '@/assets/projects/atom-preview.svg'
import budgetkoPreview from '@/assets/projects/budgetko-preview.svg'
import snippetVaultPreview from '@/assets/projects/snippetvault-preview.svg'

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link: string
  image: string
  type: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Atom',
    description: 'A CSS-focused project for experimenting with layouts, styling patterns, and interactive interface details.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    link: 'https://saintzycode.github.io/Atom-css/',
    image: atomPreview,
    type: 'Web Design'
  },
  {
    id: 2,
    title: 'SnippetVault',
    description: 'A code snippet library made for saving, browsing, and reusing frontend snippets faster.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    link: 'https://snippetvaultdev.netlify.app/',
    image: snippetVaultPreview,
    type: 'Developer Tool'
  },
  {
    id: 3,
    title: 'Budgetko',
    description: 'A mobile budget tracker for monitoring everyday spending, categories, and personal expenses.',
    tags: ['Flutter', 'SQLite(Drift)'],
    link: 'https://github.com/Saintzycode/Budgetko',
    image: budgetkoPreview,
    type: 'Mobile App'
  }
]
