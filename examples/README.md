# Examples

This directory contains comprehensive examples demonstrating how to use the APIs, components, and utility functions.

## Table of Contents

- [API Client Examples](#api-client-examples)
- [Component Examples](#component-examples)
- [Utility Functions Examples](#utility-functions-examples)
- [Running the Examples](#running-the-examples)

---

## API Client Examples

**File:** [`api-client-example.js`](./api-client-example.js)

This file contains examples of:

- ✅ Initializing the API client
- ✅ GET, POST, PUT, DELETE requests
- ✅ Error handling strategies
- ✅ Pagination
- ✅ Parallel requests
- ✅ Retry logic with exponential backoff
- ✅ File uploads
- ✅ Custom headers
- ✅ Real-world use cases

### Quick Example

```javascript
import { APIClient } from '../src/api/client';

const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: 'https://api.example.com/v1'
});

// Fetch users
const users = await client.get('/users', {
  page: 1,
  limit: 10
});

console.log(users.data);
```

---

## Component Examples

**File:** [`component-examples.jsx`](./component-examples.jsx)

This file demonstrates:

- ✅ Button variants and states
- ✅ DataTable with sorting, filtering, and pagination
- ✅ Form with validation
- ✅ Modal dialogs
- ✅ Cards
- ✅ Alerts
- ✅ Complete user dashboard example

### Quick Example

```jsx
import { DataTable } from '../src/components';

function MyTable() {
  const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Name', accessor: 'name' }
  ];
  
  const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  return <DataTable data={data} columns={columns} />;
}
```

---

## Utility Functions Examples

**File:** [`utility-functions-example.js`](./utility-functions-example.js)

This file showcases:

- ✅ Date formatting
- ✅ Debouncing and throttling
- ✅ Deep cloning objects
- ✅ Validation utilities
- ✅ Array operations (groupBy, sortBy, filterBy)
- ✅ Data transformation pipelines
- ✅ Real-world combined examples

### Quick Example

```javascript
import { formatDate, debounce, groupBy } from '../src/utils';

// Format a date
const formatted = formatDate(new Date(), 'MM/DD/YYYY');

// Debounce a search function
const search = debounce((query) => {
  console.log('Searching:', query);
}, 300);

// Group users by role
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' }
];
const grouped = groupBy(users, 'role');
```

---

## Running the Examples

### Prerequisites

```bash
npm install
```

### Run Individual Examples

#### API Client Example

```bash
node examples/api-client-example.js
```

#### Component Examples (React)

```bash
# Start the development server
npm run dev

# Navigate to http://localhost:3000/examples
```

#### Utility Functions Example

```bash
node examples/utility-functions-example.js
```

### Using in Your Own Project

You can copy any example and adapt it to your needs:

```javascript
// Copy the pattern from the examples
import { APIClient } from '@project/api-client';

const client = new APIClient({
  apiKey: 'your-api-key'
});

// Use the pattern in your code
async function myFunction() {
  const data = await client.get('/endpoint');
  // Process data...
}
```

---

## Example Categories

### Basic Examples

Simple, straightforward examples perfect for getting started:

- Basic API calls (GET, POST, PUT, DELETE)
- Simple component usage
- Basic utility functions

### Intermediate Examples

More complex patterns combining multiple features:

- Error handling with retries
- Forms with validation
- Tables with sorting and filtering
- Data transformation pipelines

### Advanced Examples

Production-ready patterns:

- Complete CRUD operations
- Real-time updates with throttling
- Complex data analytics
- Full dashboard implementations

---

## Example Use Cases

### 1. User Management System

Demonstrates:
- User CRUD operations
- DataTable with pagination
- Modal dialogs for create/edit
- Form validation
- Error handling

**Files:** `component-examples.jsx` > `UserDashboard`

### 2. Search Functionality

Demonstrates:
- Debounced search input
- API integration
- Loading states
- Empty states

**Files:** `utility-functions-example.js` > `searchExample`

### 3. Data Analytics

Demonstrates:
- Grouping data
- Sorting and filtering
- Calculating aggregates
- Data visualization preparation

**Files:** `utility-functions-example.js` > `processTransactionData`

### 4. Form Submission

Demonstrates:
- Form validation
- Error handling
- Success/error feedback
- Loading states

**Files:** `component-examples.jsx` > `FormExamples`

---

## Tips for Using Examples

### 1. Start with Quick Start

If you're new to the project, start with the [Quick Start Guide](../docs/QUICK_START.md) before diving into these examples.

### 2. Copy and Modify

Don't hesitate to copy examples and modify them for your use case. That's what they're here for!

### 3. Combine Patterns

Many real-world applications need to combine multiple patterns. For example:

```javascript
// Combine debouncing with API calls and error handling
const debouncedSearch = debounce(async (query) => {
  try {
    const results = await client.get('/search', { q: query });
    setResults(results.data);
  } catch (error) {
    handleError(error);
  }
}, 300);
```

### 4. Error Handling

Always include proper error handling in production code:

```javascript
try {
  const data = await client.get('/users');
  // Handle success
} catch (error) {
  console.error('Error:', error);
  // Handle error appropriately
}
```

### 5. Environment Variables

Remember to use environment variables for sensitive data:

```javascript
const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: process.env.API_BASE_URL
});
```

---

## Additional Resources

- 📚 [Full Documentation](../readme.md)
- 🎯 [Quick Start Guide](../docs/QUICK_START.md)
- 📖 [API Documentation](../docs/API_DOCUMENTATION.md)
- 🎨 [Component Documentation](../docs/COMPONENT_DOCUMENTATION.md)
- 🤝 [Contributing Guide](../CONTRIBUTING.md)

---

## Questions?

If you have questions about any example:

1. Check the [documentation](../readme.md)
2. Search [existing issues](https://github.com/your-repo/issues)
3. Ask in [Discord](https://discord.gg/example)
4. Create a [new issue](https://github.com/your-repo/issues/new)

---

**Happy Coding! 🎉**
