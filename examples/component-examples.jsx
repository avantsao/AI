/**
 * Component Usage Examples
 * 
 * This file demonstrates various ways to use the UI components
 * in different scenarios.
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  DataTable,
  Form,
  Modal,
  Card,
  Alert,
  Badge,
  Spinner,
  Input,
  Select,
  Checkbox
} from '../src/components';

// ========================================
// 1. Button Examples
// ========================================

export function ButtonExamples() {
  return (
    <div className="examples">
      <h2>Button Examples</h2>
      
      {/* Basic buttons */}
      <section>
        <h3>Basic Buttons</h3>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </section>
      
      {/* Button sizes */}
      <section>
        <h3>Button Sizes</h3>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </section>
      
      {/* Button states */}
      <section>
        <h3>Button States</h3>
        <Button disabled>Disabled</Button>
        <Button loading>Loading...</Button>
      </section>
      
      {/* Buttons with icons */}
      <section>
        <h3>Buttons with Icons</h3>
        <Button icon={<PlusIcon />}>Add Item</Button>
        <Button icon={<TrashIcon />} iconPosition="right">Delete</Button>
        <Button icon={<DownloadIcon />} aria-label="Download" />
      </section>
    </div>
  );
}

// ========================================
// 2. DataTable Examples
// ========================================

export function DataTableExamples() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const columns = [
    {
      id: 'id',
      header: 'ID',
      accessor: 'id',
      width: '80px',
      sortable: true
    },
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      sortable: true
    },
    {
      id: 'email',
      header: 'Email',
      accessor: 'email',
      sortable: true
    },
    {
      id: 'role',
      header: 'Role',
      accessor: 'role',
      render: (value) => <Badge color="blue">{value}</Badge>
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <Badge color={value === 'active' ? 'green' : 'red'}>
          {value}
        </Badge>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div>
          <Button size="sm" onClick={() => handleEdit(row)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      )
    }
  ];
  
  const handleEdit = (row) => {
    console.log('Edit:', row);
  };
  
  const handleDelete = (row) => {
    if (window.confirm(`Delete ${row.name}?`)) {
      setUsers(users.filter(u => u.id !== row.id));
    }
  };
  
  return (
    <div className="examples">
      <h2>DataTable Examples</h2>
      
      <DataTable
        data={users}
        columns={columns}
        loading={loading}
        sortable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
        selectable={true}
        onSelectionChange={setSelectedRows}
        emptyMessage="No users found"
      />
      
      {selectedRows.length > 0 && (
        <Alert variant="info">
          {selectedRows.length} row(s) selected
        </Alert>
      )}
    </div>
  );
}

// ========================================
// 3. Form Examples
// ========================================

export function FormExamples() {
  const [submitted, setSubmitted] = useState(false);
  
  const fields = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'you@example.com',
      required: true
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      placeholder: '18',
      min: 18,
      max: 120
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' }
      ]
    },
    {
      name: 'subscribe',
      type: 'checkbox',
      label: 'Subscribe to newsletter'
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself',
      rows: 4
    }
  ];
  
  const validation = {
    firstName: (value) => {
      if (value.length < 2) return 'First name must be at least 2 characters';
      return null;
    },
    email: (value) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      }
      return null;
    },
    age: (value) => {
      if (value && (value < 18 || value > 120)) {
        return 'Age must be between 18 and 120';
      }
      return null;
    }
  };
  
  const handleSubmit = async (values) => {
    console.log('Form submitted:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <Alert variant="success">
        Form submitted successfully!
      </Alert>
    );
  }
  
  return (
    <div className="examples">
      <h2>Form Examples</h2>
      
      <Form
        fields={fields}
        validation={validation}
        onSubmit={handleSubmit}
        submitLabel="Submit Form"
      />
    </div>
  );
}

// ========================================
// 4. Modal Examples
// ========================================

export function ModalExamples() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const handleConfirmDelete = () => {
    console.log('Item deleted');
    setConfirmOpen(false);
  };
  
  return (
    <div className="examples">
      <h2>Modal Examples</h2>
      
      {/* Basic modal */}
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="md"
      >
        <p>This is a basic modal example.</p>
        <p>You can put any content here.</p>
        <div className="modal-actions">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Modal>
      
      {/* Confirmation modal */}
      <Button variant="danger" onClick={() => setConfirmOpen(true)}>
        Delete Item
      </Button>
      
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone.</p>
        <div className="modal-actions">
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// ========================================
// 5. Card Examples
// ========================================

export function CardExamples() {
  return (
    <div className="examples">
      <h2>Card Examples</h2>
      
      <div className="card-grid">
        {/* Basic card */}
        <Card>
          <h3>Basic Card</h3>
          <p>This is a simple card with content.</p>
        </Card>
        
        {/* Card with header and footer */}
        <Card
          header={<h3>Card with Header</h3>}
          footer={<Button fullWidth>Action</Button>}
        >
          <p>Card content goes here.</p>
        </Card>
        
        {/* Card with image */}
        <Card
          image="https://via.placeholder.com/400x200"
          imageAlt="Placeholder"
        >
          <h3>Product Name</h3>
          <p>$99.99</p>
          <Button variant="primary">Add to Cart</Button>
        </Card>
      </div>
    </div>
  );
}

// ========================================
// 6. Alert Examples
// ========================================

export function AlertExamples() {
  const [showAlert, setShowAlert] = useState(true);
  
  return (
    <div className="examples">
      <h2>Alert Examples</h2>
      
      <Alert variant="success">
        Success! Your changes have been saved.
      </Alert>
      
      <Alert variant="info">
        Information: Please review your settings.
      </Alert>
      
      <Alert variant="warning">
        Warning: Your session will expire soon.
      </Alert>
      
      <Alert variant="danger">
        Error: Failed to save changes.
      </Alert>
      
      {/* Dismissible alert */}
      {showAlert && (
        <Alert
          variant="info"
          dismissible
          onDismiss={() => setShowAlert(false)}
        >
          This alert can be dismissed.
        </Alert>
      )}
    </div>
  );
}

// ========================================
// 7. Complex Example: User Dashboard
// ========================================

export function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' }
      ]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddUser = async (values) => {
    console.log('Adding user:', values);
    const newUser = {
      id: users.length + 1,
      ...values,
      status: 'active'
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };
  
  const columns = [
    { id: 'id', header: 'ID', accessor: 'id', width: '80px' },
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email', sortable: true },
    {
      id: 'role',
      header: 'Role',
      accessor: 'role',
      render: (value) => <Badge color="blue">{value}</Badge>
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <Badge color={value === 'active' ? 'green' : 'red'}>{value}</Badge>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            setSelectedUser(row);
            setShowDeleteModal(true);
          }}
        >
          Delete
        </Button>
      )
    }
  ];
  
  const userFormFields = [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' }
      ]
    }
  ];
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>User Management</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add User
        </Button>
      </div>
      
      <Card>
        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          sortable={true}
          paginated={true}
          pageSize={10}
        />
      </Card>
      
      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <Form
          fields={userFormFields}
          onSubmit={handleAddUser}
          submitLabel="Add User"
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <p>Are you sure you want to delete {selectedUser?.name}?</p>
        <div className="modal-actions">
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Export all examples
export default {
  ButtonExamples,
  DataTableExamples,
  FormExamples,
  ModalExamples,
  CardExamples,
  AlertExamples,
  UserDashboard
};
