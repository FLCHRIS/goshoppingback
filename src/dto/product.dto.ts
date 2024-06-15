export interface CreateProductDto {
  name: string
  description: string
  price: number
  categoryId: number
  userId: number
  stock: number
}

export interface EditProductDto {
  name: string
  description: string
  price: number
  categoryId: number
  stock: number
}
