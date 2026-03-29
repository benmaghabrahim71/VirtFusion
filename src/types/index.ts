export interface VirtFusionConfig {
  host: string
  token: string
  useHttps: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface Server {
  id: string
  name: string
  status: string
  ip_address: string
  created_at: string
}

export interface ServerListResponse {
  servers: Server[]
  total: number
}
