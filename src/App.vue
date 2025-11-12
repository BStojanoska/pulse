<script setup lang="ts">
import AppErrorPage from './components/appError/AppErrorPage.vue'
import { useErrorStore } from './stores/error'
import { storeToRefs } from 'pinia'

const { activeError } = storeToRefs(useErrorStore())

onErrorCaptured((error) => {
  useErrorStore().setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <router-view v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <component :is="Component" :key="route.name" />

        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </router-view>
  </AuthLayout>
</template>
