import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8000/auth/signup', null, {
        params: { email, password }
      })
      router.push('/login')
    } catch (err) {
      setError("Signup failed. Maybe email already registered?")
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">🆕 Signup</h1>
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
          onClick={handleSignup}
          className="btn btn-primary w-100"
        >
          Signup
        </button>
      </main>
    </div>
  )
}
