import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { defineStore } from 'pinia'
import { useMemoize } from '@vueuse/core'
import { useErrorStore } from '../error'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(projects.value)) {
          loadProjects.delete('projects')
          if (!error && data) projects.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) projects.value = data
    validateCache()
  }

  return {
    projects,
    getProjects,
  }
})
