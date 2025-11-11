<template>
  <h2>Project {{ route.params?.id }}</h2>
  <router-link to="/projects">Go to Projects</router-link>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
