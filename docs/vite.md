# Decision: Vite

## Choice

[Vite](https://vite.dev) v8 — build tool and development server.

## Reason

Vite was chosen for its speed and minimal configuration overhead compared to alternatives like Webpack or Create React App (now unmaintained).

### Development speed

Vite serves source files over native ES modules during development instead of bundling them upfront. The browser requests each module on demand, so cold start time is measured in milliseconds regardless of project size. Hot Module Replacement (HMR) updates only the changed module — no full rebuild.

Compare this to Webpack's model, which builds a full dependency graph before the dev server can respond. On large projects this can push cold starts into tens of seconds.

### Minimal configuration

The Tailwind v4 Vite plugin (`@tailwindcss/vite`) requires a single line in `vite.config.ts`. No PostCSS config, no separate `tailwind.config.js`, no custom loaders. The same simplicity holds for the React plugin:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

A comparable Webpack setup would require `webpack.config.js`, `babel.config.js`, `postcss.config.js`, and the correct versions of several loaders wired together manually.

### Production build

For production, Vite delegates to [Rollup](https://rollupjs.org), which produces highly optimised, tree-shaken output. The output is code-split by default with no extra configuration.

## Alternatives Considered

| Alternative | Reason not chosen |
|---|---|
| Webpack | Verbose config, slow cold starts, heavier mental model for a project of this scope |
| Create React App | Officially unmaintained; wraps Webpack with no escape hatch |
| Parcel | Zero-config is appealing, but less community momentum and fewer integrations for this exact stack |
| Turbopack | Tied to Next.js; standalone support is still experimental |
