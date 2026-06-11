# Decision: pnpm

## Choice

[pnpm](https://pnpm.io) v11 — package manager.

## Reason

### Supply chain security: the npm hoisting problem

npm and Yarn (classic) hoist packages into a flat `node_modules` directory. This means that any package in your dependency tree — including deeply nested transitive dependencies you never explicitly installed — can `require()` any other package that ends up in that flat directory.

This is a structural vulnerability. If a malicious or compromised package is published at any level of your dependency graph, it can silently access modules it was never supposed to reach, including packages that hold credentials, filesystem access utilities, or build-time tools.

A well-known class of attack exploiting this model is **dependency confusion** (also called namespace confusion): an attacker publishes a public npm package with the same name as an internal private package used by a target organisation. npm's resolver may prefer the public registry version, silently installing the attacker's code into CI/CD pipelines and developer machines.

#### The `colors` / `faker` incident (January 2022)

In January 2022, Marak Squires — the sole maintainer of `colors` (~22 million weekly downloads) and `faker` (~2.5 million weekly downloads) — intentionally introduced an infinite loop into both packages. Projects that ran `npm install` in the days following the publish received broken builds immediately, because npm's default resolution could pull the new version even without an explicit upgrade.

This incident highlighted that **anyone with publish rights to a widely-used package can push breaking or malicious code into thousands of downstream projects** with no friction.

#### Why pnpm reduces this attack surface

pnpm uses a **non-flat, isolated `node_modules` structure**. Each package only has access to the dependencies it explicitly declares in its own `package.json`. Phantom dependencies — packages your code uses but didn't declare — are blocked at resolution time rather than silently available.

```
# npm / Yarn (flat — all packages visible to all packages)
node_modules/
  react/
  lodash/          ← accessible to any package, even if not declared
  some-dep/

# pnpm (isolated — each package sees only its declared deps)
node_modules/
  .pnpm/
    react@19.0.0/node_modules/react/
    lodash@4.17.21/node_modules/lodash/
  react -> .pnpm/react@19.0.0/...   ← symlink, scoped to declared deps
```

A compromised transitive dependency cannot reach your build tools or your application code unless there is a direct, declared dependency path between them.

### Content-addressable store

pnpm stores every version of every package once in a global content-addressable store (`~/.pnpm-store`). When you install the same package across ten projects, the files are hard-linked — not copied. This means:

- **Faster installs** — packages already in the store don't download again.
- **Disk efficiency** — no duplication across projects.
- **Integrity verification** — each file in the store is addressed by its content hash. A tampered file produces a hash mismatch and the install fails.

### Lockfile strictness

`pnpm-lock.yaml` records the exact resolved version and integrity hash of every package in the tree. Running `pnpm install` with an existing lockfile is reproducible and verifiable. CI environments get the exact same tree as local development with no resolution ambiguity.

## Alternatives Considered

| Alternative | Reason not chosen |
|---|---|
| npm | Flat `node_modules`, phantom dependencies allowed, slower installs on repeat runs |
| Yarn Classic (v1) | Same flat hoisting model as npm; largely superseded |
| Yarn Berry (v2+) | Plug'n'Play mode solves phantom deps similarly to pnpm, but has ecosystem compatibility issues with some tools; less community momentum than pnpm |
| Bun | Fast, but package management is still maturing; lockfile format not yet stable across versions |
