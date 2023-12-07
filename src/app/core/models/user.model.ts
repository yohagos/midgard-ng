export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  createdAt: any
  accessToken: string
  refreshToken: string
}

export interface UserBasic {
  id: number
  firstname: string
  lastname: string
  email: string
  role?: string
}
