import React, { useState } from 'react'
import ConfigForm from './components/ConfigForm'
import Dashboard from './components/Dashboard'
import type { VirtFusionConfig, ApiResponse } from './types'

export default function App() {
  const [config, setConfig] = useState<VirtFusionConfig | null>(null)
  const [testResult, setTestResult] = useState<ApiResponse<boolean> | null>(null)

  return (
    <div className="container">
      <div className="header">
        <h1>VirtFusion API Dashboard</h1>
        <p>Manage and monitor your VirtFusion servers with ease</p>
      </div>

      <ConfigForm
        onConfigChange={setConfig}
        onTestResult={setTestResult}
      />

      {testResult && (
        <div style={{ marginBottom: '2rem' }}>
          <div className={`status ${testResult.success ? 'success' : 'error'}`}>
            {testResult.message || testResult.error}
          </div>
        </div>
      )}

      <Dashboard config={config} />
    </div>
  )
}
