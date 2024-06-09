import { REGEX_EMAIL } from '../constants'

export const isEmpty = (value: string) => {
  return value === undefined || value === null || value === ''
}

export const isValidEmail = (email: string) => {
  return REGEX_EMAIL.test(email)
}
