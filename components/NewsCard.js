import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function NewsCard({ _id, title, summary, url, isFavorited, handleRemove }) {
    const [saved, setSaved] = useState(isFavorited)
    const router = useRouter()
  
    const handleSaveFavorite = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push('/login')
          return
        }
        const decoded = jwtDecode(token)
        const userId = decoded.sub
  
        if (!saved) {
          await axios.post(`${backendUrl}/favorites/add?user_id=${userId}&article_id=${_id}`, null, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setSaved(true)
        } else {
          if (handleRemove) {
            // Special for Favorites page
            handleRemove(_id)
          } else {
            // Normal remove flow
            await axios.post(`${backendUrl}/favorites/remove?user_id=${userId}&article_id=${_id}`, null, {
              headers: { Authorization: `Bearer ${token}` }
            })
            setSaved(false)
          }
        }
      } catch (error) {
        console.error('Error updating favorite:', error)
      }
    }
  
    return (
      <div className="card">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mt-2">{summary}</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link href={url} target="_blank" rel="noopener noreferrer" className="read-article-btn">
              Read More...
            </Link>
            <button
              onClick={handleSaveFavorite}
              className="save-btn"
            >
              {saved ? "❤️ Saved" : "🤍 Save"}
            </button>
          </div>
      </div>
    )
  }
  
