<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode?: number
  details?: string
  code?: string
  hint?: string
  statusCode?: number
  isCustomError?: boolean
}>()

const error = ref({
  code: 500,
  message: 'Ops! Something went wrong.',
})

if (props.isCustomError) {
  error.value.code = props.customCode || 400
  error.value.message = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.message = 'The requested resource was not found.'
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.message }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
