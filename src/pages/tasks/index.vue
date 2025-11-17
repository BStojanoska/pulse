<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/tasksColumns'
import { useTasksStore } from '@/stores/loaders/tasks'
import { storeToRefs } from 'pinia'
import { useCollabs } from '@/composables/collabs'

usePageStore().pageData.title = 'Tasks'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { getTasks } = tasksStore

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>
