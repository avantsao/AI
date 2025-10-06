# Component Documentation Guide

This guide provides templates and best practices for documenting components in this project.

## Table of Contents

- [Component Documentation Standards](#component-documentation-standards)
- [React/Vue Components](#reactvue-components)
- [Web Components](#web-components)
- [Component Props/Attributes](#component-propsattributes)
- [Events and Callbacks](#events-and-callbacks)
- [Styling and Theming](#styling-and-theming)
- [Accessibility](#accessibility)
- [Testing](#testing)

---

## Component Documentation Standards

### Documentation Requirements

Every component should include:

1. **Overview**: Brief description of the component's purpose
2. **Props/Attributes**: Complete list with types and descriptions
3. **Events**: All emitted events or callbacks
4. **Examples**: Multiple usage examples covering common scenarios
5. **Styling**: Available CSS classes and customization options
6. **Accessibility**: ARIA attributes and keyboard navigation
7. **Browser Support**: Compatibility information

### Documentation Format

Use the following template for each component:

```markdown
# ComponentName

Brief description of what the component does.

## Props

[Props table]

## Events

[Events table]

## Examples

[Code examples]

## Styling

[Styling information]

## Accessibility

[Accessibility features]

## Browser Support

[Browser compatibility]
```

---

## React/Vue Components

### Component Template

```markdown
# Button Component

A customizable button component with multiple variants and sizes.

## Installation

\`\`\`bash
npm install @project/components
\`\`\`

\`\`\`javascript
import { Button } from '@project/components';
\`\`\`

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | No | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `disabled` | `boolean` | No | `false` | Disable the button |
| `loading` | `boolean` | No | `false` | Show loading state |
| `fullWidth` | `boolean` | No | `false` | Make button full width |
| `icon` | `React.ReactNode` | No | - | Icon to display |
| `iconPosition` | `'left' \| 'right'` | No | `'left'` | Icon position |
| `onClick` | `(event: MouseEvent) => void` | No | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Button type |
| `className` | `string` | No | - | Additional CSS classes |
| `children` | `React.ReactNode` | Yes | - | Button content |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `onClick` | `event: MouseEvent` | Fired when button is clicked |
| `onFocus` | `event: FocusEvent` | Fired when button receives focus |
| `onBlur` | `event: FocusEvent` | Fired when button loses focus |

## Examples

### Basic Usage

\`\`\`jsx
import { Button } from '@project/components';

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
\`\`\`

### Variants

\`\`\`jsx
// Primary button (default)
<Button variant="primary">Primary</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Ghost button
<Button variant="ghost">Cancel</Button>
\`\`\`

### Sizes

\`\`\`jsx
// Small button
<Button size="sm">Small</Button>

// Medium button (default)
<Button size="md">Medium</Button>

// Large button
<Button size="lg">Large</Button>
\`\`\`

### With Icon

\`\`\`jsx
import { Button } from '@project/components';
import { PlusIcon, TrashIcon } from '@project/icons';

// Icon on left (default)
<Button icon={<PlusIcon />}>
  Add Item
</Button>

// Icon on right
<Button icon={<TrashIcon />} iconPosition="right">
  Delete
</Button>

// Icon only
<Button icon={<PlusIcon />} aria-label="Add item" />
\`\`\`

### Loading State

\`\`\`jsx
function SubmitForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.submitForm(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onClick={handleSubmit}>
      {loading ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
\`\`\`

### Disabled State

\`\`\`jsx
<Button disabled>
  Disabled Button
</Button>
\`\`\`

### Full Width

\`\`\`jsx
<Button fullWidth>
  Full Width Button
</Button>
\`\`\`

### Form Integration

\`\`\`jsx
<form onSubmit={handleSubmit}>
  <input type="text" name="username" />
  <Button type="submit" variant="primary">
    Submit
  </Button>
  <Button type="reset" variant="secondary">
    Reset
  </Button>
</form>
\`\`\`

## Styling

### CSS Classes

The component applies the following CSS classes:

- `.button` - Base button class
- `.button--primary` - Primary variant
- `.button--secondary` - Secondary variant
- `.button--danger` - Danger variant
- `.button--ghost` - Ghost variant
- `.button--sm` - Small size
- `.button--md` - Medium size
- `.button--lg` - Large size
- `.button--disabled` - Disabled state
- `.button--loading` - Loading state
- `.button--full-width` - Full width

### Custom Styling

Override styles using CSS:

\`\`\`css
.button {
  /* Your custom styles */
  border-radius: 8px;
  font-weight: 600;
}

.button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\`

Or using CSS-in-JS:

\`\`\`jsx
<Button
  className="custom-button"
  style={{
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
>
  Custom Button
</Button>
\`\`\`

### Theming

The component supports CSS custom properties for theming:

\`\`\`css
:root {
  --button-primary-bg: #3b82f6;
  --button-primary-hover: #2563eb;
  --button-primary-text: #ffffff;
  --button-border-radius: 6px;
  --button-padding-sm: 8px 12px;
  --button-padding-md: 10px 16px;
  --button-padding-lg: 12px 24px;
}
\`\`\`

## Accessibility

### ARIA Attributes

The component automatically includes appropriate ARIA attributes:

- `role="button"` (if not using native `<button>`)
- `aria-disabled="true"` when disabled
- `aria-busy="true"` when loading
- `aria-label` can be provided for icon-only buttons

### Keyboard Navigation

- `Space` or `Enter` - Activate button
- `Tab` - Focus button
- `Shift+Tab` - Focus previous element

### Screen Reader Support

The component is fully compatible with screen readers:

- Announces button text or aria-label
- Announces loading state: "Button, Loading"
- Announces disabled state: "Button, Disabled"

### Best Practices

\`\`\`jsx
// Good: Descriptive text
<Button>Save Changes</Button>

// Good: Icon-only with aria-label
<Button icon={<CloseIcon />} aria-label="Close dialog" />

// Bad: Icon-only without aria-label
<Button icon={<CloseIcon />} />

// Good: Loading state with text change
<Button loading={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
\`\`\`

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

## TypeScript

### Type Definitions

\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps>;
\`\`\`

### Usage with TypeScript

\`\`\`typescript
import { Button } from '@project/components';
import type { ButtonProps } from '@project/components';

const MyButton: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked!', event);
  };

  return (
    <Button
      variant="primary"
      size="md"
      onClick={handleClick}
    >
      Click Me
    </Button>
  );
};
\`\`\`

## Testing

### Unit Tests

\`\`\`javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@project/components';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading')).toHaveAttribute('aria-busy', 'true');
  });
});
\`\`\`

## Related Components

- [IconButton](./IconButton.md) - Button with icon only
- [ButtonGroup](./ButtonGroup.md) - Group of related buttons
- [ToggleButton](./ToggleButton.md) - Toggle button with on/off state

---

**Last Updated**: 2025-10-06
```

---

## DataTable Component

### Complete Documentation Example

# DataTable

A powerful, feature-rich data table component with sorting, filtering, pagination, and row selection.

## Installation

```bash
npm install @project/components
```

```javascript
import { DataTable } from '@project/components';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `Array<Record<string, any>>` | Yes | - | Array of data objects |
| `columns` | `Array<Column>` | Yes | - | Column configuration |
| `sortable` | `boolean` | No | `true` | Enable sorting |
| `filterable` | `boolean` | No | `true` | Enable filtering |
| `paginated` | `boolean` | No | `true` | Enable pagination |
| `pageSize` | `number` | No | `10` | Rows per page |
| `selectable` | `boolean` | No | `false` | Enable row selection |
| `loading` | `boolean` | No | `false` | Show loading state |
| `emptyMessage` | `string` | No | `'No data'` | Empty state message |
| `onRowClick` | `(row: any, index: number) => void` | No | - | Row click handler |
| `onSelectionChange` | `(selectedRows: any[]) => void` | No | - | Selection change handler |
| `onSort` | `(column: string, direction: 'asc' \| 'desc') => void` | No | - | Sort change handler |
| `onPageChange` | `(page: number) => void` | No | - | Page change handler |

### Column Configuration

```typescript
interface Column {
  id: string;                    // Unique column ID
  header: string;                // Column header text
  accessor: string | ((row: any) => any); // Data accessor
  width?: string;                // Column width
  minWidth?: string;             // Minimum column width
  maxWidth?: string;             // Maximum column width
  sortable?: boolean;            // Enable sorting for column
  filterable?: boolean;          // Enable filtering for column
  render?: (value: any, row: any, index: number) => React.ReactNode; // Custom renderer
  align?: 'left' | 'center' | 'right'; // Text alignment
  className?: string;            // Custom CSS class
}
```

## Examples

### Basic Table

```jsx
import { DataTable } from '@project/components';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

const columns = [
  { id: 'id', header: 'ID', accessor: 'id', width: '80px' },
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'Email', accessor: 'email' },
  { id: 'age', header: 'Age', accessor: 'age', width: '100px', align: 'center' }
];

function MyTable() {
  return <DataTable data={data} columns={columns} />;
}
```

### With Custom Rendering

```jsx
const columns = [
  { id: 'id', header: 'ID', accessor: 'id', width: '80px' },
  { id: 'name', header: 'Name', accessor: 'name' },
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
```

### With Sorting and Pagination

```jsx
function MyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: 'name', direction: 'asc' });

  const handleSort = (column, direction) => {
    setSortConfig({ column, direction });
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      sortable={true}
      paginated={true}
      pageSize={20}
      onSort={handleSort}
      onPageChange={setCurrentPage}
    />
  );
}
```

### With Row Selection

```jsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (rows) => {
    setSelectedRows(rows);
    console.log('Selected:', rows);
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        selectable={true}
        onSelectionChange={handleSelectionChange}
      />
      <div>
        Selected {selectedRows.length} row(s)
      </div>
    </div>
  );
}
```

### Loading State

```jsx
function LoadingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.getData();
        setData(response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
    />
  );
}
```

### Complex Example with All Features

```jsx
function AdvancedTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { 
      id: 'id', 
      header: 'ID', 
      accessor: 'id', 
      width: '80px',
      sortable: true 
    },
    { 
      id: 'user', 
      header: 'User', 
      accessor: 'name',
      sortable: true,
      render: (value, row) => (
        <div className="user-cell">
          <img src={row.avatar} alt={value} />
          <div>
            <div className="user-name">{value}</div>
            <div className="user-email">{row.email}</div>
          </div>
        </div>
      )
    },
    { 
      id: 'role', 
      header: 'Role', 
      accessor: 'role',
      sortable: true,
      filterable: true,
      render: (value) => <Badge>{value}</Badge>
    },
    { 
      id: 'status', 
      header: 'Status', 
      accessor: 'status',
      align: 'center',
      render: (value) => (
        <StatusIndicator status={value} />
      )
    },
    {
      id: 'lastActive',
      header: 'Last Active',
      accessor: 'lastActive',
      sortable: true,
      render: (value) => formatDate(value, 'MM/DD/YYYY HH:mm')
    },
    {
      id: 'actions',
      header: 'Actions',
      width: '150px',
      render: (_, row) => (
        <ButtonGroup>
          <IconButton icon={<EditIcon />} onClick={() => handleEdit(row)} />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(row)} />
        </ButtonGroup>
      )
    }
  ];

  const handleRowClick = (row, index) => {
    console.log('Clicked row:', row, 'at index:', index);
  };

  const handleSort = (column, direction) => {
    console.log('Sort by:', column, direction);
    // Implement sorting logic
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>User Management</h2>
        {selectedRows.length > 0 && (
          <Button onClick={() => handleBulkDelete(selectedRows)}>
            Delete {selectedRows.length} selected
          </Button>
        )}
      </div>
      
      <DataTable
        data={data}
        columns={columns}
        sortable={true}
        filterable={true}
        paginated={true}
        pageSize={25}
        selectable={true}
        loading={loading}
        emptyMessage="No users found"
        onRowClick={handleRowClick}
        onSelectionChange={setSelectedRows}
        onSort={handleSort}
        onPageChange={setPage}
      />
    </div>
  );
}
```

## Styling

### CSS Classes

- `.data-table` - Table container
- `.data-table__header` - Table header
- `.data-table__body` - Table body
- `.data-table__row` - Table row
- `.data-table__cell` - Table cell
- `.data-table__row--selected` - Selected row
- `.data-table__row--clickable` - Clickable row
- `.data-table__loading` - Loading overlay
- `.data-table__empty` - Empty state
- `.data-table__pagination` - Pagination controls

### Custom Styling

```css
.data-table {
  border-radius: 8px;
  overflow: hidden;
}

.data-table__row:hover {
  background-color: #f5f5f5;
}

.data-table__row--selected {
  background-color: #e3f2fd;
}
```

## Accessibility

- Full keyboard navigation support
- Screen reader friendly
- ARIA labels for sorting and selection
- Focus management
- High contrast mode support

## Performance

### Optimization Tips

1. **Virtualization**: For large datasets (>1000 rows), use virtual scrolling
2. **Memoization**: Wrap custom renderers in `React.memo`
3. **Pagination**: Use server-side pagination for very large datasets
4. **Lazy Loading**: Load data on demand

```jsx
// Optimized custom renderer
const UserCell = React.memo(({ value, row }) => (
  <div className="user-cell">
    <img src={row.avatar} alt={value} />
    <span>{value}</span>
  </div>
));

const columns = [
  {
    id: 'user',
    header: 'User',
    accessor: 'name',
    render: (value, row) => <UserCell value={value} row={row} />
  }
];
```

---

## Additional Documentation Templates

### Form Component Template
### Modal Component Template
### Input Component Template
### Select Component Template
### Checkbox Component Template
### Radio Component Template
### Card Component Template
### Alert Component Template
### Toast/Notification Component Template

[Each would follow the same comprehensive structure as shown above]

---

**Last Updated**: 2025-10-06
