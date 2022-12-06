export type LoginData = {
  username: string
  password: string
}

export type LoginResponse = {
  access_token: string
}

export type ApiResponse<T> = {
  data: T | null,
  error?: Error
  statusCode: number
}

export type Error = {
  code: number
  message: string
}

export type User = {
  userId: Symbol
  name: string
  password: string
}