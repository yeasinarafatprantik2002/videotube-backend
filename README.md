# 🎬 VideoTube Backend

A full-featured YouTube-like video sharing platform backend built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Features

- **User Authentication** – Register, login, logout with JWT access/refresh tokens
- **Video Management** – Upload, update, delete, and paginate videos via Cloudinary
- **Comments** – Add, edit, and delete comments on videos
- **Likes** – Like/unlike videos, comments, and tweets
- **Playlists** – Create and manage video playlists
- **Tweets** – Short posts/tweets within the platform
- **Subscriptions** – Subscribe/unsubscribe to channels
- **Dashboard** – Channel statistics and video management
- **Healthcheck** – Server health status endpoint

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access + Refresh Tokens) |
| File Storage | Cloudinary |
| File Upload | Multer |
| Password Hashing | Bcrypt |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js >= 16
- MongoDB instance (local or Atlas)
- Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/yeasinarafatprantik2002/videotube-backend.git
cd videotube-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the server
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The server runs on `http://localhost:8000` by default.

---

## 📡 API Endpoints

All routes are prefixed with `/api/v1`.

> 🔒 Routes marked with **[Auth]** require a valid JWT access token in cookies or the `Authorization: Bearer <token>` header.

---

### 🏥 Healthcheck

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/healthcheck` | ❌ | Check if the server is running |

---

### 👤 Users (`/api/v1/users`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register a new user (multipart: avatar, coverImage) |
| POST | `/login` | ❌ | Login and receive access/refresh tokens |
| POST | `/logout` | 🔒 | Logout and clear tokens |
| POST | `/refresh-token` | ❌ | Get a new access token using refresh token |
| POST | `/change-password` | 🔒 | Change the authenticated user's password |
| GET | `/current-user` | 🔒 | Get current authenticated user details |
| PATCH | `/update-account` | 🔒 | Update fullName, email, or username |
| PATCH | `/avatar` | 🔒 | Upload/update profile avatar |
| PATCH | `/cover-image` | 🔒 | Upload/update channel cover image |
| GET | `/channel-profile/:username` | 🔒 | Get channel profile by username |
| GET | `/watch-history` | 🔒 | Get authenticated user's watch history |

---

### 🎥 Videos (`/api/v1/videos`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | 🔒 | Get all videos (supports `page`, `limit`, `query`, `sortBy`, `sortType`, `userId`) |
| POST | `/` | 🔒 | Publish/upload a new video (multipart: videoFile, thumbnail) |
| GET | `/:videoId` | 🔒 | Get a specific video by ID |
| PATCH | `/:videoId` | 🔒 | Update video title, description, or thumbnail |
| DELETE | `/:videoId` | 🔒 | Delete a video |
| PATCH | `/toggle/publish/:videoId` | 🔒 | Toggle published/unpublished status |

---

### 💬 Comments (`/api/v1/comments`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/:videoId` | 🔒 | Get all comments on a video |
| POST | `/:videoId` | 🔒 | Add a comment to a video |
| PATCH | `/c/:commentId` | 🔒 | Update a comment |
| DELETE | `/c/:commentId` | 🔒 | Delete a comment |

---

### ❤️ Likes (`/api/v1/likes`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/toggle/v/:videoId` | 🔒 | Like/unlike a video |
| POST | `/toggle/c/:commentId` | 🔒 | Like/unlike a comment |
| POST | `/toggle/t/:tweetId` | 🔒 | Like/unlike a tweet |
| GET | `/videos` | 🔒 | Get all videos liked by the current user |

---

### 📋 Playlists (`/api/v1/playlist`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | 🔒 | Create a new playlist |
| GET | `/:playlistId` | 🔒 | Get playlist details by ID |
| PATCH | `/:playlistId` | 🔒 | Update playlist name/description |
| DELETE | `/:playlistId` | 🔒 | Delete a playlist |
| PATCH | `/add/:videoId/:playlistId` | 🔒 | Add a video to a playlist |
| PATCH | `/remove/:videoId/:playlistId` | 🔒 | Remove a video from a playlist |
| GET | `/user/:userId` | 🔒 | Get all playlists for a specific user |

---

### 🐦 Tweets (`/api/v1/tweets`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | 🔒 | Create a new tweet |
| GET | `/user/:userId` | 🔒 | Get all tweets by a specific user |
| PATCH | `/:tweetId` | 🔒 | Update a tweet |
| DELETE | `/:tweetId` | 🔒 | Delete a tweet |

---

### 📡 Subscriptions (`/api/v1/subscriptions`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/c/:channelId` | 🔒 | Subscribe/unsubscribe to a channel |
| GET | `/c/:channelId` | 🔒 | Get all subscribers of a channel |
| GET | `/u/:subscriberId` | 🔒 | Get all channels a user is subscribed to |

---

### 📊 Dashboard (`/api/v1/dashboard`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stats` | 🔒 | Get channel stats (total videos, views, likes, subscribers) |
| GET | `/videos` | 🔒 | Get all videos for the authenticated user's channel |

---

## 📬 Postman Collection

A ready-to-use Postman collection is included at [`VideoTube.postman_collection.json`](./VideoTube.postman_collection.json).

### How to import
1. Open **Postman**
2. Click **Import** → **Upload Files**
3. Select `VideoTube.postman_collection.json`
4. Set the `base_url` collection variable to your server URL (e.g., `http://localhost:8000`)
5. Run the **Register** and **Login** requests first to populate auth tokens automatically

---

## 🔐 Authentication Flow

```
1. POST /api/v1/users/register   →  Create account
2. POST /api/v1/users/login      →  Receive accessToken + refreshToken (set in cookies)
3. Use accessToken in requests   →  Cookie-based (automatic) or Authorization: Bearer <token>
4. POST /api/v1/users/refresh-token  →  Get new accessToken when it expires
5. POST /api/v1/users/logout     →  Clear tokens
```

---

## 📁 Project Structure

```
src/
├── controllers/     # Route handler logic
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── tweet.controller.js
│   ├── subscription.controller.js
│   ├── dashboard.controller.js
│   └── healthcheck.controller.js
├── models/          # Mongoose schemas
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── tweet.model.js
│   └── subscription.model.js
├── routes/          # Express routers
├── middlewares/     # Auth (verifyJWT) & file upload (multer)
├── utils/           # ApiError, ApiResponse, asyncHandler, cloudinary
├── db/              # MongoDB connection
├── app.js           # Express app setup
└── index.js         # Server entry point
```

---

## 👨‍💻 Author

**Yeasin Arafat Prantik**  
GitHub: [@yeasinarafatprantik2002](https://github.com/yeasinarafatprantik2002)
