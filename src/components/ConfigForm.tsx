import React, { useState } from 'react'
import { virtfusion } from '../services/virtfusion'
import type { VirtFusionConfig, ApiResponse } from '../types'

interface ConfigFormProps {
  onConfigChange: (config: VirtFusionConfig | null) => void
  onTestResult: (result: ApiResponse<boolean>) => void
}

export default function ConfigForm({ onConfigChange, onTestResult }: ConfigFormProps) {
  const [host, setHost] = useState('')
  const [token, setToken] = useState('')
  const [useHttps, setUseHttps] = useState(true)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'info' | null
    message: string
  }>({ type: null, message: '' })
  const [loading, setLoading] = useState(false)

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!host || !token) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields',
      })
      return
    }

    try {
      setLoading(true)
      const config: VirtFusionConfig = {
        host,
        token,
        useHttps,
      }

      virtfusion.init(config)
      onConfigChange(config)

      setStatus({
        type: 'success',
        message: 'Configuration initialized successfully!',
      })
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to initialize',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setLoading(true)
    try {
      const result = await virtfusion.testConnection()
      onTestResult(result)

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Connection test successful!',
        })
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Connection test failed',
        })
      }
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Connection test failed',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setHost('')
    setToken('')
    setUseHttps(true)
    setStatus({ type: null, message: '' })
    onConfigChange(null)
  }

  return (
    <div className="config-section">
      <h2>VirtFusion API Configuration</h2>

      <form onSubmit={handleInitialize}>
        <div className="form-group">
          <label htmlFor="host">API Host</label>
          <input
            id="host"
            type="text"
            placeholder="e.g., vf.example.com"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="token">API Token/Key</label>
          <input
            id="token"
            type="password"
            placeholder="Your API key"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="https">
            <input
              id="https"
              type="checkbox"
              checked={useHttps}
              onChange={(e) => setUseHttps(e.target.checked)}
              disabled={loading}
              style={{ marginRight: '0.5rem' }}
            />
            Use HTTPS
          </label>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Initializing...' : 'Initialize Client'}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleTestConnection}
            disabled={loading || !virtfusion.isInitialized()}
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>

      {status.type && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}
