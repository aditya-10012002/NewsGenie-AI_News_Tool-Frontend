// components/Navbar.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">📰 NewsGenie</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/favorites">Favorites</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/trending">Trending</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/summarize">Summarize</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/profile">Profile</Link></li>
                <li className="nav-item"><button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" href="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
