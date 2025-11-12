import { defineStore } from 'pinia'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database.types'
import { profileQuery } from '@/utils/supaQueries'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  return {
    user,
    profile,
    setAuth,
  }
})
