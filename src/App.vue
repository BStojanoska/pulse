<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <router-view v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <component :is="Component" :key="route.name" />

        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </router-view>
  </AuthLayout>
</template>
