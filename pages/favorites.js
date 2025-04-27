import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push('/login')
          return
        }

        const decoded = jwtDecode(token)
        const userId = decoded.sub

        const response = await axios.get(`http://localhost:8000/favorites/get?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setFavorites(response.data.favorites || [])
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }
    fetchFavorites()
  }, [router])

  // ✨ Add this function to remove favorite
  const handleRemoveFavorite = async (articleId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push('/login')
        return
      }
      const decoded = jwtDecode(token)
      const userId = decoded.sub

      await axios.post(`http://localhost:8000/favorites/remove?user_id=${userId}&article_id=${articleId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update UI immediately
      setFavorites(prev => prev.filter(article => article._id !== articleId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">❤️ Your Saved Articles</h1>
        <div>
          {favorites.length > 0 ? (
            favorites.map((article) => (
              <NewsCard
                key={article._id}
                _id={article._id}                         // 👈 important: pass _id
                title={article.title}
                summary={article.summary}
                url={article.url}
                isFavorited={true}                        // 👈 force true for favorites page
                handleRemove={handleRemoveFavorite}       // 👈 pass remove function
              />
            ))
          ) : (
            <p>No favorites yet. Go like some news! 🚀</p>
          )}
        </div>
      </main>
    </div>
  )
}
