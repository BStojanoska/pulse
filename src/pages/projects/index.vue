<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useProjectsStore } from '@/stores/loaders/projects'
import { storeToRefs } from 'pinia'

usePageStore().pageData.title = 'Projects'

const { projects } = storeToRefs(useProjectsStore())

await useProjectsStore().getProjects()
</script>
