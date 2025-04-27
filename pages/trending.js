import Navbar from '../components/Navbar'
import TrendingCard from '../components/TrendingCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Trending() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    async function fetchTrending() {
      const response = await axios.get(`${backendUrl}/trending/detect`)
      setTopics(response.data.trending_topics)
    }
    fetchTrending()
  }, [])

  return (
    <div>
      <Navbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">🔥 Trending Topics</h1>
        <div>
          {topics.map((topic, idx) => (
            <TrendingCard
              key={idx}
              keyword={topic.keyword}
              articles={topic.articles}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
