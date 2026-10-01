import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Eye, EyeOff, Mail, Lock, UserCog, UserCheck, User } from 'lucide-react'

const ROLES = [
  { key: 'RESIDENT', label: 'Resident', icon: User },
  { key: 'GUARD', label: 'Guard', icon: UserCheck },
  { key: 'ADMIN', label: 'Admin', icon: UserCog },
]

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('RESIDENT')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(username, password)
      if (data.role !== selectedRole) {
        logout()
        const roleLabel = ROLES.find(r => r.key === selectedRole)?.label || selectedRole
        setError('This account is not registered as ' + roleLabel + '. Please select the correct role.')
        setLoading(false)
        return
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={28} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to SafeStreet Khayelitsha</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {ROLES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedRole(key)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '10px 6px',
                borderRadius: 'var(--radius)',
                border: selectedRole === key ? '2px solid var(--primary, #14b8a6)' : '1px solid var(--border, #e2e8f0)',
                background: selectedRole === key ? 'var(--surface-hover)' : 'transparent',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: selectedRole === key ? 600 : 400,
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: 44 }}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: 44, paddingRight: 44 }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 14, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In as ' + (ROLES.find(r => r.key === selectedRole)?.label || '')}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'var(--surface-hover)', borderRadius: 'var(--radius)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <strong>Demo Accounts:</strong><br />
          admin / password<br />
          resident1 / password<br />
          guard1 / password
        </div>
      </div>
    </div>
  )
}