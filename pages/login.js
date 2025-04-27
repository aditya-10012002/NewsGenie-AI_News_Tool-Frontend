import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', null, {
        params: { email, password }
      })
      localStorage.setItem("token", response.data.access_token)
      router.push('/')
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">🔐 Login</h1>
        {error && <p className="text-red-600">{error}</p>}
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
          onClick={handleLogin}
          className="btn btn-primary w-100"
        >
          Login
        </button>
      </main>
    </div>
  )
}
