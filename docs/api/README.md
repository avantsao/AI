## API Reference

No public APIs were discovered in the current repository snapshot. As modules are added, create an API page per module using the template below.

### Organization
- **One module per page** under `docs/api/`.
- Use headings for exports: Functions, Classes, Types, Constants.

### Example structure for a module page
```markdown
# <Module Name>

Brief overview of the module’s purpose and when to use it.

## Functions

### functionName(paramA: Type, options?: Options): ReturnType
- Description: What the function does and notable behaviors.
- Parameters:
  - paramA (Type): what it represents.
  - options (Options, optional): key options and defaults.
- Returns: ReturnType — what is returned.
- Throws: ErrorType — when and why.

#### Example
```ts
import { functionName } from '<package-or-path>';

const result = functionName('value', { enabled: true });
```
```

## Classes

### ClassName
- Description: what the class models.
- Constructor: `(arg: ArgType)` — meaning of each arg.
- Methods:
  - `doThing(x: number): boolean` — description.

#### Example
```ts
import { ClassName } from '<package-or-path>';

const instance = new ClassName('arg');
instance.doThing(123);
```
```