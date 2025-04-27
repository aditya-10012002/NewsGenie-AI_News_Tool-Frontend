import Link from 'next/link'

export default function TrendingCard({ keyword, articles }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">
          🔥 {keyword} <span className="badge bg-info ms-2">{articles.length} Articles</span>
        </h5>
        <ul className="list-group list-group-flush mt-3">
          {articles.map((article, idx) => (
            <li key={idx} className="list-group-item">
              <Link href={article.url} target="_blank" className="text-decoration-none">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
