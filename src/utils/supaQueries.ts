import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects(
    id,
    name,
    slug
  )`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) => {
  return supabase
    .from('projects')
    .select(
      `*,
    tasks(
      id,
      name,
      status, due_date
    )`,
    )
    .eq('slug', slug)
    .single()
}
export type Project = QueryData<ReturnType<typeof projectQuery>>

export const taskQuery = (id: string) => {
  return supabase
    .from('tasks')
    .select(
      `*,
    projects(
      id,
      name,
      slug
    )`,
    )
    .eq('id', parseInt(id))
    .single()
}

export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}
export type Profile = QueryData<ReturnType<typeof profileQuery>>

export const groupedProfilesQuery = (ids: string[]) => {
  return supabase.from('profiles').select('username, avatar_url, full_name, id').in('id', ids)
}

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
