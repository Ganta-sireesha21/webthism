# Full Stack Blog/CMS Application

A modern, responsive full-stack blog and content management system built with React, Express.js, Supabase, and Tailwind CSS.

## Features

### Frontend
- **Responsive Design**: Mobile-first UI built with Tailwind CSS
- **Modern Components**: Navbar, Footer, Post Cards, Comment Section
- **Pages**:
  - Home: Browse all blog posts with pagination
  - Single Post: Read full post with comments
  - Create Post: Form to create new blog posts
  - Edit Post: Update existing posts
- **Navigation**: React Router for smooth client-side routing
- **API Integration**: Axios for backend communication
- **Loading & Error States**: User-friendly loading indicators and error messages
- **Comments**: Full-featured comment system with add/delete functionality

### Backend
- **REST API**: Express.js server with complete CRUD operations
- **Database**: Supabase (PostgreSQL) for data persistence
- **Models**:
  - Posts: Full blog post management
  - Comments: Threaded comments on posts
- **Validation**: Input validation for posts and comments
- **Error Handling**: Comprehensive error handling middleware
- **Middleware**: CORS, JSON parsing, custom validation

## Tech Stack

### Frontend
- React 18
- React Router DOM 6
- Axios for API calls
- Tailwind CSS for styling
- Vite for bundling

### Backend
- Node.js
- Express.js
- Supabase JavaScript Client
- Dotenv for environment variables
- CORS for cross-origin requests

### Database
- Supabase (PostgreSQL)

## Project Structure

```
week3/
├── backend/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── controllers/
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── db.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── posts.js
│   │   ├── comments.js
│   │   └── auth.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── CommentSection.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── ...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   └── package.json
│
├── SUPABASE_SETUP.md
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier available)

### 1. Supabase Setup

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
1. Create Supabase account and project
2. Create `posts` and `comments` tables
3. Configure RLS policies
4. Get API credentials

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Supabase credentials
# SUPABASE_URL=your_url
# SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# PORT=5000
# NODE_ENV=development

# Start backend server
npm run dev
```

**Backend runs on**: http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on**: http://localhost:5173 (or specified by Vite)

## API Endpoints

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:postId/comments` | Get post comments |
| POST | `/api/posts/:postId/comments` | Create comment |
| DELETE | `/api/posts/:postId/comments/:commentId` | Delete comment |

## API Request Examples

### Create a Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first blog post...",
    "author": "John Doe",
    "image_url": "https://example.com/image.jpg",
    "excerpt": "Brief summary..."
  }'
```

### Create a Comment
```bash
curl -X POST http://localhost:5000/api/posts/post-id/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jane Doe",
    "content": "Great post!",
    "email": "jane@example.com"
  }'
```

## Validation Rules

### Posts
- Title: Required, minimum 3 characters
- Content: Required, minimum 10 characters
- Author: Required
- Image URL: Optional, must be valid URL
- Excerpt: Optional, auto-generated from content if not provided

### Comments
- Author: Required
- Content: Required, maximum 500 characters
- Email: Optional

## Features Implemented

✅ Responsive UI with Tailwind CSS
✅ Home page with post listings
✅ Single post page with full content
✅ Create/Edit post functionality
✅ Comment system with add/delete
✅ React Router navigation
✅ Axios API integration
✅ Loading states
✅ Error handling and validation
✅ Navbar and Footer components
✅ RESTful API endpoints
✅ Database schema with Supabase
✅ Input validation
✅ Error handling middleware

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Component-level code splitting with React Router
- Lazy loading for images
- Optimized CSS with Tailwind CSS
- API response caching at database level
- Efficient database queries with indexes

## Future Enhancements

- User authentication and authorization
- Search functionality
- Post categories and tags
- Social sharing buttons
- Like/upvote system
- Email notifications
- Admin dashboard
- Analytics
- Dark mode
- Multi-language support

## Troubleshooting

### Frontend not connecting to backend
- Ensure backend is running on http://localhost:5000
- Check CORS is enabled in backend
- Verify API_BASE_URL in frontend components

### Database connection errors
- Verify Supabase credentials in .env
- Check tables exist in Supabase
- Ensure RLS policies are configured correctly

### Port conflicts
- Backend: Change PORT in .env
- Frontend: Vite will use next available port

### Module not found errors
- Run `npm install` in both frontend and backend directories
- Clear node_modules and reinstall if issues persist

## Development Tips

1. **Hot Reload**: Both frontend (Vite) and backend (Nodemon) support hot reloading
2. **Debugging**: Use browser DevTools for frontend, console logs for backend
3. **Database**: Use Supabase Dashboard to view data directly
4. **Testing**: Test API endpoints with curl or Postman

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue or contact the development team.

---

Built with ❤️ using React, Express, and Supabase
git commit -m "Initial commit: fullstack blog scaffold"
# create repo on GitHub and push
git remote add origin <your-repo-url>
git push -u origin main
