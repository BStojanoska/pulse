<template>
  <div></div>
</template>

<script setup lang="ts">
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Homepage'
</script>
