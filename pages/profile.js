import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push('/login')
          return
        }

        const response = await axios.get('http://localhost:8000/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Session expired. Please login again.")
          setTimeout(() => {
            localStorage.removeItem("token")
            router.push('/login')
          }, 2000)  // WAIT 2 seconds before redirect
        } else {
          setError("Something went wrong. Please try again later.")
        }
      }
    }
    fetchProfile()
  }, [router])

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="container mt-4">
          <p className="">{error}</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <main className="container mt-4">
          <p>Loading profile...</p>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">👤 Your Profile</h1>
        <div className="p-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Favorites Saved:</strong> {user.favorites_count}</p>
        </div>
      </main>
    </div>
  )
}
