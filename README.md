# 📰 NewsGenie - Personalized News Summarizer and Recommender 🚀

**NewsGenie** is a full-stack AI-powered platform that delivers **personalized, summarized news** with powerful features like favorites, trending detection, chatbot interaction, and user profiles — all with a clean, modern UI.

Built for **IT Professionals**, **AI Enthusiasts**, and **News Addicts** who want **fast, relevant, AI-summarized news at a glance.**

---

## 💻 Tech Stack

| Layer | Tech |
|:-----|:-----|
| Frontend | Next.js 15, React 19, Bootstrap 5 |
| Backend | FastAPI (Python 3.11), Uvicorn |
| Database | MongoDB (Async Motor Driver) |
| AI Summarization | Google Gemini API |
| Hosting | (Coming Soon) Vercel (Frontend) + Render (Backend) |

---

## 🛠 Major Features

✅ **Authentication System** (Signup/Login, JWT Token-Based Secure Access)  
✅ **Today's News Feed** (Live articles fetched daily via cron-like auto update)  
✅ **Automated Summarization** (All news auto-summarized using Gemini LLM)  
✅ **Favorites System** (Save/Unsave news dynamically from Home/Favorites pages)  
✅ **Trending Topics Detection** (Auto-extract trending keywords daily)  
✅ **Profile Page** (View user profile, saved articles, personalized stats)  
✅ **Bootstrap 5 Responsive UI** (Fully Mobile-Optimized, Beautiful Cards, Navbar)  
✅ **Chatbot Endpoint** (Future) to ask about current news articles (Coming Soon)  
✅ **Error Handling + Token Expiry Handling** (Auto-redirect to Login on session expiry)  
✅ **Separation of Concerns**: Frontend and Backend split for clean architecture.

---

## 🧠 Hidden Advanced Features (🔥)

- **Background Database Updater**:  
  FastAPI runs an internal cron-like system that automatically fetches fresh news and refreshes article database periodically.

- **Embedding-Based Recommendations (Optional Upgrade Ready)**:  
  Articles are summarized and embeddings generated, allowing cosine similarity-based recommendations (future-ready).

- **Dynamic Save/Remove Favorites**:  
  Users can **toggle Save ❤️ and Remove ❌ instantly** without reloading the page. Frontend state syncs perfectly with backend DB.

- **Trending Keywords Extracted Automatically**:  
  System scans all articles daily to find the hottest topics without manual intervention.

- **Production-Ready Codebase**:  
  Fully async APIs, MongoDB optimized queries, frontend served independently for scalability.

---

## 📸 Screenshots

![thumbnail.png](<https://media-hosting.imagekit.io/29d90c8fa7fa4a4a/thumbnail.png?Expires=1840555076&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=TwyxjjhB~6xTPhOiv9~XYjzO2DbfMkNdJPH-aM8m-iZUQKY6~-XQ8KVqWQpkr5qrqSj6uTa0dTjgm55oaFHS-NX5dx~gcLhvHHxaVe-dXYaO1BBPwjMp1eh1bVNbPayRBZPidOmW97sPScFwKuTkfgVUqueI~HwHHRYudGuKe3trONcaAuhaRdmaO3zsEoBGOzRg1rKJdBd3znznmuPSp9yMJd0Z3DIV4cnTyqcKKDAtFZFz5Ilz-RKNzIliVaxTy4oV8Y1h8tU1VOmcFC2F5Anj0A6L8mr7scy2jRTy0TW-1witV7cGv58vNXlDkis67rkxNjwZXzxLaK4rY9AwIg__>)

---

## 🚀 Local Setup Instructions

### 1. Clone the repositories

```bash
git clone https://github.com/aditya-10012002/NewsGenie-AI_News_Tool-Frontend.git
```

### 2. Backend Setup (FastAPI)

```bash
cd NewsGenie-Backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3. Frontend Setup (Next.js)

```bash
cd NewsGenie-Frontend
npm install
npm run dev
```

### 4. Environment Variables
Set the following environment variables in a .env file inside the backend:

```bash
MONGO_URI=<your_mongodb_connection_string>
GEMINI_API_KEY=<your_google_gemini_api_key>
SECRET_KEY=<your_jwt_secret_key>
```

## 📈 Architecture Overview

```plaintext
User → Frontend (Next.js) → FastAPI Backend → MongoDB
                     ↓                         ↑
          Google Gemini API ← Summarization & Embedding
```

## 📜 Important APIs

| Endpoint           | Description                          |
|:-------------------|:-------------------------------------|
| `/news/fetch`       | Fetch fresh articles from NewsAPI    |
| `/summarize/run`    | Summarize all fetched articles       |
| `/favorites/add`    | Add article to user's favorites      |
| `/favorites/remove` | Remove article from favorites       |
| `/trending/detect`  | Get trending keywords               |
| `/auth/signup`      | Signup a new user                   |
| `/auth/login`       | Login and get JWT token             |
| `/auth/me`          | Get current user profile            |


## ⭐️ Like it? Give it a ⭐️ Star and Follow for More!
### 🧠 Built by Aditya Sharma in 2025 🚀
