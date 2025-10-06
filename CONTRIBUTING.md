# Contributing Guide

Thank you for considering contributing to this project! This document provides guidelines and standards for contributing code, documentation, and other improvements.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Documentation Standards](#documentation-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js >= 14.x
- npm >= 6.x or yarn >= 1.22
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/project-name.git
cd project-name
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/original/project-name.git
```

4. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

---

## Development Setup

### Installation

Install project dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

### Building the Project

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

---

## Code Standards

### General Principles

1. **Clarity**: Write clear, readable code that others can understand
2. **Simplicity**: Keep it simple; avoid unnecessary complexity
3. **Consistency**: Follow existing patterns and conventions
4. **Documentation**: Document public APIs, complex logic, and non-obvious code
5. **Testing**: Write tests for new features and bug fixes

### JavaScript/TypeScript Style Guide

#### Naming Conventions

```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserData() {}

// Classes and Components: PascalCase
class UserManager {}
function UserProfile() {}

// Constants: UPPER_SNAKE_CASE
const API_KEY = 'abc123';
const MAX_RETRIES = 3;

// Private methods: prefix with underscore
class MyClass {
  _privateMethod() {}
}

// Boolean variables: prefix with is, has, should
const isActive = true;
const hasPermission = false;
const shouldUpdate = true;
```

#### File Organization

```javascript
// 1. Imports (grouped and sorted)
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Type definitions
interface Props {
  id: string;
  name: string;
}

// 3. Constants
const DEFAULT_LIMIT = 10;

// 4. Helper functions
function formatData(data) {
  // ...
}

// 5. Main component/function
export function MyComponent(props: Props) {
  // ...
}

// 6. Default export (if applicable)
export default MyComponent;
```

#### Function Guidelines

```javascript
// Good: Single responsibility, descriptive name
function calculateTotalPrice(items, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 + taxRate);
}

// Good: Early returns for clarity
function getUserRole(user) {
  if (!user) return 'guest';
  if (user.isAdmin) return 'admin';
  return 'user';
}

// Good: Destructuring for cleaner code
function UserProfile({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

#### Async/Await

```javascript
// Good: Use async/await for cleaner async code
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Bad: Promise chains
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Failed to fetch user:', error);
      throw error;
    });
}
```

#### Error Handling

```javascript
// Good: Specific error messages
if (!userId) {
  throw new Error('User ID is required');
}

// Good: Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Good: Comprehensive error handling
async function processData(data) {
  try {
    validateData(data);
    const result = await saveData(data);
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation failed:', error.field, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
```

### React/Component Guidelines

#### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * UserCard component displays user information
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - User ID
 * @param {Function} props.onDelete - Delete callback
 */
function UserCard({ userId, onDelete }) {
  // 1. State declarations
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Effects
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  // 3. Event handlers
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      onDelete(userId);
    }
  };
  
  // 4. Render logic
  if (loading) return <Spinner />;
  if (!user) return <ErrorMessage />;
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

// 5. PropTypes
UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserCard;
```

#### Hooks Best Practices

```javascript
// Good: Custom hooks for reusable logic
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  // ...
}
```

### TypeScript Guidelines

```typescript
// Good: Explicit types for function parameters and return values
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Good: Interface for object shapes
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Good: Generic types
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

// Good: Type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}
```

---

## Documentation Standards

### Code Comments

#### When to Comment

- **Public APIs**: Always document public functions, classes, and components
- **Complex Logic**: Explain non-obvious algorithms or business logic
- **Workarounds**: Document why a workaround was necessary
- **TODOs**: Mark future improvements clearly

#### JSDoc Format

```javascript
/**
 * Calculate the total price including tax
 * 
 * @param {number[]} prices - Array of item prices
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns {number} Total price including tax
 * @throws {Error} If prices is not an array or taxRate is negative
 * 
 * @example
 * const total = calculateTotal([10, 20, 30], 0.08);
 * console.log(total); // 64.8
 */
function calculateTotal(prices, taxRate) {
  if (!Array.isArray(prices)) {
    throw new Error('Prices must be an array');
  }
  if (taxRate < 0) {
    throw new Error('Tax rate cannot be negative');
  }
  
  const subtotal = prices.reduce((sum, price) => sum + price, 0);
  return subtotal * (1 + taxRate);
}
```

### README Documentation

Every feature or component should be documented in the main README or linked documentation with:

1. **Purpose**: What the feature does
2. **Installation**: How to install/import
3. **API Reference**: Complete prop/parameter list
4. **Examples**: Multiple usage examples
5. **Error Handling**: Common errors and solutions

### API Documentation

For public APIs, provide:

1. **Endpoint**: URL and HTTP method
2. **Authentication**: Requirements
3. **Parameters**: All parameters with types
4. **Request Example**: Working code example
5. **Response Example**: Sample response
6. **Error Codes**: All possible errors

---

## Testing Requirements

### Test Coverage

- **Minimum coverage**: 80% for new code
- **Critical paths**: 100% coverage for core functionality
- **Edge cases**: Test boundary conditions and error states

### Test Structure

```javascript
describe('calculateTotal', () => {
  describe('with valid inputs', () => {
    it('calculates total for single item', () => {
      const result = calculateTotal([10], 0.08);
      expect(result).toBe(10.8);
    });
    
    it('calculates total for multiple items', () => {
      const result = calculateTotal([10, 20, 30], 0.08);
      expect(result).toBe(64.8);
    });
    
    it('handles zero tax rate', () => {
      const result = calculateTotal([10, 20], 0);
      expect(result).toBe(30);
    });
  });
  
  describe('with invalid inputs', () => {
    it('throws error for non-array prices', () => {
      expect(() => calculateTotal('invalid', 0.08)).toThrow();
    });
    
    it('throws error for negative tax rate', () => {
      expect(() => calculateTotal([10], -0.1)).toThrow();
    });
  });
});
```

### Component Testing

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  it('renders user information', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onDelete when delete button clicked', () => {
    const handleDelete = jest.fn();
    render(<UserCard user={mockUser} onDelete={handleDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledWith('123');
  });
  
  it('shows loading state', () => {
    render(<UserCard user={null} loading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

---

## Pull Request Process

### Before Submitting

1. ✅ Code follows style guidelines
2. ✅ All tests pass
3. ✅ New code has tests
4. ✅ Documentation is updated
5. ✅ No linting errors
6. ✅ Commit messages are clear

### PR Title Format

```
type(scope): Brief description

Examples:
feat(api): Add user authentication endpoint
fix(ui): Fix button alignment in modal
docs(readme): Update installation instructions
test(utils): Add tests for formatDate function
refactor(components): Simplify DataTable logic
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
- [ ] Dependent changes merged

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #123
```

### Review Process

1. Submit PR with complete description
2. Wait for automated checks to pass
3. Request review from maintainers
4. Address review feedback
5. Wait for approval
6. Maintainer will merge

---

## Issue Guidelines

### Bug Reports

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
 - OS: [e.g., Windows 10]
 - Browser: [e.g., Chrome 96]
 - Version: [e.g., 1.2.3]

**Additional context**
Any other relevant information
```

### Feature Requests

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of desired functionality

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Any other relevant information
```

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Join our [Discord community](https://discord.gg/example)
- Email us at contributors@example.com

Thank you for contributing! 🎉

---

**Last Updated**: 2025-10-06
