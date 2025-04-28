import Link from 'next/link'

export default function TrendingCard({ keyword, articles }) {
  return (
    <div className="card trending-card">
      <div className="card-body">
        <h5 className="card-title trending-topic">
          🔥 {keyword} <span className="badge badge-custom bg-info ms-2">{articles.length} Articles</span>
        </h5>
        <ul className="trending-articles">
          {articles.map((article, idx) => (
            <li key={idx} className="">
              <Link href={article.url} target="_blank" className="text-decoration-none trending-articles-link">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
