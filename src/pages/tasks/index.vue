<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>()
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) {
    console.error('Error fetching projects:', error)
  }

  tasks.value = data
}

await getTasks()
</script>
