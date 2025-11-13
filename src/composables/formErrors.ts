import type { AuthError } from '@supabase/supabase-js'

export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials'
        ? 'The email or password you entered is incorrect.'
        : 'An unexpected error occurred. Please try again later.'
  }

  return {
    serverError,
    handleServerError,
  }
}
