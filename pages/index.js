import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [favorites, setFavorites] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchNewsAndFavorites() {
      try {
        const token = localStorage.getItem("token")

        const articlesResponse = await axios.get('http://localhost:8000/news/get-all')

        if (token) {
          const decoded = jwtDecode(token)
          const userId = decoded.sub

          const favoritesResponse = await axios.get(`http://localhost:8000/favorites/get?user_id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })

          setFavorites(favoritesResponse.data.favorites || [])
        }

        setArticles(articlesResponse.data.articles || [])
      } catch (error) {
        console.error('Error fetching news or favorites:', error)
      }
    }
    fetchNewsAndFavorites()
  }, [router])

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">Today's Summarized News 📰</h1>
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
    </div>
  )
}
