# 📰 News Aggregation & Authentication API

A Node.js + Express-based backend API that provides **user authentication (with email OTP verification)** and **real-time news aggregation** using the [GNews API](https://gnews.io/).

---

## 🚀 Features

### 🔐 Authentication Module
- **User Registration** with email OTP verification  
- **User Login / Logout**  
- **Email Verification** (OTP-based)  
- **Resend OTP** functionality  
- JWT-based authentication for secure session handling  

### 🗞️ News Aggregation Module
- Fetch live news articles from [GNews.io](https://gnews.io/)  
- Supports multiple query parameters such as:
  - Keywords (`q`)
  - Language (`lang`)
  - Country (`country`)
  - Pagination (`page`)
  - Sort options (`sortby`)
  - Date filters (`from`, `to`)
- Integrates via a single controller (`newsController.js`)  
- Easy testing through Postman  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT + Email OTP |
| External API | GNews.io |
| Environment | dotenv |
| Testing | Postman |

---

## 📁 Project Structure

```
project-root/
│
├── config/
|   ├── mongoDb.js
|   └── mailer.js
|
├── controllers/
│   ├── authController.js       # Handles register, login, logout, verify email, resend OTP
│   └── newsController.js       # Handles GNews API fetching and logic
│
├── middleware/
│   ├── authMiddlware.js        # protected Routes
│   └── otpMail.middleware.js       # Template of OTP Email
│
├── routes/
│   ├── authRoutes.js           # Auth-related routes
│   └── newsRoutes.js           # News-related routes
│
├── models/
│   └── User.js                 # Mongoose user schema with OTP fields
│
├── utils/
│   └── generateOtp.js        # OTP generation helper
│
├── .env                        # Environment variables (keys, DB URI, etc.)
├── app.js                      # Express app setup
└── README.md                   # This file
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/news-auth-api.git
cd news-auth-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variables
Create a `.env` file in the root directory and add:
```env
# =====================================
# 🌐 SERVER CONFIGURATION
# =====================================
PORT=8002

# =====================================
# 🗄️ DATABASE (MongoDB Atlas)
# =====================================
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
DB_NAME=NewsAggregator

# =====================================
# 🔐 AUTHENTICATION
# =====================================
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d

# =====================================
# 📰 GNEWS API
# =====================================
GNEWS_API_KEY=your_gnews_api_key_here

# =====================================
# 📧 EMAIL (Brevo SMTP Configuration)
# =====================================
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=465
SMTP_EMAIL=your_account@smtp-brevo.com        # Brevo SMTP login email
SMTP_KEY=your_brevo_smtp_key_here             # Brevo SMTP key
SMTP_SEND_MAIL=your_verified_sender@gmail.com # The “from” email shown in users' inbox

```

### 4️⃣ Run the server
```bash
npm start
```
or (for development with auto-restart)
```bash
npx nodemon app.js
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/register` | Register new user & send OTP |
| `POST` | `/verify-email` | Verify user’s email using OTP |
| `POST` | `/resend-otp` | Resend OTP to email |
| `POST` | `/login` | Authenticate user and return JWT |
| `POST` | `/logout` | Invalidate JWT / end session |

---

### 🗞️ News Routes (`/api/news`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/check` | Health check route |
| `GET` | `/` | Fetch news articles using GNews API |

**Example Request:**
```
GET /api/news?q=AI&lang=en&country=us&max=10&page=1
```

**Example Response:**
```json
{
  "totalArticles": 10,
  "articles": [
    {
      "title": "AI is transforming the world",
      "description": "New AI advancements in 2025...",
      "url": "https://example.com/article",
      "source": { "name": "BBC News" },
      "publishedAt": "2025-11-06T07:00:00Z"
    }
  ]
}
```

---

## 🧪 Testing with Postman

### Health Check
```
GET http://localhost:5000/api/news/check
```

### Example Auth Flow
1. `POST /api/auth/register` → send email & OTP  
2. `POST /api/auth/verify-email` → confirm OTP  
3. `POST /api/auth/login` → receive JWT token  
4. Use `Authorization: Bearer <token>` for protected routes  

---

## 🧠 Query Parameters for News API

| Parameter | Example | Description |
|------------|----------|-------------|
| q | `technology` | Search keywords |
| lang | `en` | Language filter |
| country | `us` | Country filter |
| max | `10` | Number of results |
| from | `2025-10-01T00:00:00Z` | Start date |
| to | `2025-11-06T00:00:00Z` | End date |
| sortby | `relevance` | Sort order |
| page | `1` | Pagination |
| in | `title,description` | Search in fields |

---

## 🧰 Example Usage in Browser or cURL

```bash
curl "http://localhost:5000/api/news?q=AI&lang=en&country=us&max=5&apikey=your_api_key"
```

---

## 🧩 To-Do / Future Enhancements
- 🔒 Password reset via email  
- 🧑‍💼 Admin dashboard for managing users & news logs  
- 📰 Save favorite articles for users  
- 🌐 Frontend integration with React or Next.js  

---

## 👨‍💻 Author
**Md Faiz Alam**  
Backend Developer | MERN Stack | Passionate about clean architecture and API design  
📧 mdfaizalam022@gmail.com 
