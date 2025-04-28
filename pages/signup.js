import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/auth/signup`, null, {
        params: { email, password }
      })
      router.push('/login')
    } catch (err) {
      setError("Signup failed. Maybe email already registered?")
    }
    setLoading(false);
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-4">Signup</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignup}
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  )
}
