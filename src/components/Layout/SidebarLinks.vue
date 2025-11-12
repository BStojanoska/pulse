<template>
  <template v-for="link in links">
    <RouterLink
      v-if="link.to"
      exactActiveClass="text-primary bg-muted"
      :key="`${link.title}-link`"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div
      v-else
      :key="`${link.title}-div`"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer"
      @click="$emit('actionClicked', link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
interface LinkProp {
  title: string
  to?: string
  icon: string
}
defineProps<{
  links: LinkProp[]
}>()

defineEmits<{
  (e: 'actionClicked', title: string): void
}>()
</script>
