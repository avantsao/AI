# API Documentation Guide

This document provides comprehensive guidelines and templates for documenting APIs in this project.

## Table of Contents

- [API Documentation Standards](#api-documentation-standards)
- [REST API Endpoints](#rest-api-endpoints)
- [Authentication](#authentication)
- [Request/Response Format](#requestresponse-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Versioning](#versioning)

---

## API Documentation Standards

### General Principles

1. **Clarity**: Documentation should be clear and easy to understand
2. **Completeness**: Include all parameters, return values, and possible errors
3. **Examples**: Provide working code examples for every endpoint
4. **Consistency**: Use consistent formatting and terminology
5. **Maintenance**: Keep documentation in sync with code changes

### Documentation Structure

Each API endpoint should include:

- **Endpoint URL**: The path to the endpoint
- **HTTP Method**: GET, POST, PUT, DELETE, etc.
- **Description**: Brief explanation of what the endpoint does
- **Authentication**: Required authentication method
- **Parameters**: All query, path, and body parameters
- **Request Example**: Sample request with all parameters
- **Response Example**: Sample successful response
- **Error Responses**: All possible error scenarios
- **Rate Limiting**: Any rate limits that apply

---

## REST API Endpoints

### Endpoint Template

```markdown
### METHOD /api/endpoint

Brief description of what this endpoint does.

**Authentication Required**: Yes/No

**Rate Limit**: X requests per minute

#### Parameters

##### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Resource identifier |

##### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | `1` | Page number |
| `limit` | `number` | No | `10` | Items per page |
| `sort` | `string` | No | `'createdAt'` | Sort field |
| `order` | `'asc' \| 'desc'` | No | `'desc'` | Sort order |

##### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Resource name |
| `email` | `string` | Yes | Email address |
| `age` | `number` | No | User age |

#### Request Example

\`\`\`bash
curl -X POST https://api.example.com/api/endpoint \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
\`\`\`

\`\`\`javascript
const response = await fetch('https://api.example.com/api/endpoint', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  })
});

const data = await response.json();
\`\`\`

#### Response

**Status Code**: 200 OK

\`\`\`json
{
  "success": true,
  "data": {
    "id": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2025-10-06T00:00:00Z",
    "updatedAt": "2025-10-06T00:00:00Z"
  },
  "meta": {
    "timestamp": "2025-10-06T00:00:00Z",
    "requestId": "req_abc123"
  }
}
\`\`\`

#### Error Responses

**400 Bad Request**

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\`

**401 Unauthorized**

\`\`\`json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
\`\`\`

**404 Not Found**

\`\`\`json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
\`\`\`

**429 Too Many Requests**

\`\`\`json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "retryAfter": 60
  }
}
\`\`\`

**500 Internal Server Error**

\`\`\`json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
\`\`\`
```

---

## Authentication

### API Key Authentication

Include your API key in the `Authorization` header:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Sign up for an account at [https://app.example.com/signup](https://app.example.com/signup)
2. Navigate to Settings > API Keys
3. Click "Generate New API Key"
4. Copy and securely store your API key

### Security Best Practices

- **Never commit API keys** to version control
- **Use environment variables** to store API keys
- **Rotate keys regularly** (recommended: every 90 days)
- **Use different keys** for development and production
- **Revoke compromised keys** immediately

### Example Usage

```javascript
// Using environment variables
const apiKey = process.env.API_KEY;

const client = new APIClient({
  apiKey: apiKey,
  baseURL: 'https://api.example.com'
});
```

---

## Request/Response Format

### Request Format

All requests must include:

- **Content-Type**: `application/json` (for POST/PUT requests)
- **Authorization**: `Bearer YOUR_API_KEY`
- **User-Agent**: Your application name and version (optional but recommended)

### Response Format

All responses follow this structure:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

### Success Response

```json
{
  "success": true,
  "data": { /* your data */ },
  "meta": {
    "timestamp": "2025-10-06T00:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "fieldName",
      "reason": "validation failed"
    }
  },
  "meta": {
    "timestamp": "2025-10-06T00:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Pagination

For endpoints that return lists, pagination metadata is included:

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "meta": {
    "timestamp": "2025-10-06T00:00:00Z",
    "requestId": "req_abc123",
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

---

## Error Handling

### Standard Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request parameters failed validation |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `METHOD_NOT_ALLOWED` | 405 | HTTP method not supported |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Error Handling Best Practices

```javascript
async function makeAPICall() {
  try {
    const response = await client.get('/endpoint');
    return response.data;
  } catch (error) {
    // Check for specific error codes
    switch (error.code) {
      case 'VALIDATION_ERROR':
        console.error('Invalid input:', error.details);
        break;
      case 'UNAUTHORIZED':
        console.error('Please check your API key');
        break;
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Too many requests. Retry after:', error.retryAfter);
        break;
      default:
        console.error('API error:', error.message);
    }
    throw error;
  }
}
```

### Retry Logic

For transient errors (rate limiting, server errors), implement exponential backoff:

```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Retry on rate limit or server errors
      if ([429, 500, 503].includes(error.status)) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Don't retry on client errors
      }
    }
  }
}

// Usage
const data = await retryWithBackoff(() => client.get('/endpoint'));
```

---

## Rate Limiting

### Rate Limit Policy

| Tier | Requests per Minute | Requests per Hour |
|------|---------------------|-------------------|
| Free | 60 | 1,000 |
| Basic | 600 | 10,000 |
| Pro | 3,000 | 100,000 |
| Enterprise | Custom | Custom |

### Rate Limit Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1696550400
```

### Handling Rate Limits

```javascript
async function makeRateLimitedRequest() {
  try {
    const response = await client.get('/endpoint');
    
    // Check remaining rate limit
    const remaining = response.headers['x-ratelimit-remaining'];
    if (remaining < 10) {
      console.warn('Approaching rate limit');
    }
    
    return response.data;
  } catch (error) {
    if (error.status === 429) {
      const retryAfter = error.retryAfter || 60;
      console.log(`Rate limited. Retry after ${retryAfter} seconds`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return makeRateLimitedRequest(); // Retry
    }
    throw error;
  }
}
```

---

## Versioning

### Version Strategy

The API uses URL-based versioning:

- **Current version**: `v1`
- **Base URL**: `https://api.example.com/v1`

### Version Lifecycle

- **Active**: Fully supported, receives new features and bug fixes
- **Deprecated**: Supported for 12 months, no new features
- **Sunset**: No longer available

### Using Specific Versions

```javascript
// Version 1
const clientV1 = new APIClient({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.example.com/v1'
});

// Version 2 (when available)
const clientV2 = new APIClient({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.example.com/v2'
});
```

### Deprecation Notices

Deprecated endpoints include warnings in response headers:

```
Warning: 299 - "This endpoint is deprecated and will be removed on 2026-01-01"
```

---

## Complete API Reference

### Users API

#### GET /api/v1/users

List all users with pagination and filtering.

**Authentication**: Required  
**Rate Limit**: 100 requests per minute

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | `number` | No | `1` | Page number |
| `limit` | `number` | No | `10` | Items per page (max: 100) |
| `status` | `'active' \| 'inactive'` | No | - | Filter by status |
| `role` | `string` | No | - | Filter by role |
| `search` | `string` | No | - | Search by name or email |
| `sort` | `string` | No | `'createdAt'` | Sort field |
| `order` | `'asc' \| 'desc'` | No | `'desc'` | Sort order |

**Example:**

```bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10&status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-10-01T00:00:00Z",
      "updatedAt": "2025-10-06T00:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

---

#### GET /api/v1/users/:id

Get a specific user by ID.

**Authentication**: Required  
**Rate Limit**: 100 requests per minute

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | User ID |

**Example:**

```bash
curl -X GET "https://api.example.com/v1/users/user_123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "status": "active",
    "profile": {
      "avatar": "https://cdn.example.com/avatars/user_123.jpg",
      "bio": "Software engineer",
      "location": "San Francisco, CA"
    },
    "createdAt": "2025-10-01T00:00:00Z",
    "updatedAt": "2025-10-06T00:00:00Z"
  }
}
```

---

#### POST /api/v1/users

Create a new user.

**Authentication**: Required (Admin role)  
**Rate Limit**: 50 requests per minute

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | User's full name |
| `email` | `string` | Yes | Email address (must be unique) |
| `password` | `string` | Yes | Password (min 8 characters) |
| `role` | `'admin' \| 'user'` | No | User role (default: 'user') |

**Example:**

```javascript
const newUser = await client.post('/users', {
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: 'SecurePass123!',
  role: 'user'
});
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_456",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2025-10-06T00:00:00Z",
    "updatedAt": "2025-10-06T00:00:00Z"
  }
}
```

---

#### PUT /api/v1/users/:id

Update an existing user.

**Authentication**: Required  
**Rate Limit**: 50 requests per minute

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | User ID |

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | User's full name |
| `email` | `string` | No | Email address |
| `status` | `'active' \| 'inactive'` | No | User status |
| `role` | `'admin' \| 'user'` | No | User role (Admin only) |

**Example:**

```javascript
const updatedUser = await client.put('/users/user_456', {
  name: 'Jane Doe',
  status: 'inactive'
});
```

---

#### DELETE /api/v1/users/:id

Delete a user.

**Authentication**: Required (Admin role)  
**Rate Limit**: 20 requests per minute

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | User ID |

**Example:**

```javascript
await client.delete('/users/user_456');
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_456",
    "deleted": true
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { APIClient } from 'api-client';

// Initialize client
const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: 'https://api.example.com/v1'
});

// List users
const users = await client.users.list({
  page: 1,
  limit: 10,
  status: 'active'
});

// Get specific user
const user = await client.users.get('user_123');

// Create user
const newUser = await client.users.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123!'
});

// Update user
const updatedUser = await client.users.update('user_123', {
  name: 'John Smith'
});

// Delete user
await client.users.delete('user_123');
```

### Python

```python
from api_client import APIClient

# Initialize client
client = APIClient(
    api_key=os.environ['API_KEY'],
    base_url='https://api.example.com/v1'
)

# List users
users = client.users.list(page=1, limit=10, status='active')

# Get specific user
user = client.users.get('user_123')

# Create user
new_user = client.users.create(
    name='John Doe',
    email='john@example.com',
    password='SecurePass123!'
)

# Update user
updated_user = client.users.update('user_123', name='John Smith')

# Delete user
client.users.delete('user_123')
```

---

## Additional Resources

- [Authentication Guide](./AUTHENTICATION.md)
- [Rate Limiting Guide](./RATE_LIMITING.md)
- [Error Handling Guide](./ERROR_HANDLING.md)
- [API Changelog](./CHANGELOG.md)
- [SDK Documentation](./SDK.md)

---

**Last Updated**: 2025-10-06
