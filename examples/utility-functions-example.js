/**
 * Utility Functions Usage Examples
 * 
 * This file demonstrates various utility functions
 * and their practical applications.
 */

import {
  formatDate,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  validateEmail,
  generateId,
  groupBy,
  sortBy,
  filterBy
} from '../src/utils';

// ========================================
// 1. Date Formatting Examples
// ========================================

/**
 * Example: Various date formatting options
 */
function dateFormattingExamples() {
  const date = new Date('2025-10-06T14:30:00');
  
  console.log('Default format:', formatDate(date));
  // Output: '2025-10-06'
  
  console.log('US format:', formatDate(date, 'MM/DD/YYYY'));
  // Output: '10/06/2025'
  
  console.log('With time:', formatDate(date, 'YYYY-MM-DD HH:mm:ss'));
  // Output: '2025-10-06 14:30:00'
  
  console.log('Custom format:', formatDate(date, 'DD MMM YYYY'));
  // Output: '06 Oct 2025'
}

/**
 * Example: Formatting dates in a table
 */
function formatTableDates(data) {
  return data.map(item => ({
    ...item,
    createdAt: formatDate(item.createdAt, 'MM/DD/YYYY'),
    updatedAt: formatDate(item.updatedAt, 'MM/DD/YYYY HH:mm')
  }));
}

// ========================================
// 2. Debounce Examples
// ========================================

/**
 * Example: Debounced search function
 */
function searchExample() {
  const performSearch = debounce(async (query) => {
    console.log('Searching for:', query);
    const results = await fetch(`/api/search?q=${query}`);
    return results.json();
  }, 300);
  
  // In a React component:
  // <input onChange={(e) => performSearch(e.target.value)} />
  
  return performSearch;
}

/**
 * Example: Debounced form auto-save
 */
function autoSaveForm() {
  const saveForm = debounce(async (formData) => {
    console.log('Auto-saving form...');
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    console.log('Form saved');
  }, 1000);
  
  return saveForm;
}

/**
 * Example: Debounced window resize handler
 */
function handleWindowResize() {
  const updateLayout = debounce(() => {
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    // Update layout calculations
  }, 250);
  
  window.addEventListener('resize', updateLayout);
}

// ========================================
// 3. Throttle Examples
// ========================================

/**
 * Example: Throttled scroll handler
 */
function scrollExample() {
  const handleScroll = throttle(() => {
    const scrollPosition = window.scrollY;
    console.log('Scroll position:', scrollPosition);
    
    // Update UI based on scroll position
    if (scrollPosition > 100) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
}

/**
 * Example: Throttled mouse move tracking
 */
function mouseTrackingExample() {
  const trackMouse = throttle((event) => {
    console.log('Mouse position:', event.clientX, event.clientY);
    // Send analytics data
  }, 500);
  
  document.addEventListener('mousemove', trackMouse);
}

/**
 * Example: Throttled API polling
 */
function pollingExample() {
  const pollData = throttle(async () => {
    const response = await fetch('/api/status');
    const data = await response.json();
    console.log('Status:', data);
  }, 5000); // Poll at most once every 5 seconds
  
  // Call pollData() frequently, but it will only execute once per 5 seconds
  setInterval(pollData, 100);
}

// ========================================
// 4. Deep Clone Examples
// ========================================

/**
 * Example: Cloning nested objects
 */
function deepCloneExample() {
  const original = {
    name: 'John',
    address: {
      street: '123 Main St',
      city: 'New York',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    hobbies: ['reading', 'coding'],
    metadata: {
      createdAt: new Date(),
      tags: ['developer', 'designer']
    }
  };
  
  const copy = deepClone(original);
  
  // Modify the copy
  copy.address.city = 'Boston';
  copy.hobbies.push('gaming');
  
  console.log('Original city:', original.address.city); // 'New York'
  console.log('Copy city:', copy.address.city); // 'Boston'
}

/**
 * Example: Cloning for state management
 */
function stateManagementExample(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      const newState = deepClone(state);
      newState.user = action.payload;
      return newState;
      
    case 'ADD_ITEM':
      const updatedState = deepClone(state);
      updatedState.items.push(action.payload);
      return updatedState;
      
    default:
      return state;
  }
}

// ========================================
// 5. isEmpty Examples
// ========================================

/**
 * Example: Validating form inputs
 */
function validateFormInputs(formData) {
  const errors = {};
  
  if (isEmpty(formData.username)) {
    errors.username = 'Username is required';
  }
  
  if (isEmpty(formData.email)) {
    errors.email = 'Email is required';
  }
  
  if (isEmpty(formData.hobbies)) {
    errors.hobbies = 'Please select at least one hobby';
  }
  
  return {
    isValid: isEmpty(errors),
    errors
  };
}

/**
 * Example: Checking data before rendering
 */
function renderUserList(users) {
  if (isEmpty(users)) {
    return '<p>No users found</p>';
  }
  
  return users.map(user => `<div>${user.name}</div>`).join('');
}

/**
 * Example: Various isEmpty checks
 */
function isEmptyExamples() {
  console.log(isEmpty(null));           // true
  console.log(isEmpty(undefined));      // true
  console.log(isEmpty(''));            // true
  console.log(isEmpty([]));            // true
  console.log(isEmpty({}));            // true
  console.log(isEmpty('hello'));       // false
  console.log(isEmpty([1, 2, 3]));    // false
  console.log(isEmpty({ a: 1 }));     // false
  console.log(isEmpty(0));            // false
  console.log(isEmpty(false));        // false
}

// ========================================
// 6. Email Validation Examples
// ========================================

/**
 * Example: Form email validation
 */
function validateEmailField(email) {
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

/**
 * Example: Bulk email validation
 */
function validateEmailList(emails) {
  const valid = [];
  const invalid = [];
  
  emails.forEach(email => {
    if (validateEmail(email)) {
      valid.push(email);
    } else {
      invalid.push(email);
    }
  });
  
  return { valid, invalid };
}

/**
 * Example: Email validation with suggestions
 */
function validateWithSuggestion(email) {
  if (!validateEmail(email)) {
    // Common typos
    if (email.includes('gmial.com')) {
      return {
        valid: false,
        suggestion: email.replace('gmial.com', 'gmail.com')
      };
    }
    if (email.includes('yahooo.com')) {
      return {
        valid: false,
        suggestion: email.replace('yahooo.com', 'yahoo.com')
      };
    }
    return { valid: false, suggestion: null };
  }
  
  return { valid: true };
}

// ========================================
// 7. ID Generation Examples
// ========================================

/**
 * Example: Generate unique IDs
 */
function generateIdExamples() {
  console.log('Basic ID:', generateId());
  // Output: 'a1b2c3d4e5f6'
  
  console.log('User ID:', generateId('user'));
  // Output: 'user_a1b2c3d4e5f6'
  
  console.log('Order ID:', generateId('order'));
  // Output: 'order_x9y8z7w6v5u4'
}

/**
 * Example: Generate IDs for new items
 */
function createNewItem(type, data) {
  return {
    id: generateId(type),
    ...data,
    createdAt: new Date().toISOString()
  };
}

// Usage
const newUser = createNewItem('user', {
  name: 'John Doe',
  email: 'john@example.com'
});

const newProduct = createNewItem('product', {
  name: 'Widget',
  price: 19.99
});

// ========================================
// 8. groupBy Examples
// ========================================

/**
 * Example: Group users by role
 */
function groupUsersByRole(users) {
  return groupBy(users, 'role');
  // {
  //   admin: [{ name: 'John', role: 'admin' }, ...],
  //   user: [{ name: 'Jane', role: 'user' }, ...]
  // }
}

/**
 * Example: Group transactions by date
 */
function groupTransactionsByDate(transactions) {
  return groupBy(transactions, 'date');
}

/**
 * Example: Group by custom function
 */
function groupProductsByPriceRange(products) {
  return groupBy(products, (product) => {
    if (product.price < 20) return 'budget';
    if (product.price < 50) return 'mid-range';
    return 'premium';
  });
}

/**
 * Example: Analytics grouping
 */
function analyzeTransactions(transactions) {
  const byCategory = groupBy(transactions, 'category');
  const byMonth = groupBy(transactions, (t) => {
    return new Date(t.date).getMonth();
  });
  
  // Calculate totals per category
  const categoryTotals = Object.entries(byCategory).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.amount, 0),
    count: items.length,
    average: items.reduce((sum, item) => sum + item.amount, 0) / items.length
  }));
  
  return { byCategory, byMonth, categoryTotals };
}

// ========================================
// 9. sortBy Examples
// ========================================

/**
 * Example: Sort users by name
 */
function sortUsersByName(users) {
  return sortBy(users, 'name', 'asc');
}

/**
 * Example: Sort products by price
 */
function sortProductsByPrice(products, ascending = true) {
  return sortBy(products, 'price', ascending ? 'asc' : 'desc');
}

/**
 * Example: Multi-level sorting
 */
function sortUsersAdvanced(users) {
  // First sort by role, then by name
  const byRole = sortBy(users, 'role', 'asc');
  
  // Group by role and sort each group by name
  const grouped = groupBy(byRole, 'role');
  const result = [];
  
  Object.values(grouped).forEach(group => {
    result.push(...sortBy(group, 'name', 'asc'));
  });
  
  return result;
}

/**
 * Example: Sort with custom date handling
 */
function sortByDate(items) {
  return items.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

// ========================================
// 10. filterBy Examples
// ========================================

/**
 * Example: Filter active users
 */
function getActiveUsers(users) {
  return filterBy(users, { status: 'active' });
}

/**
 * Example: Complex filtering
 */
function filterProducts(products, criteria) {
  return filterBy(products, {
    category: criteria.category,
    inStock: true,
    price: (p) => p >= criteria.minPrice && p <= criteria.maxPrice
  });
}

/**
 * Example: Search functionality
 */
function searchUsers(users, searchTerm) {
  const term = searchTerm.toLowerCase();
  return users.filter(user => {
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });
}

/**
 * Example: Advanced filtering with multiple conditions
 */
function findQualifiedUsers(users) {
  return filterBy(users, {
    age: (age) => age >= 18 && age <= 65,
    status: 'active',
    verified: true,
    role: (role) => ['user', 'premium'].includes(role)
  });
}

// ========================================
// 11. Real-world Combined Examples
// ========================================

/**
 * Example: Data transformation pipeline
 */
function processTransactionData(transactions) {
  // 1. Filter completed transactions
  const completed = filterBy(transactions, { status: 'completed' });
  
  // 2. Group by category
  const byCategory = groupBy(completed, 'category');
  
  // 3. Calculate totals
  const summary = Object.entries(byCategory).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.amount, 0),
    count: items.length,
    average: items.reduce((sum, item) => sum + item.amount, 0) / items.length
  }));
  
  // 4. Sort by total (descending)
  return sortBy(summary, 'total', 'desc');
}

/**
 * Example: User analytics dashboard
 */
function generateUserAnalytics(users) {
  const activeUsers = filterBy(users, { status: 'active' });
  const byRole = groupBy(activeUsers, 'role');
  const byCountry = groupBy(activeUsers, 'country');
  
  const analytics = {
    total: users.length,
    active: activeUsers.length,
    inactive: users.length - activeUsers.length,
    byRole: Object.entries(byRole).map(([role, users]) => ({
      role,
      count: users.length,
      percentage: (users.length / activeUsers.length) * 100
    })),
    byCountry: Object.entries(byCountry).map(([country, users]) => ({
      country,
      count: users.length
    })),
    topCountries: sortBy(
      Object.entries(byCountry).map(([country, users]) => ({
        country,
        count: users.length
      })),
      'count',
      'desc'
    ).slice(0, 5)
  };
  
  return analytics;
}

/**
 * Example: Smart table with all utilities
 */
function SmartTable({ data, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Debounced search
  const debouncedSearch = debounce((text) => {
    setFilterText(text);
  }, 300);
  
  // Process data
  const processedData = useMemo(() => {
    let filtered = data;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filterBy(filtered, { category: selectedCategory });
    }
    
    // Apply text search
    if (filterText) {
      filtered = filtered.filter(item => 
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    return sortBy(filtered, sortConfig.key, sortConfig.direction);
  }, [data, selectedCategory, filterText, sortConfig]);
  
  // Throttled row click handler
  const handleRowClick = throttle((row) => {
    onRowClick(row);
  }, 200);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {/* ... */}
      </select>
      
      <table>
        {/* Render processedData with handleRowClick */}
      </table>
    </div>
  );
}

// Export all examples
export {
  dateFormattingExamples,
  formatTableDates,
  searchExample,
  autoSaveForm,
  handleWindowResize,
  scrollExample,
  mouseTrackingExample,
  pollingExample,
  deepCloneExample,
  stateManagementExample,
  validateFormInputs,
  renderUserList,
  validateEmailField,
  validateEmailList,
  validateWithSuggestion,
  generateIdExamples,
  createNewItem,
  groupUsersByRole,
  groupTransactionsByDate,
  groupProductsByPriceRange,
  analyzeTransactions,
  sortUsersByName,
  sortProductsByPrice,
  sortUsersAdvanced,
  getActiveUsers,
  filterProducts,
  searchUsers,
  findQualifiedUsers,
  processTransactionData,
  generateUserAnalytics,
  SmartTable
};
