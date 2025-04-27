import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">📰 NewsGenie</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link href="/" className="nav-link">Today's News</Link></li>
                <li className="nav-item"><Link href="/favorites" className="nav-link">Favorites</Link></li>
                <li className="nav-item"><Link href="/trending" className="nav-link">Trending</Link></li>
                <li className="nav-item"><Link href="/summarize" className="nav-link">Summarize</Link></li>
                <li className="nav-item"><Link href="/profile" className="nav-link">Profile</Link></li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger ms-2">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link href="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link href="/signup" className="nav-link">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
