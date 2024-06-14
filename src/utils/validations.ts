import { REGEX_EMAIL, NUMBER_REGEX } from '../constants'

export const isEmptyString = (value: string) => {
  return value === undefined || value === null || value === ''
}

export const isValidEmail = (email: string) => {
  return REGEX_EMAIL.test(email)
}

export const isNumber = (value: string) => {
  return NUMBER_REGEX.test(value)
}

export const isEmptyNumber = (value: number) => {
  return value === undefined || value === null
}

export const isPositiveNumber = (value: number) => {
  return value > 0
}
