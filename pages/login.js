import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, null, {
        params: { email, password }
      })
      localStorage.setItem("token", response.data.access_token)
      router.push('/')
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    }
    setLoading(false);
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-4">Login</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <input className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control mb-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  )
}
