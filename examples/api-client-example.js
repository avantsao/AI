/**
 * API Client Usage Examples
 * 
 * This file demonstrates various ways to use the API client
 * for making HTTP requests to the API.
 */

import { APIClient } from '../src/api/client';

// ========================================
// 1. Basic Setup
// ========================================

// Initialize the API client
const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: 'https://api.example.com/v1',
  timeout: 5000,
  retries: 3
});

// ========================================
// 2. GET Requests
// ========================================

/**
 * Example: Fetch all users
 */
async function getAllUsers() {
  try {
    const response = await client.get('/users', {
      page: 1,
      limit: 10,
      status: 'active'
    });
    
    console.log('Users:', response.data);
    console.log('Total:', response.meta.pagination.total);
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    throw error;
  }
}

/**
 * Example: Fetch a single user by ID
 */
async function getUserById(userId) {
  try {
    const response = await client.get(`/users/${userId}`);
    console.log('User details:', response.data);
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      console.error('User not found');
    } else {
      console.error('Error fetching user:', error.message);
    }
    throw error;
  }
}

/**
 * Example: Search users with filters
 */
async function searchUsers(searchTerm) {
  try {
    const response = await client.get('/users', {
      search: searchTerm,
      fields: 'id,name,email',
      sort: 'name',
      order: 'asc'
    });
    
    return response.data;
  } catch (error) {
    console.error('Search failed:', error.message);
    return [];
  }
}

// ========================================
// 3. POST Requests
// ========================================

/**
 * Example: Create a new user
 */
async function createUser(userData) {
  try {
    const response = await client.post('/users', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user'
    });
    
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') {
      console.error('Validation failed:', error.details);
    } else if (error.status === 409) {
      console.error('User already exists');
    } else {
      console.error('Failed to create user:', error.message);
    }
    throw error;
  }
}

/**
 * Example: Upload a file
 */
async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'documents');
    
    const response = await client.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('File uploaded:', response.data.url);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error.message);
    throw error;
  }
}

// ========================================
// 4. PUT Requests
// ========================================

/**
 * Example: Update user information
 */
async function updateUser(userId, updates) {
  try {
    const response = await client.put(`/users/${userId}`, updates);
    console.log('User updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update failed:', error.message);
    throw error;
  }
}

/**
 * Example: Partial update with PATCH
 */
async function patchUser(userId, partialData) {
  try {
    const response = await client.patch(`/users/${userId}`, partialData);
    return response.data;
  } catch (error) {
    console.error('Patch failed:', error.message);
    throw error;
  }
}

// ========================================
// 5. DELETE Requests
// ========================================

/**
 * Example: Delete a user
 */
async function deleteUser(userId) {
  try {
    await client.delete(`/users/${userId}`);
    console.log('User deleted successfully');
    return true;
  } catch (error) {
    console.error('Delete failed:', error.message);
    throw error;
  }
}

/**
 * Example: Bulk delete users
 */
async function bulkDeleteUsers(userIds) {
  try {
    const response = await client.post('/users/bulk-delete', {
      ids: userIds
    });
    
    console.log(`Deleted ${response.data.count} users`);
    return response.data;
  } catch (error) {
    console.error('Bulk delete failed:', error.message);
    throw error;
  }
}

// ========================================
// 6. Error Handling
// ========================================

/**
 * Example: Comprehensive error handling
 */
async function robustAPICall() {
  try {
    const response = await client.get('/users');
    return response.data;
  } catch (error) {
    // Handle specific error codes
    switch (error.code) {
      case 'VALIDATION_ERROR':
        console.error('Invalid request:', error.details);
        break;
        
      case 'UNAUTHORIZED':
        console.error('Authentication failed. Please check your API key.');
        // Redirect to login or refresh token
        break;
        
      case 'FORBIDDEN':
        console.error('Insufficient permissions');
        break;
        
      case 'NOT_FOUND':
        console.error('Resource not found');
        break;
        
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Rate limit exceeded. Retry after:', error.retryAfter);
        // Implement retry with backoff
        await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
        return robustAPICall(); // Retry
        
      case 'INTERNAL_ERROR':
        console.error('Server error. Please try again later.');
        break;
        
      default:
        console.error('Unexpected error:', error.message);
    }
    
    throw error;
  }
}

// ========================================
// 7. Advanced Features
// ========================================

/**
 * Example: Pagination helper
 */
async function getAllUsersWithPagination() {
  const allUsers = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await client.get('/users', {
      page,
      limit: 100
    });
    
    allUsers.push(...response.data);
    
    hasMore = page < response.meta.pagination.totalPages;
    page++;
  }
  
  console.log(`Fetched ${allUsers.length} total users`);
  return allUsers;
}

/**
 * Example: Parallel requests
 */
async function fetchMultipleResources() {
  try {
    const [users, products, orders] = await Promise.all([
      client.get('/users'),
      client.get('/products'),
      client.get('/orders')
    ]);
    
    return {
      users: users.data,
      products: products.data,
      orders: orders.data
    };
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    throw error;
  }
}

/**
 * Example: Request with custom headers
 */
async function customHeadersRequest() {
  const response = await client.get('/users', null, {
    headers: {
      'X-Custom-Header': 'value',
      'Accept-Language': 'en-US'
    }
  });
  
  return response.data;
}

/**
 * Example: Retry logic with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Only retry on specific errors
      if ([429, 500, 503].includes(error.status)) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Don't retry on client errors
      }
    }
  }
}

// Usage
async function reliableRequest() {
  return retryWithBackoff(() => client.get('/users'));
}

// ========================================
// 8. Real-world Use Cases
// ========================================

/**
 * Example: User management dashboard
 */
async function userManagementDashboard() {
  try {
    // Fetch dashboard data
    const [users, stats, recentActivity] = await Promise.all([
      client.get('/users', { limit: 10, status: 'active' }),
      client.get('/stats/users'),
      client.get('/activity/recent', { limit: 5 })
    ]);
    
    return {
      users: users.data,
      stats: stats.data,
      recentActivity: recentActivity.data
    };
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error;
  }
}

/**
 * Example: Form submission with validation
 */
async function submitRegistrationForm(formData) {
  // Client-side validation
  if (!formData.email || !formData.password) {
    throw new Error('Email and password are required');
  }
  
  try {
    const response = await client.post('/auth/register', {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      agreeToTerms: formData.agreeToTerms
    });
    
    console.log('Registration successful:', response.data);
    
    // Store authentication token
    localStorage.setItem('authToken', response.data.token);
    
    return response.data;
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') {
      // Show field-specific errors
      throw new Error(`Validation failed: ${error.details.field} - ${error.message}`);
    } else if (error.status === 409) {
      throw new Error('An account with this email already exists');
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }
}

/**
 * Example: Data export
 */
async function exportUsersToCSV() {
  try {
    const response = await client.get('/users/export', {
      format: 'csv',
      fields: 'id,name,email,role,createdAt'
    }, {
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_${Date.now()}.csv`;
    link.click();
    
    console.log('Export complete');
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

// ========================================
// 9. Utility Functions
// ========================================

/**
 * Example: Check API health
 */
async function checkAPIHealth() {
  try {
    const response = await client.get('/health');
    console.log('API Status:', response.data.status);
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('API is not responding');
    return false;
  }
}

/**
 * Example: Get rate limit status
 */
async function getRateLimitStatus() {
  try {
    const response = await client.get('/rate-limit');
    console.log('Rate limit:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get rate limit:', error);
    return null;
  }
}

// Export examples
export {
  getAllUsers,
  getUserById,
  searchUsers,
  createUser,
  uploadFile,
  updateUser,
  patchUser,
  deleteUser,
  bulkDeleteUsers,
  robustAPICall,
  getAllUsersWithPagination,
  fetchMultipleResources,
  customHeadersRequest,
  reliableRequest,
  userManagementDashboard,
  submitRegistrationForm,
  exportUsersToCSV,
  checkAPIHealth,
  getRateLimitStatus
};
