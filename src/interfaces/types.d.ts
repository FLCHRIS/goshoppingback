export interface IFilters {
  categoryId?: number
  userId?: number
  name?: {
    contains: string
  }
  page?: number
  size?: number
}
