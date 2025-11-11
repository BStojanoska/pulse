<template>
  <h2>Project {{ route.params?.slug }}</h2>
  <router-link to="/projects">Go to Projects</router-link>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
