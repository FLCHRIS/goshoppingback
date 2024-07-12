import { REGEX_EMAIL } from '../constants'

export const isValidEmail = (email: string) => {
  return REGEX_EMAIL.test(email)
}
