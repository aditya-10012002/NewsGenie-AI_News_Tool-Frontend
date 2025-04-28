import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push('/login')
          return
        }

        const decoded = jwtDecode(token)
        const userId = decoded.sub

        const response = await axios.get(`${backendUrl}/favorites/get?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setFavorites(response.data.favorites || [])
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
      setLoading(false);
    }
    fetchFavorites()
  }, [router])

  // ✨ Add this function to remove favorite
  const handleRemoveFavorite = async (articleId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push('/login')
        return
      }
      const decoded = jwtDecode(token)
      const userId = decoded.sub

      await axios.post(`${backendUrl}/favorites/remove?user_id=${userId}&article_id=${articleId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update UI immediately
      setFavorites(prev => prev.filter(article => article._id !== articleId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
    setLoading(false);
  }

  // if (loading) return <Loader />;

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">❤️ Your Saved Articles</h1>
        {loading ? (
            <Loader />
          ) : (
            <div>
              {favorites.length > 0 ? (
                favorites.map((article) => (
                  <NewsCard
                    key={article._id}
                    _id={article._id}                      
                    title={article.title}
                    summary={article.summary}
                    url={article.url}
                    isFavorited={true}                    
                    handleRemove={handleRemoveFavorite}   
                  />
                ))
              ) : (
                <p>No favorites yet. Go like some news! 🚀</p>
              )}
            </div>
          )}
      </main>
    </div>
  )
}
