export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Atom',
    description: 'Lorem Ipsum.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    link: 'https://saintzycode.github.io/Atom-css/'
  },
  {
    id: 2,
    title: 'SnippetVault',
    description: 'A Ready to use code snippet',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    link: 'https://snippetvaultdev.netlify.app/'
  },
  {
    id: 3,
    title: 'Budgetko',
    description: 'A Budget tracker for everyday spending ',
    tags: ['Flutter', 'SQLite(Drift)'],
    link: 'https://github.com/Saintzycode/Budgetko'
  }
]