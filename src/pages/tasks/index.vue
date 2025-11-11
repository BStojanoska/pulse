<template>
  <h2>Welcome to the Tasks View</h2>
  <router-link to="/">Go to home</router-link>

  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database.types'

const tasks = ref<Tables<'tasks'>[] | null>()
;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.error('Error fetching projects:', error)
  }

  tasks.value = data
})()
</script>
