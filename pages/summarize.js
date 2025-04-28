import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Summarize() {
  const [articles, setArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState("")
  const [style, setStyle] = useState("formal")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/news/get-all`)
        setArticles(response.data.articles || [])
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const handleSummarize = async () => {
    if (!selectedArticle) {
      alert("Please select an article.")
      return
    }

    setLoading(true)
    try {
      const articleId = articles.find(article => article.title === selectedArticle)._id
      const response = await axios.post(
        `${backendUrl}/custom-summary/summarize-style?article_id=${articleId}&style=${style}`
      )
      setSummary(response.data.summary_in_style)
    } catch (error) {
      console.error('Error generating custom summary:', error)
      setSummary("Error generating summary.")
    }
    setLoading(false)
  }

  // if (loading) return <Loader />

  return (
    <ProtectedRoute>
  <Navbar />
  <main className="container mt-4 summary-box">
    <h1 className="mb-4">🎨 Custom Summarizer</h1>
    {loading && <Loader />}

    <div className="row">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <div className="mb-3">
          <label className="form-label fw-semibold">Select an Article:</label>
          <select
            className="form-select"
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
          >
            <option value="">-- Choose an article --</option>
            {articles.map((article) => (
              <option key={article._id} value={article.title}>
                {article.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Select Style:</label>
          <select
            className="form-select"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="formal">Formal 🏛️</option>
            <option value="funny">Funny 😂</option>
            <option value="short">Short ✂️</option>
          </select>
        </div>

        <button
          onClick={handleSummarize}
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>
      </div>
    </div>

    {summary && (
      <div className="card shadow-sm mt-5">
        <div className="card-body">
          <h2 className="h4 mb-3">✨ Custom Summary:</h2>
          <p>{summary}</p>
        </div>
      </div>
    )}
  </main>
</ProtectedRoute>
  )
}
