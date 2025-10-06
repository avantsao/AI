# Functions Reference

Complete reference for all utility functions provided by this library.

## Table of Contents

- [Date & Time Functions](#date--time-functions)
- [Performance Functions](#performance-functions)
- [Object & Array Functions](#object--array-functions)
- [Validation Functions](#validation-functions)
- [String Functions](#string-functions)
- [Utility Functions](#utility-functions)

---

## Date & Time Functions

### formatDate

Formats a date according to a format string.

```typescript
function formatDate(
  date: Date | string | number,
  format?: string
): string
```

**Parameters:**
- `date`: Date to format (Date object, ISO string, or timestamp)
- `format`: Format string (default: `'YYYY-MM-DD'`)

**Format Tokens:**
- `YYYY` - 4-digit year
- `YY` - 2-digit year
- `MM` - 2-digit month (01-12)
- `M` - Month (1-12)
- `DD` - 2-digit day (01-31)
- `D` - Day (1-31)
- `HH` - 2-digit hour 24h (00-23)
- `H` - Hour 24h (0-23)
- `hh` - 2-digit hour 12h (01-12)
- `h` - Hour 12h (1-12)
- `mm` - 2-digit minute (00-59)
- `m` - Minute (0-59)
- `ss` - 2-digit second (00-59)
- `s` - Second (0-59)
- `A` - AM/PM
- `a` - am/pm

**Examples:**

```javascript
import { formatDate } from '@project/utils';

const date = new Date('2025-10-06T14:30:00');

formatDate(date);                         // '2025-10-06'
formatDate(date, 'MM/DD/YYYY');          // '10/06/2025'
formatDate(date, 'YYYY-MM-DD HH:mm:ss'); // '2025-10-06 14:30:00'
formatDate(date, 'DD MMM YYYY');         // '06 Oct 2025'
formatDate(date, 'hh:mm A');             // '02:30 PM'

// From ISO string
formatDate('2025-10-06T14:30:00Z', 'MM/DD/YYYY'); // '10/06/2025'

// From timestamp
formatDate(1728221400000, 'MM/DD/YYYY'); // '10/06/2025'
```

**Throws:**
- `Error` if date is invalid

---

### getRelativeTime

Get relative time string (e.g., "2 hours ago").

```typescript
function getRelativeTime(date: Date | string | number): string
```

**Parameters:**
- `date`: Date to compare with current time

**Returns:** Relative time string

**Examples:**

```javascript
import { getRelativeTime } from '@project/utils';

getRelativeTime(new Date(Date.now() - 1000));        // 'just now'
getRelativeTime(new Date(Date.now() - 60000));       // '1 minute ago'
getRelativeTime(new Date(Date.now() - 3600000));     // '1 hour ago'
getRelativeTime(new Date(Date.now() - 86400000));    // '1 day ago'
getRelativeTime(new Date(Date.now() + 3600000));     // 'in 1 hour'
```

---

### parseDate

Parse a date string into a Date object.

```typescript
function parseDate(dateString: string, format?: string): Date
```

**Parameters:**
- `dateString`: Date string to parse
- `format`: Expected format (default: ISO 8601)

**Returns:** Date object

**Examples:**

```javascript
import { parseDate } from '@project/utils';

parseDate('2025-10-06');                    // Date object
parseDate('10/06/2025', 'MM/DD/YYYY');     // Date object
parseDate('06-10-2025', 'DD-MM-YYYY');     // Date object
```

---

## Performance Functions

### debounce

Creates a debounced function that delays execution until after a specified delay.

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void
```

**Parameters:**
- `func`: Function to debounce
- `delay`: Delay in milliseconds

**Returns:** Debounced function

**Use Cases:**
- Search input
- Window resize events
- Form auto-save
- Text input validation

**Examples:**

```javascript
import { debounce } from '@project/utils';

// Search input
const handleSearch = debounce((query) => {
  console.log('Searching:', query);
  api.search(query);
}, 300);

// In React component
<input onChange={(e) => handleSearch(e.target.value)} />

// Window resize
const handleResize = debounce(() => {
  console.log('Window resized:', window.innerWidth);
}, 250);
window.addEventListener('resize', handleResize);

// Form auto-save
const autoSave = debounce((formData) => {
  api.saveForm(formData);
}, 1000);
```

---

### throttle

Creates a throttled function that executes at most once per interval.

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  interval: number
): (...args: Parameters<T>) => void
```

**Parameters:**
- `func`: Function to throttle
- `interval`: Minimum interval in milliseconds

**Returns:** Throttled function

**Use Cases:**
- Scroll events
- Mouse move tracking
- Window resize (frequent updates)
- Button click prevention

**Examples:**

```javascript
import { throttle } from '@project/utils';

// Scroll tracking
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100);
window.addEventListener('scroll', handleScroll);

// Mouse tracking
const trackMouse = throttle((e) => {
  console.log('Mouse:', e.clientX, e.clientY);
}, 50);
document.addEventListener('mousemove', trackMouse);

// Button click prevention
const handleClick = throttle(() => {
  console.log('Button clicked');
  api.sendRequest();
}, 1000);
```

---

### memoize

Creates a memoized version of a function that caches results.

```typescript
function memoize<T extends (...args: any[]) => any>(
  func: T
): T & { cache: Map<string, any> }
```

**Parameters:**
- `func`: Function to memoize

**Returns:** Memoized function with cache

**Examples:**

```javascript
import { memoize } from '@project/utils';

// Expensive calculation
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast on subsequent calls

// API call memoization
const getUser = memoize(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});
```

---

## Object & Array Functions

### deepClone

Creates a deep copy of an object or array.

```typescript
function deepClone<T>(obj: T): T
```

**Parameters:**
- `obj`: Object or array to clone

**Returns:** Deep copy of the input

**Examples:**

```javascript
import { deepClone } from '@project/utils';

const original = {
  name: 'John',
  address: {
    city: 'New York'
  },
  hobbies: ['reading']
};

const copy = deepClone(original);
copy.address.city = 'Boston';
copy.hobbies.push('coding');

console.log(original.address.city); // 'New York' (unchanged)
console.log(copy.address.city);     // 'Boston'
```

---

### deepMerge

Deeply merges two or more objects.

```typescript
function deepMerge<T extends object>(...objects: T[]): T
```

**Parameters:**
- `objects`: Objects to merge

**Returns:** Merged object

**Examples:**

```javascript
import { deepMerge } from '@project/utils';

const defaults = {
  theme: 'light',
  colors: {
    primary: 'blue',
    secondary: 'gray'
  }
};

const userSettings = {
  colors: {
    primary: 'red'
  }
};

const merged = deepMerge(defaults, userSettings);
// {
//   theme: 'light',
//   colors: {
//     primary: 'red',
//     secondary: 'gray'
//   }
// }
```

---

### groupBy

Groups array elements by a specified key or function.

```typescript
function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]>
```

**Parameters:**
- `array`: Array to group
- `key`: Property key or function to group by

**Returns:** Object with grouped items

**Examples:**

```javascript
import { groupBy } from '@project/utils';

const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];

// Group by property
const byRole = groupBy(users, 'role');
// {
//   admin: [{ name: 'John', role: 'admin' }, { name: 'Bob', role: 'admin' }],
//   user: [{ name: 'Jane', role: 'user' }]
// }

// Group by function
const byNameLength = groupBy(users, (user) => user.name.length.toString());
```

---

### sortBy

Sorts an array by a specified key.

```typescript
function sortBy<T>(
  array: T[],
  key: keyof T,
  order?: 'asc' | 'desc'
): T[]
```

**Parameters:**
- `array`: Array to sort
- `key`: Property key to sort by
- `order`: Sort order (default: `'asc'`)

**Returns:** Sorted array (new array)

**Examples:**

```javascript
import { sortBy } from '@project/utils';

const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

sortBy(users, 'name');         // Sort by name ascending
sortBy(users, 'age', 'desc');  // Sort by age descending
```

---

### filterBy

Filters an array by multiple criteria.

```typescript
function filterBy<T>(
  array: T[],
  criteria: Partial<{ [K in keyof T]: T[K] | ((value: T[K]) => boolean) }>
): T[]
```

**Parameters:**
- `array`: Array to filter
- `criteria`: Filter criteria object

**Returns:** Filtered array

**Examples:**

```javascript
import { filterBy } from '@project/utils';

const products = [
  { name: 'Laptop', category: 'electronics', price: 1000 },
  { name: 'Mouse', category: 'electronics', price: 25 },
  { name: 'Desk', category: 'furniture', price: 300 }
];

// Simple filter
filterBy(products, { category: 'electronics' });

// Complex filter
filterBy(products, {
  category: 'electronics',
  price: (p) => p < 500
});
```

---

### unique

Returns unique values from an array.

```typescript
function unique<T>(array: T[]): T[]
```

**Parameters:**
- `array`: Input array

**Returns:** Array with unique values

**Examples:**

```javascript
import { unique } from '@project/utils';

unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
unique(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
```

---

### chunk

Splits an array into chunks of specified size.

```typescript
function chunk<T>(array: T[], size: number): T[][]
```

**Parameters:**
- `array`: Array to chunk
- `size`: Chunk size

**Returns:** Array of chunks

**Examples:**

```javascript
import { chunk } from '@project/utils';

chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

chunk(['a', 'b', 'c', 'd'], 3);
// [['a', 'b', 'c'], ['d']]
```

---

## Validation Functions

### isEmpty

Checks if a value is empty.

```typescript
function isEmpty(value: any): boolean
```

**Parameters:**
- `value`: Value to check

**Returns:** `true` if empty, `false` otherwise

**Empty values:**
- `null`
- `undefined`
- Empty string (`''`)
- Empty array (`[]`)
- Empty object (`{}`)
- `NaN`

**Examples:**

```javascript
import { isEmpty } from '@project/utils';

isEmpty(null);          // true
isEmpty(undefined);     // true
isEmpty('');           // true
isEmpty([]);           // true
isEmpty({});           // true
isEmpty(0);            // false
isEmpty('hello');      // false
isEmpty([1]);          // false
isEmpty({ a: 1 });     // false
```

---

### validateEmail

Validates an email address.

```typescript
function validateEmail(email: string): boolean
```

**Parameters:**
- `email`: Email address to validate

**Returns:** `true` if valid, `false` otherwise

**Examples:**

```javascript
import { validateEmail } from '@project/utils';

validateEmail('user@example.com');     // true
validateEmail('user.name@domain.co');  // true
validateEmail('invalid');              // false
validateEmail('user@');                // false
validateEmail('@domain.com');          // false
```

---

### validateURL

Validates a URL.

```typescript
function validateURL(url: string): boolean
```

**Parameters:**
- `url`: URL to validate

**Returns:** `true` if valid, `false` otherwise

**Examples:**

```javascript
import { validateURL } from '@project/utils';

validateURL('https://example.com');           // true
validateURL('http://localhost:3000');         // true
validateURL('ftp://files.example.com');       // true
validateURL('not a url');                     // false
```

---

### validatePhone

Validates a phone number.

```typescript
function validatePhone(phone: string, country?: string): boolean
```

**Parameters:**
- `phone`: Phone number to validate
- `country`: Country code (default: `'US'`)

**Returns:** `true` if valid, `false` otherwise

**Examples:**

```javascript
import { validatePhone } from '@project/utils';

validatePhone('555-123-4567');           // true (US)
validatePhone('(555) 123-4567');         // true (US)
validatePhone('+1-555-123-4567');        // true (US)
validatePhone('+44 20 7123 4567', 'UK'); // true (UK)
```

---

## String Functions

### capitalize

Capitalizes the first letter of a string.

```typescript
function capitalize(str: string): string
```

**Parameters:**
- `str`: String to capitalize

**Returns:** Capitalized string

**Examples:**

```javascript
import { capitalize } from '@project/utils';

capitalize('hello');      // 'Hello'
capitalize('hello world'); // 'Hello world'
capitalize('HELLO');      // 'HELLO'
```

---

### camelCase

Converts a string to camelCase.

```typescript
function camelCase(str: string): string
```

**Parameters:**
- `str`: String to convert

**Returns:** camelCase string

**Examples:**

```javascript
import { camelCase } from '@project/utils';

camelCase('hello world');      // 'helloWorld'
camelCase('Hello-World');      // 'helloWorld'
camelCase('hello_world');      // 'helloWorld'
```

---

### kebabCase

Converts a string to kebab-case.

```typescript
function kebabCase(str: string): string
```

**Parameters:**
- `str`: String to convert

**Returns:** kebab-case string

**Examples:**

```javascript
import { kebabCase } from '@project/utils';

kebabCase('helloWorld');     // 'hello-world'
kebabCase('Hello World');    // 'hello-world'
kebabCase('hello_world');    // 'hello-world'
```

---

### snakeCase

Converts a string to snake_case.

```typescript
function snakeCase(str: string): string
```

**Parameters:**
- `str`: String to convert

**Returns:** snake_case string

**Examples:**

```javascript
import { snakeCase } from '@project/utils';

snakeCase('helloWorld');     // 'hello_world'
snakeCase('Hello World');    // 'hello_world'
snakeCase('hello-world');    // 'hello_world'
```

---

### truncate

Truncates a string to a specified length.

```typescript
function truncate(str: string, length: number, suffix?: string): string
```

**Parameters:**
- `str`: String to truncate
- `length`: Maximum length
- `suffix`: Suffix to add (default: `'...'`)

**Returns:** Truncated string

**Examples:**

```javascript
import { truncate } from '@project/utils';

truncate('Hello World', 8);           // 'Hello...'
truncate('Hello World', 8, '…');      // 'Hello…'
truncate('Hello', 10);                // 'Hello'
```

---

## Utility Functions

### generateId

Generates a unique identifier.

```typescript
function generateId(prefix?: string): string
```

**Parameters:**
- `prefix`: Optional prefix for the ID

**Returns:** Unique identifier

**Examples:**

```javascript
import { generateId } from '@project/utils';

generateId();          // 'a1b2c3d4e5f6'
generateId('user');    // 'user_a1b2c3d4e5f6'
generateId('order');   // 'order_x9y8z7w6v5u4'
```

---

### sleep

Delays execution for a specified time.

```typescript
function sleep(ms: number): Promise<void>
```

**Parameters:**
- `ms`: Milliseconds to sleep

**Returns:** Promise that resolves after the delay

**Examples:**

```javascript
import { sleep } from '@project/utils';

async function example() {
  console.log('Start');
  await sleep(1000);
  console.log('After 1 second');
}
```

---

### retry

Retries a function with exponential backoff.

```typescript
function retry<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    delay?: number;
    backoff?: number;
  }
): Promise<T>
```

**Parameters:**
- `fn`: Async function to retry
- `options`: Retry options
  - `maxRetries`: Maximum attempts (default: `3`)
  - `delay`: Initial delay in ms (default: `1000`)
  - `backoff`: Backoff multiplier (default: `2`)

**Returns:** Promise with function result

**Examples:**

```javascript
import { retry } from '@project/utils';

const result = await retry(
  () => fetch('/api/data'),
  {
    maxRetries: 3,
    delay: 1000,
    backoff: 2
  }
);
```

---

### randomInt

Generates a random integer between min and max (inclusive).

```typescript
function randomInt(min: number, max: number): number
```

**Parameters:**
- `min`: Minimum value
- `max`: Maximum value

**Returns:** Random integer

**Examples:**

```javascript
import { randomInt } from '@project/utils';

randomInt(1, 10);    // Random number between 1 and 10
randomInt(0, 100);   // Random number between 0 and 100
```

---

### pick

Creates an object with only specified keys.

```typescript
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>
```

**Parameters:**
- `obj`: Source object
- `keys`: Keys to pick

**Returns:** New object with specified keys

**Examples:**

```javascript
import { pick } from '@project/utils';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret'
};

pick(user, ['id', 'name', 'email']);
// { id: 1, name: 'John', email: 'john@example.com' }
```

---

### omit

Creates an object without specified keys.

```typescript
function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K>
```

**Parameters:**
- `obj`: Source object
- `keys`: Keys to omit

**Returns:** New object without specified keys

**Examples:**

```javascript
import { omit } from '@project/utils';

const user = {
  id: 1,
  name: 'John',
  password: 'secret'
};

omit(user, ['password']);
// { id: 1, name: 'John' }
```

---

**For more examples and usage patterns, see the [examples directory](../examples/).**
