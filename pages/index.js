import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import ProtectedRoute from '@/components/ProtectedRoute'
import Loader from '@/components/Loader'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [articles, setArticles] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    async function fetchNewsAndFavorites() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token")

        const articlesResponse = await axios.get(`${backendUrl}/news/get-all`)

        if (token) {
          const decoded = jwtDecode(token)
          const userId = decoded.sub

          const favoritesResponse = await axios.get(`${backendUrl}/favorites/get?user_id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })

          setFavorites(favoritesResponse.data.favorites || [])
        }

        setArticles(articlesResponse.data.articles || [])
      } catch (error) {
        console.error('Error fetching news or favorites:', error)
      }
      setLoading(false);
    }
    fetchNewsAndFavorites()
  }, [router]);

  // if (loading) return <Loader />;

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">Today's Summarized News 📰</h1>
        {loading && <Loader />}
        <div>
          {articles.map((article) => (
            <NewsCard
              key={article._id}
              _id={article._id}
              title={article.title}
              summary={article.summary}
              url={article.url}
              isFavorited={favorites.some(fav => fav._id === article._id)}  // 👈 pass pre-favorited state
            />
          ))}
        </div>
      </main>
    </ProtectedRoute>
  )
}
