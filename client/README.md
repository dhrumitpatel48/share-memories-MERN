# Share Memories - MERN Stack Application

A full-stack social media application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to create, share, and interact with memory posts. Users can sign up, create posts with images, like and comment on posts, search by tags, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Components Overview](#components-overview)
- [State Management](#state-management)
- [Routing](#routing)
- [Scripts](#scripts)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**
  - Sign up / Sign in with email and password
  - Google OAuth authentication
  - JWT-based session management
  - Automatic token expiration handling

- **Post Management**
  - Create new memory posts with title, message, tags, and images
  - Edit existing posts (only by the creator)
  - Delete posts (only by the creator)
  - View detailed post information
  - Image upload support (Base64 encoding)

- **Social Features**
  - Like posts
  - Comment on posts
  - View post details with full content
  - See recommended posts based on tags

- **Search & Discovery**
  - Search posts by title/keywords
  - Filter posts by tags
  - Pagination support for browsing posts
  - Related posts recommendations

- **User Interface**
  - Responsive design with Material-UI
  - Modern and intuitive user experience
  - Loading states and error handling
  - Real-time updates

## 🛠 Tech Stack

### Frontend
- **React** (v18.2.0) - UI library
- **Redux** (v4.2.0) - State management
- **Redux Thunk** (v2.4.2) - Async action handling
- **React Router DOM** (v6.8.1) - Routing
- **Material-UI** (v4.12.4) - UI component library
- **Axios** (v1.2.3) - HTTP client
- **JWT Decode** (v3.1.2) - Token decoding
- **Moment** (v2.29.4) - Date formatting
- **React File Base64** (v1.0.3) - File upload handling
- **React OAuth Google** (v0.8.0) - Google authentication

### Backend Integration
- RESTful API integration
- JWT authentication
- Base URL: `http://localhost:5000` (configurable)

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── actions/           # Redux action creators
│   │   ├── auth.js       # Authentication actions
│   │   └── posts.js      # Post-related actions
│   ├── api/              # API configuration
│   │   └── index.js      # Axios instance and API endpoints
│   ├── components/       # React components
│   │   ├── Auth/         # Authentication component
│   │   ├── Form/         # Post creation/editing form
│   │   ├── Home/         # Home page with posts and search
│   │   ├── Navbar/       # Navigation bar
│   │   ├── PostDetails/  # Post detail view
│   │   ├── Posts/        # Posts list and individual post
│   │   └── Pagination.jsx # Pagination component
│   ├── constants/        # Constants
│   │   └── actionTypes.js # Redux action type constants
│   ├── images/           # Image assets
│   ├── reducers/         # Redux reducers
│   │   ├── auth.js       # Authentication reducer
│   │   ├── posts.js      # Posts reducer
│   │   └── index.js      # Root reducer
│   ├── App.js            # Main app component with routing
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── README.md            # Documentation
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- A running backend server (MongoDB + Express + Node.js)
- Google OAuth credentials (for Google Sign-In feature)

## 🚀 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the backend API URL** (if different from default):
   - Edit `src/api/index.js` to change the base URL
   - Edit `package.json` to update the proxy setting

4. **Set up Google OAuth** (optional):
   - Update the Google Client ID in `src/components/Auth/Auth.js` (line 122)
   - Replace `1013378166863-knp8pp145rkh0fvbk954genedkgke37p.apps.googleusercontent.com` with your own Google OAuth Client ID

5. **Start the development server**:
   ```bash
   npm start
   ```

6. **Open your browser**:
   - The app will automatically open at `http://localhost:3000`

## ⚙️ Configuration

### API Configuration

The API base URL is configured in `src/api/index.js`:

```javascript
const API = axios.create({ baseURL: "http://localhost:5000" });
```

### Proxy Configuration

The proxy for development is set in `package.json`:

```json
"proxy": "http://localhost:5000"
```

### Google OAuth

To enable Google Sign-In, you need to:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Update the Client ID in `src/components/Auth/Auth.js`:

```javascript
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
```

## 📖 Usage

### Authentication

1. **Sign Up**:
   - Click "Sign In" in the navbar
   - Switch to "Sign Up" mode
   - Fill in first name, last name, email, and password
   - Click "Sign Up"

2. **Sign In**:
   - Enter your email and password
   - Click "Sign In"
   - Or use "Google Sign In" for OAuth authentication

3. **Logout**:
   - Click the "Logout" button in the navbar

### Creating a Post

1. Sign in to your account
2. Fill in the form on the right side:
   - **Title**: Enter a title for your memory
   - **Message**: Write your memory description
   - **Tags**: Add tags separated by commas (e.g., `vacation, summer, beach`)
   - **Image**: Upload an image file
3. Click "Submit"

### Editing a Post

1. Click on a post you created
2. Click the edit button (pencil icon)
3. Modify the fields
4. Click "Submit"

### Deleting a Post

1. Click on a post you created
2. Click the delete button (trash icon)
3. Confirm the deletion

### Searching Posts

1. Use the search bar to search by title/keywords
2. Add tags in the "Search Tags" field
3. Press Enter or click "Search"
4. Clear search to return to all posts

### Viewing Post Details

- Click on any post card to view full details
- See comments, likes, and related posts
- Add comments in the comment section

## 🔌 API Integration

The application communicates with the backend through the following endpoints:

### Authentication Endpoints
- `POST /user/signin` - Sign in
- `POST /user/signup` - Sign up

### Post Endpoints
- `GET /posts` - Fetch all posts (with pagination)
- `GET /posts/:id` - Fetch a single post
- `GET /posts/search` - Search posts by query and tags
- `POST /posts` - Create a new post
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `PATCH /posts/:id/likePost` - Like/unlike a post
- `POST /posts/:id/commentPost` - Add a comment to a post

### Request Interceptors

All API requests automatically include the JWT token in the Authorization header if the user is logged in:

```javascript
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});
```

## 🧩 Components Overview

### Auth Component
- Handles user authentication (sign in/sign up)
- Supports email/password and Google OAuth
- Form validation and error handling

### Home Component
- Main page displaying posts grid
- Search functionality
- Post creation form
- Pagination controls

### Posts Component
- Displays grid of post cards
- Loading states
- Empty state handling

### Post Component
- Individual post card
- Like button
- Edit/Delete buttons (for post creator)
- Navigation to post details

### PostDetails Component
- Full post view with image
- Comments section
- Related posts recommendations
- Like functionality

### Form Component
- Create/Edit post form
- Image upload
- Tag input
- Protected route (requires authentication)

### Navbar Component
- Navigation bar
- User profile display
- Logout functionality
- Sign in button for guests

### CommentSection Component
- Display comments
- Add new comments
- Real-time comment updates

### Pagination Component
- Page navigation
- URL-based page state

## 🔄 State Management

The application uses Redux for state management with the following structure:

### Reducers

1. **Auth Reducer** (`reducers/auth.js`)
   - Manages authentication state
   - Handles AUTH and LOGOUT actions

2. **Posts Reducer** (`reducers/posts.js`)
   - Manages posts state
   - Handles CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, LIKE, COMMENT actions
   - Manages loading states

### Action Types

Defined in `constants/actionTypes.js`:
- `CREATE`, `UPDATE`, `DELETE`
- `FETCH_ALL`, `FETCH_POST`, `FETCH_BY_SEARCH`
- `LIKE`, `COMMENT`
- `START_LOADING`, `END_LOADING`
- `AUTH`, `LOGOUT`

### Actions

- **Auth Actions** (`actions/auth.js`): Sign in, sign up
- **Post Actions** (`actions/posts.js`): CRUD operations, search, like, comment

## 🛣 Routing

The application uses React Router v6 with the following routes:

- `/` - Home page (posts list)
- `/posts` - Home page (alias)
- `/posts/search` - Search results page
- `/posts/:id` - Post details page
- `/auth` - Authentication page (redirects to home if logged in)

Routes are defined in `src/App.js`:

```javascript
<Routes>
  <Route path="/" exact element={<Home />} />
  <Route path="/posts" exact element={<Home />} />
  <Route path="/posts/search" exact element={<Home />} />
  <Route path="/posts/:id" exact element={<PostDetails />} />
  <Route path="/auth" exact element={!user ? <Auth /> : <Home />} />
</Routes>
```

## 📜 Scripts

Available npm scripts:

- `npm start` - Start development server (runs on port 3000)
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

## 🔒 Security Notes

- JWT tokens are stored in localStorage
- Tokens are automatically included in API requests
- Token expiration is checked on route changes
- Users can only edit/delete their own posts
- Authentication is required for creating posts

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure the backend server is running on port 5000
   - Check the API base URL in `src/api/index.js`
   - Verify CORS settings on the backend

2. **Google Sign-In Not Working**
   - Verify Google OAuth Client ID is correct
   - Check that Google+ API is enabled in Google Cloud Console
   - Ensure authorized JavaScript origins include `http://localhost:3000`

3. **Images Not Uploading**
   - Check file size limits
   - Verify Base64 encoding is working
   - Check backend image upload configuration

4. **Authentication Issues**
   - Clear localStorage and try again
   - Check token expiration
   - Verify backend authentication endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of a MERN stack application. Please refer to the main project repository for license information.

## 👥 Authors

- Project created as part of MERN stack development

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors and open-source libraries used in this project

---

**Note**: This is the client-side (frontend) of the Share Memories application. Make sure the backend server is running and properly configured for the application to work correctly.
