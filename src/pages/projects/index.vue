<template>
  <h2>Welcome to the Projects View</h2>
  <router-link to="/">Go to home</router-link>

  <ul>
    <li v-for="project in projects" :key="project.id">
      <router-link :to="{ name: '/projects/[id]', params: { id: project.id } }">
        {{ project.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database.types'

const projects = ref<Tables<'projects'>[] | null>()
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    console.error('Error fetching projects:', error)
  }

  projects.value = data
})()
</script>
