import React, { useState } from 'react'
import { virtfusion } from '../services/virtfusion'
import type { VirtFusionConfig, ApiResponse } from '../types'

interface DashboardProps {
  config: VirtFusionConfig | null
}

export default function Dashboard({ config }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'servers' | 'traffic' | 'raw'>('servers')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedServerId, setSelectedServerId] = useState<string>('')

  if (!config) {
    return (
      <div className="content-section">
        <div className="status info">
          Initialize the client first to access the dashboard
        </div>
      </div>
    )
  }

  const fetchServers = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await virtfusion.listServers()
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch servers')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchServerDetails = async () => {
    if (!selectedServerId) {
      setError('Please select a server')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await virtfusion.getServerDetails(selectedServerId)
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch server details')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchTraffic = async () => {
    if (!selectedServerId) {
      setError('Please select a server')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await virtfusion.getServerTraffic(selectedServerId)
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch traffic data')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-section">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'servers' ? 'active' : ''}`}
          onClick={() => setActiveTab('servers')}
        >
          List Servers
        </button>
        <button
          className={`tab-button ${activeTab === 'traffic' ? 'active' : ''}`}
          onClick={() => setActiveTab('traffic')}
        >
          Server Traffic
        </button>
        <button
          className={`tab-button ${activeTab === 'raw' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          Raw Data
        </button>
      </div>

      {activeTab === 'servers' && (
        <div>
          <button className="btn btn-primary" onClick={fetchServers} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Servers'}
          </button>
        </div>
      )}

      {activeTab === 'traffic' && (
        <div>
          <div className="form-group">
            <label htmlFor="server-select">Server ID</label>
            <input
              id="server-select"
              type="text"
              placeholder="Enter server ID"
              value={selectedServerId}
              onChange={(e) => setSelectedServerId(e.target.value)}
              disabled={loading}
            />
          </div>
          <button className="btn btn-primary" onClick={fetchTraffic} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Traffic'}
          </button>
        </div>
      )}

      {activeTab === 'raw' && (
        <div>
          <div className="form-group">
            <label htmlFor="raw-server-select">Server ID (Optional)</label>
            <input
              id="raw-server-select"
              type="text"
              placeholder="Enter server ID for details"
              value={selectedServerId}
              onChange={(e) => setSelectedServerId(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={fetchServers}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Fetch All Servers'}
            </button>
            {selectedServerId && (
              <button
                className="btn btn-primary"
                onClick={fetchServerDetails}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Fetch Server Details'}
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="status error" style={{ marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {data && !loading && (
        <div className="data-display" style={{ marginTop: '1rem' }}>
          {JSON.stringify(data, null, 2)}
        </div>
      )}

      {!data && !loading && !error && activeTab !== 'servers' && (
        <div className="status info" style={{ marginTop: '1rem' }}>
          Click a button to fetch data
        </div>
      )}
    </div>
  )
}
