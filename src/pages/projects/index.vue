<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'
const projects = ref<Projects | null>()
const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) {
    console.error('Error fetching projects:', error)
  }

  projects.value = data
}

await getProjects()
</script>
