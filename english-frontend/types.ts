export type UserData = {
  userId: Symbol
  name: string
  password: string
}

export type ApiStatuses = 'idle' | 'pending' | 'error' | 'success'

export type ApiState<T> = {
  data: null | T
  status: ApiStatuses
  error?: string
  statusCode: number | null
}