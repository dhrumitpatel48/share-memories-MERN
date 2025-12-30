# Share Memories API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

The token is obtained after successful sign-in or sign-up and is valid for 1 hour.

---

## User Endpoints

### Sign In

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /user/signin`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "result": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `404 Not Found`: User does not exist
- `400 Bad Request`: Invalid credentials
- `500 Internal Server Error`: Something went wrong

---

### Sign Up

Register a new user account.

**Endpoint:** `POST /user/signup`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (200 OK):**
```json
{
  "result": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `400 Bad Request`: User already exists or passwords don't match
- `500 Internal Server Error`: Something went wrong

---

## Post Endpoints

### Get All Posts

Retrieve paginated list of all posts.

**Endpoint:** `GET /posts`

**Authentication:** Not required

**Query Parameters:**
- `page` (number, required): Page number for pagination

**Example:** `GET /posts?page=1`

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "post_id",
      "title": "Post Title",
      "message": "Post message content",
      "name": "Author Name",
      "creator": "user_id",
      "tags": ["tag1", "tag2"],
      "selectedFile": "base64_encoded_image",
      "likes": ["user_id1", "user_id2"],
      "comments": ["comment1", "comment2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "currentPage": 1,
  "numberOfPages": 5
}
```

**Response Details:**
- `data`: Array of post objects
- `currentPage`: Current page number
- `numberOfPages`: Total number of pages (6 posts per page)

**Error Response:**
- `404 Not Found`: Error message

---

### Get Post by ID

Retrieve a single post by its ID.

**Endpoint:** `GET /posts/:id`

**Authentication:** Not required

**URL Parameters:**
- `id` (string, required): Post ID

**Example:** `GET /posts/507f1f77bcf86cd799439011`

**Response (200 OK):**
```json
{
  "_id": "post_id",
  "title": "Post Title",
  "message": "Post message content",
  "name": "Author Name",
  "creator": "user_id",
  "tags": ["tag1", "tag2"],
  "selectedFile": "base64_encoded_image",
  "likes": ["user_id1", "user_id2"],
  "comments": ["comment1", "comment2"],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found`: Post not found or invalid ID

---

### Search Posts

Search posts by title or tags.

**Endpoint:** `GET /posts/search`

**Authentication:** Not required

**Query Parameters:**
- `searchQuery` (string, required): Search term for post title (case-insensitive)
- `tags` (string, required): Comma-separated list of tags

**Example:** `GET /posts/search?searchQuery=memories&tags=travel,vacation`

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "post_id",
      "title": "Post Title",
      "message": "Post message content",
      "name": "Author Name",
      "creator": "user_id",
      "tags": ["travel", "vacation"],
      "selectedFile": "base64_encoded_image",
      "likes": [],
      "comments": [],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Response:**
- `404 Not Found`: Error message

---

### Create Post

Create a new post.

**Endpoint:** `POST /posts`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Post Title",
  "message": "Post message content",
  "tags": ["tag1", "tag2"],
  "selectedFile": "base64_encoded_image"
}
```

**Response (201 Created):**
```json
{
  "_id": "post_id",
  "title": "Post Title",
  "message": "Post message content",
  "name": "Author Name",
  "creator": "user_id",
  "tags": ["tag1", "tag2"],
  "selectedFile": "base64_encoded_image",
  "likes": [],
  "comments": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `409 Conflict`: Error message
- `401 Unauthorized`: Missing or invalid token

---

### Update Post

Update an existing post.

**Endpoint:** `PATCH /posts/:id`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (string, required): Post ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "message": "Updated message content",
  "tags": ["tag1", "tag2", "tag3"],
  "selectedFile": "base64_encoded_image"
}
```

**Response (200 OK):**
```json
{
  "_id": "post_id",
  "title": "Updated Title",
  "message": "Updated message content",
  "name": "Author Name",
  "creator": "user_id",
  "tags": ["tag1", "tag2", "tag3"],
  "selectedFile": "base64_encoded_image",
  "likes": [],
  "comments": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found`: Post not found or invalid ID
- `401 Unauthorized`: Missing or invalid token

---

### Delete Post

Delete a post by ID.

**Endpoint:** `DELETE /posts/:id`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (string, required): Post ID

**Example:** `DELETE /posts/507f1f77bcf86cd799439011`

**Response (200 OK):**
```json
{
  "message": "Post Deleted Succussfully"
}
```

**Error Response:**
- `404 Not Found`: Post not found or invalid ID
- `401 Unauthorized`: Missing or invalid token

---

### Like Post

Like or unlike a post. If the user has already liked the post, it will be unliked.

**Endpoint:** `PATCH /posts/:id/likePost`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (string, required): Post ID

**Example:** `PATCH /posts/507f1f77bcf86cd799439011/likePost`

**Response (200 OK):**
```json
{
  "_id": "post_id",
  "title": "Post Title",
  "message": "Post message content",
  "name": "Author Name",
  "creator": "user_id",
  "tags": ["tag1", "tag2"],
  "selectedFile": "base64_encoded_image",
  "likes": ["user_id"],
  "comments": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found`: Post not found or invalid ID
- `401 Unauthorized`: Missing or invalid token (returns `{ "message": "Unauthenticated." }`)

---

### Comment on Post

Add a comment to a post.

**Endpoint:** `POST /posts/:id/commentPost`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (string, required): Post ID

**Request Body:**
```json
{
  "value": "This is a comment"
}
```

**Response (200 OK):**
```json
{
  "_id": "post_id",
  "title": "Post Title",
  "message": "Post message content",
  "name": "Author Name",
  "creator": "user_id",
  "tags": ["tag1", "tag2"],
  "selectedFile": "base64_encoded_image",
  "likes": [],
  "comments": ["This is a comment"],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found`: Post not found
- `401 Unauthorized`: Missing or invalid token

---

## Data Models

### User Model
```json
{
  "_id": "string (MongoDB ObjectId)",
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (hashed, required)",
  "id": "string"
}
```

### Post Model
```json
{
  "_id": "string (MongoDB ObjectId)",
  "title": "string",
  "message": "string",
  "name": "string",
  "creator": "string (user ID)",
  "tags": ["string"],
  "selectedFile": "string (base64 encoded image)",
  "likes": ["string (array of user IDs)"],
  "comments": ["string (array of comment strings)"],
  "createdAt": "string (ISO 8601 date)"
}
```

---

## Error Handling

All endpoints may return the following error responses:

- **400 Bad Request**: Invalid request data or validation error
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Resource not found or invalid ID
- **409 Conflict**: Conflict with current state (e.g., duplicate resource)
- **500 Internal Server Error**: Server-side error

Error responses follow this format:
```json
{
  "message": "Error message description"
}
```

---

## Notes

1. **Pagination**: The `GET /posts` endpoint returns 6 posts per page by default.

2. **Image Storage**: Images are stored as base64-encoded strings in the `selectedFile` field.

3. **Token Expiration**: JWT tokens expire after 1 hour. Users need to sign in again to get a new token.

4. **Like Toggle**: The like endpoint acts as a toggle - if a user has already liked a post, calling it again will unlike the post.

5. **Search**: The search endpoint performs case-insensitive title matching and tag matching. Posts matching either the title or any of the provided tags will be returned.

6. **Request Size Limit**: The server accepts request bodies up to 30MB in size.

---

## Example Usage

### Complete Flow Example

1. **Sign Up:**
```bash
POST http://localhost:5000/user/signup
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

2. **Create Post (using token from signup):**
```bash
POST http://localhost:5000/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Memory",
  "message": "This is a wonderful memory!",
  "tags": ["vacation", "summer"],
  "selectedFile": "data:image/jpeg;base64,..."
}
```

3. **Get All Posts:**
```bash
GET http://localhost:5000/posts?page=1
```

4. **Like a Post:**
```bash
PATCH http://localhost:5000/posts/<post_id>/likePost
Authorization: Bearer <token>
```

5. **Add Comment:**
```bash
POST http://localhost:5000/posts/<post_id>/commentPost
Authorization: Bearer <token>
Content-Type: application/json

{
  "value": "Great memory!"
}
```

