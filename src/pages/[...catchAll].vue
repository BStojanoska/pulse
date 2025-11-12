<script setup lang="ts">
import AppErrorPage from '@/components/appError/AppErrorPage.vue'
import { useErrorStore } from '@/stores/error'

useErrorStore().setError({
  error: 'Page not found',
  customCode: 404,
})
</script>

<template>
  <AppErrorPage />
</template>
