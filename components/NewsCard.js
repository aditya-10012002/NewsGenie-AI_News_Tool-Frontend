import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

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
          await axios.post(`http://localhost:8000/favorites/add?user_id=${userId}&article_id=${_id}`, null, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setSaved(true)
        } else {
          if (handleRemove) {
            // Special for Favorites page
            handleRemove(_id)
          } else {
            // Normal remove flow
            await axios.post(`http://localhost:8000/favorites/remove?user_id=${userId}&article_id=${_id}`, null, {
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
      <div className="card mb-4 shadow-sm border-0 hover-shadow">
        <div className="card-body">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text">{summary}</p>
          <div className="d-flex justify-content-between align-items-center">
            <Link href={url} target="_blank" className="btn btn-primary">
              Read Full Article →
            </Link>
            <button
              onClick={handleSaveFavorite}
              className={`btn ${saved ? 'btn-success' : 'btn-outline-danger'} ms-2`}
            >
              {saved ? "❤️ Saved" : "🤍 Save"}
            </button>
          </div>
        </div>
      </div>
    )
  }
  
