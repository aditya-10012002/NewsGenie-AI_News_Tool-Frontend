import Navbar from '../components/Navbar'
import TrendingCard from '../components/TrendingCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Trending() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/trending/detect`)
      setTopics(response.data.trending_topics)
      setLoading(false);
    }
    fetchTrending()
  }, [])

  // if (loading) return <Loader />;

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="container mt-4">
        <h1 className="text-3xl font-bold mb-6">🔥 Trending Topics</h1>
        {loading && <Loader />}
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
    </ProtectedRoute>
  )
}
