import axios, { AxiosInstance } from 'axios'
import type { VirtFusionConfig, ApiResponse } from '../types'

class VirtFusionClient {
  private client: AxiosInstance | null = null
  private config: VirtFusionConfig | null = null

  init(config: VirtFusionConfig) {
    this.config = config

    const protocol = config.useHttps ? 'https' : 'http'
    const baseURL = `${protocol}://${config.host}`

    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    })

    return this
  }

  isInitialized(): boolean {
    return this.client !== null && this.config !== null
  }

  getConfig(): VirtFusionConfig | null {
    return this.config
  }

  async testConnection(): Promise<ApiResponse<boolean>> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Client not initialized. Call init() first.',
      }
    }

    try {
      const response = await this.client!.get('/api/status')
      return {
        success: true,
        data: true,
        message: 'Connection successful',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Connection failed',
      }
    }
  }

  async listServers(): Promise<ApiResponse> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Client not initialized. Call init() first.',
      }
    }

    try {
      const response = await this.client!.get('/api/servers')
      return {
        success: true,
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch servers',
      }
    }
  }

  async getServerDetails(serverId: string): Promise<ApiResponse> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Client not initialized. Call init() first.',
      }
    }

    try {
      const response = await this.client!.get(`/api/servers/${serverId}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch server details',
      }
    }
  }

  async getServerTraffic(serverId: string): Promise<ApiResponse> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Client not initialized. Call init() first.',
      }
    }

    try {
      const response = await this.client!.get(`/api/servers/${serverId}/traffic`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch traffic data',
      }
    }
  }
}

export const virtfusion = new VirtFusionClient()
