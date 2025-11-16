<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useProjectsStore } from '@/stores/loaders/projects'
import { storeToRefs } from 'pinia'
import { useCollabs } from '@/composables/collabs'

usePageStore().pageData.title = 'Projects'

const { projects } = storeToRefs(useProjectsStore())

await useProjectsStore().getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>
