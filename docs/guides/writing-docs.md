## Guide: Writing Great API and Component Docs

### Required sections
- **Overview**: What and why.
- **Signature**: Exact function/class signature or component props.
- **Parameters / Props**: Types, defaults, and behavior.
- **Returns**: Type and meaning.
- **Errors**: Possible errors and when they occur.
- **Examples**: At least one realistic example; include edge cases when helpful.

### Style
- Use concise, active voice. Prefer examples over theory.
- Document invariants, performance caveats, and thread-safety or concurrency notes.
- Note deprecations and breaking changes with version tags.

### Examples: Patterns
```ts
// Function example (TypeScript)
import { doThing } from '<pkg>';

const output = doThing('input', { retry: 2 });
```

```tsx
// Component example (React)
import { Button } from '<pkg>';

<Button variant="primary" onClick={() => {/* ... */}}>Save</Button>
```
