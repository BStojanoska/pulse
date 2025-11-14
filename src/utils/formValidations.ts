export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) {
    errors.push('Please enter a valid email address.')
  }

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long.')
  }

  return errors
}
