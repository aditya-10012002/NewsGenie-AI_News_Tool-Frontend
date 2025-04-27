import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Summarize() {
  const [articles, setArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState("")
  const [style, setStyle] = useState("formal")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://localhost:8000/news/get-all')
        setArticles(response.data.articles || [])
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
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
        `http://localhost:8000/custom-summary/summarize-style?article_id=${articleId}&style=${style}`
      )
      setSummary(response.data.summary_in_style)
    } catch (error) {
      console.error('Error generating custom summary:', error)
      setSummary("Error generating summary.")
    }
    setLoading(false)
  }

  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <h1 className="mb-4">🎨 Custom Summarizer</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select an Article:</label>
          <select
            className="border rounded p-2 w-full mb-4"
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

          <label className="block mb-2 font-semibold">Select Style:</label>
          <select
            className="border rounded p-2 w-full mb-6"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="formal">Formal 🏛️</option>
            <option value="funny">Funny 😂</option>
            <option value="short">Short ✂️</option>
          </select>

          <button
            onClick={handleSummarize}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>

        {summary && (
          <div className="bg-gray-100 p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4">✨ Custom Summary:</h2>
            <p className="text-gray-800">{summary}</p>
          </div>
        )}
      </main>
    </div>
  )
}
