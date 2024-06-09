import { REGEX_EMAIL, NUMBER_REGEX } from '../constants'

export const isEmpty = (value: string) => {
  return value === undefined || value === null || value === ''
}

export const isValidEmail = (email: string) => {
  return REGEX_EMAIL.test(email)
}

export const isNumber = (value: string) => {
  return NUMBER_REGEX.test(value)
}
