<script setup lang="ts">
import { login } from '@/utils/supaAuth'
import { useFormErrors } from '@/composables/formErrors'
import { watchDebounced } from '@vueuse/core'

const router = useRouter()

const { serverError, handleServerError, realtimeErrors, handleLoginForm } = useFormErrors()

const formData = ref({
  email: '',
  password: '',
})

watchDebounced(
  formData.value,
  () => {
    handleLoginForm(formData.value)
  },
  {
    debounce: 1000,
  },
)

const signin = async () => {
  const { error } = await login(formData.value)
  if (!error) return router.push('/')

  handleServerError(error)
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
              type="email"
              placeholder="johndoe19@example.com"
              required
            />
            <ul v-if="realtimeErrors?.email.length" class="text-sm text-left text-red-500">
              <li v-for="err in realtimeErrors?.email" :key="err" class="list-disc">
                {{ err }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              v-model="formData.password"
              :class="{ 'border-red-500': serverError }"
              id="password"
              type="password"
              autocomplete
              required
            />
            <ul v-if="realtimeErrors?.password.length" class="text-sm text-left text-red-500">
              <li v-for="err in realtimeErrors?.password" :key="err" class="list-disc">
                {{ err }}
              </li>
            </ul>
          </div>
          <ul class="text-sm text-left text-red-500">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
