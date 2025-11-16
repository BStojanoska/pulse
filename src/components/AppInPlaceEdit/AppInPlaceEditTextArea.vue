<script setup lang="ts">
const value = defineModel<string>()

defineEmits<{
  (e: 'commit'): void
}>()
</script>

<template>
  <textarea
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="value"
    @blur="$emit('commit')"
    @keypress.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
