# Quick Start Guide

Get up and running with this project in minutes!

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Your First API Call](#your-first-api-call)
- [Your First Component](#your-first-component)
- [Common Patterns](#common-patterns)
- [Next Steps](#next-steps)

---

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js >= 14.x
- npm >= 6.x or yarn >= 1.22

### Install the Package

```bash
npm install @project/api-client
# or
yarn add @project/api-client
```

### Get Your API Key

1. Sign up at [https://app.example.com/signup](https://app.example.com/signup)
2. Navigate to **Settings > API Keys**
3. Click **Generate New API Key**
4. Copy your API key

### Set Up Environment Variables

Create a `.env` file in your project root:

```env
API_KEY=your_api_key_here
API_BASE_URL=https://api.example.com/v1
```

---

## Basic Usage

### Initialize the Client

```javascript
import { APIClient } from '@project/api-client';

const client = new APIClient({
  apiKey: process.env.API_KEY,
  baseURL: process.env.API_BASE_URL || 'https://api.example.com/v1'
});
```

---

## Your First API Call

### Fetch Data

```javascript
async function fetchUsers() {
  try {
    const response = await client.get('/users');
    console.log('Users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function
fetchUsers();
```

### Create a Resource

```javascript
async function createUser() {
  try {
    const newUser = await client.post('/users', {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    });
    
    console.log('Created user:', newUser.data);
    return newUser.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createUser();
```

### Update a Resource

```javascript
async function updateUser(userId) {
  try {
    const updated = await client.put(`/users/${userId}`, {
      name: 'Jane Doe'
    });
    
    console.log('Updated user:', updated.data);
    return updated.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateUser('user_123');
```

### Delete a Resource

```javascript
async function deleteUser(userId) {
  try {
    await client.delete(`/users/${userId}`);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

deleteUser('user_123');
```

---

## Your First Component

### Using the DataTable Component

```jsx
import React, { useState, useEffect } from 'react';
import { DataTable } from '@project/components';
import { APIClient } from '@project/api-client';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const client = new APIClient({
    apiKey: process.env.REACT_APP_API_KEY
  });
  
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await client.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUsers();
  }, []);
  
  const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' }
  ];
  
  return (
    <div>
      <h1>Users</h1>
      <DataTable
        data={users}
        columns={columns}
        loading={loading}
        sortable={true}
        paginated={true}
      />
    </div>
  );
}

export default UsersTable;
```

### Using the Form Component

```jsx
import React, { useState } from 'react';
import { Form, Alert } from '@project/components';
import { APIClient } from '@project/api-client';

function CreateUserForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const client = new APIClient({
    apiKey: process.env.REACT_APP_API_KEY
  });
  
  const fields = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'john@example.com',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ]
    }
  ];
  
  const handleSubmit = async (values) => {
    try {
      await client.post('/users', values);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };
  
  return (
    <div>
      <h1>Create User</h1>
      
      {success && <Alert variant="success">User created successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Create User"
      />
    </div>
  );
}

export default CreateUserForm;
```

---

## Common Patterns

### Pattern 1: Fetch and Display Data

```jsx
import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from '@project/components';
import { APIClient } from '@project/api-client';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const client = new APIClient({
    apiKey: process.env.REACT_APP_API_KEY
  });
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await client.get(`/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="info">User not found</Alert>;
  
  return (
    <Card>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </Card>
  );
}
```

### Pattern 2: Search with Debouncing

```jsx
import React, { useState, useCallback } from 'react';
import { Input } from '@project/components';
import { debounce } from '@project/utils';
import { APIClient } from '@project/api-client';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const client = new APIClient({
    apiKey: process.env.REACT_APP_API_KEY
  });
  
  const performSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await client.get('/users', {
          search: searchQuery
        });
        setResults(response.data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };
  
  return (
    <div>
      <Input
        placeholder="Search users..."
        value={query}
        onChange={handleChange}
      />
      
      {loading && <p>Searching...</p>}
      
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Pattern 3: CRUD Operations

```jsx
import React, { useState, useEffect } from 'react';
import { DataTable, Button, Modal, Form } from '@project/components';
import { APIClient } from '@project/api-client';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const client = new APIClient({
    apiKey: process.env.REACT_APP_API_KEY
  });
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    const response = await client.get('/users');
    setUsers(response.data);
  };
  
  const handleCreate = async (values) => {
    await client.post('/users', values);
    loadUsers();
    setShowModal(false);
  };
  
  const handleUpdate = async (values) => {
    await client.put(`/users/${editingUser.id}`, values);
    loadUsers();
    setShowModal(false);
    setEditingUser(null);
  };
  
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure?')) {
      await client.delete(`/users/${userId}`);
      loadUsers();
    }
  };
  
  const columns = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    {
      id: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <>
          <Button size="sm" onClick={() => {
            setEditingUser(row);
            setShowModal(true);
          }}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </>
      )
    }
  ];
  
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add User</Button>
      
      <DataTable data={users} columns={columns} />
      
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
      >
        <Form
          fields={[
            { name: 'name', type: 'text', label: 'Name', required: true },
            { name: 'email', type: 'email', label: 'Email', required: true }
          ]}
          initialValues={editingUser}
          onSubmit={editingUser ? handleUpdate : handleCreate}
        />
      </Modal>
    </div>
  );
}
```

---

## Next Steps

### Learn More

- 📚 [Full API Documentation](./API_DOCUMENTATION.md)
- 🎨 [Component Documentation](./COMPONENT_DOCUMENTATION.md)
- 📖 [Complete Examples](../examples/)

### Common Tasks

- **Authentication**: See [Authentication Guide](./API_DOCUMENTATION.md#authentication)
- **Error Handling**: See [Error Handling Guide](./API_DOCUMENTATION.md#error-handling)
- **Testing**: See [Testing Guide](../CONTRIBUTING.md#testing-requirements)

### Get Help

- 💬 [Discord Community](https://discord.gg/example)
- 📧 Email: support@example.com
- 🐛 [Report Issues](https://github.com/your-repo/issues)

---

**Happy Coding! 🚀**
