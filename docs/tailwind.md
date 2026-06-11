# Decision: Tailwind CSS

## Choice

[Tailwind CSS](https://tailwindcss.com) v4 — utility-first CSS framework.

## Reason

### Utility-first fits component-based architecture

Each component owns its styles as utility classes directly in JSX. There are no separate `.css` or `.module.css` files to maintain in parallel with component files, and no risk of class name collisions across components. Styles are co-located with the markup they affect, which makes components easier to read, move, and delete.

### Dark mode and responsive design out of the box

Tailwind's `dark:` and responsive prefixes (`sm:`, `lg:`) make mobile-first, themeable UI declarative with no extra tooling:

```tsx
// Mobile: single column. sm: two columns. lg: three columns.
// Dark mode: swap background and border colors automatically.
<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <li className="border border-gray-200 dark:border-gray-700">...</li>
</ul>
```

Tailwind v4's `@custom-variant dark` directive wires dark mode to the `.dark` class on `<html>`, which the `useTheme` hook toggles:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### Production bundle size

Tailwind v4 scans source files and emits only the CSS classes actually used. The production stylesheet for this project is a few kilobytes.

### Community and ecosystem

Tailwind is the most widely adopted utility CSS framework with active maintenance, a large plugin ecosystem, and first-class support in every major framework and build tool. Resources, examples, and answers to edge cases are abundant.

## Alternatives Considered

| Alternative | Reason not chosen |
|---|---|
| CSS Modules | More boilerplate per component; dark mode and responsive variants require more manual work |
| styled-components / Emotion | Runtime CSS-in-JS adds bundle weight and runtime cost; dark mode requires theme providers |
| Plain CSS | Verbose for responsive + dark mode; class naming discipline required across all components |
| Bootstrap | Component-level styles are hard to customise without overrides; heavier baseline than needed |
