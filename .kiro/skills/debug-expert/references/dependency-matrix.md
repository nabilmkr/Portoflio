# Dependency Compatibility Matrix

## Table of Contents
1. [JavaScript / Node.js Ecosystem](#javascript)
2. [Python Ecosystem](#python)
3. [Mobile (React Native / Flutter)](#mobile)
4. [Java / Kotlin / Android](#java-kotlin)
5. [Go / Rust](#systems)
6. [Infrastructure / DevOps](#infra)

---

## 1. JavaScript / Node.js Ecosystem

### React Ecosystem Compatibility
```
React 19.x:
  - react-dom: must match react version exactly
  - @types/react: 19.x
  - react-router-dom: v7 (new) or v6 (still works)
  - react-query → @tanstack/react-query v5
  - redux: 9.x  |  redux-toolkit: 2.x
  - framer-motion: 11.x+ (React 19 compatible)
  ⚠️  Many older libs have not yet declared React 19 as peer dep — use --legacy-peer-deps carefully

React 18.x:
  - react-dom: 18.x (exact match)
  - @types/react: 18.x
  - react-router-dom: 6.x
  - @tanstack/react-query: v4 or v5
  - framer-motion: 10.x - 11.x
  - zustand: 4.x+

Common "peer dep" trap:
  → Many libs still declare peerDep as "react": ">=16 <19"
  → Upgrading to React 19 = peer dep warnings everywhere
  → Solution: wait for lib updates, or use resolutions field in package.json
```

### Next.js Compatibility
```
Next.js 15.x (App Router default):
  - React: 19.x (React 18 still works)
  - Node.js: ≥18.18
  - TypeScript: 5.x
  - eslint: 8.x or 9.x
  - @next/font removed → use next/font directly
  ⚠️  Turbopack is default for dev in 15 — may differ from webpack in edge cases

Next.js 14.x:
  - React: 18.x
  - Node.js: ≥18.17
  ⚠️  App Router stable since 13.4. If on Pages Router, migration guide required for App Router

Next.js 13.x:
  - App Router in beta (13.0) → stable (13.4)
  ⚠️  Breaking: `next/image` API changed in 13, `next/link` no longer requires `<a>` child

Common Next.js traps:
  → "window is not defined" = client-only code running on server. Wrap in useEffect or dynamic import
  → Hydration mismatch = server/client render differs. Check: dates, random values, typeof window
  → Image optimization in export mode: requires next export with unoptimized: true
```

### TypeScript Version Traps
```
TS 5.x (2023+):
  - `satisfies` operator available
  - `const` type parameters
  - @types/node: must match your Node.js major

TS 4.x → 5.x breaking changes:
  - `--moduleResolution bundler` added (use for Vite/modern setups)
  - Some strict mode flags became default

Common mistakes:
  → tsconfig.json "moduleResolution": "node" breaks ESM imports in modern setups
     Fix: use "bundler" for Vite, "node16" or "nodenext" for Node ESM
  → paths aliases require plugin (tsconfig-paths, vite-tsconfig-paths) — TS alone doesn't resolve them
```

### Vite Compatibility
```
Vite 6.x:
  - Node.js: ≥18.0
  - @vitejs/plugin-react: 4.x
  - @vitejs/plugin-vue: 5.x
  - vite-plugin-svelte: 3.x+

Vite 5.x:
  - CJS deprecation warnings — transitioning to ESM-only
  - rollup: 4.x (upgraded from 3.x — some plugins broken)
  ⚠️  If plugin breaks in Vite 5, check if rollup 4 compatibility is the issue

vite.config.ts ESM trap:
  → __dirname not available in ESM. Use: import { fileURLToPath } from 'url'
     const __dirname = fileURLToPath(new URL('.', import.meta.url))
```

### TanStack Query (React Query) Migration
```
v5 (current) vs v3/v4:
  BREAKING v3→v5:
  - `useQuery(queryKey, queryFn)` → `useQuery({ queryKey, queryFn })`
  - `onSuccess/onError/onSettled` callbacks REMOVED from useQuery options
    → Move side effects to `useEffect` watching `data`/`error`
  - `cacheTime` renamed to `gcTime`
  - `isLoading` behavior changed: false when disabled, use `isPending` for initial load check
  - `QueryClient.getQueryData` returns undefined, not null, for missing queries
  - `status: "loading"` → `status: "pending"`

v4 → v5:
  - `keepPreviousData` removed → use `placeholderData: keepPreviousData` (import from lib)
  - Devtools separate package: @tanstack/react-query-devtools
```

### Prisma Version Notes
```
Prisma 5.x (current):
  - Client extensions API stable
  - `prisma generate` output: no longer exports `PrismaClient` from `@prisma/client/edge` in same way
  - JSON null handling changed: use Prisma.JsonNull / Prisma.DbNull

Prisma 4.x → 5.x:
  - Removed: `rejectOnNotFound` option → use `findUniqueOrThrow` / `findFirstOrThrow`
  - `prisma db push --force-reset` behavior changed
  
Common Prisma traps:
  → Prisma client not regenerated after schema change: always run `npx prisma generate`
  → Migration drift: `prisma migrate dev` vs `prisma db push` — don't mix in production
  → Prisma in Edge runtime (Vercel Edge, Cloudflare Workers): use Prisma Accelerate or D1
```

---

## 2. Python Ecosystem

### Python Version Compatibility
```
Python 3.12/3.13 (current):
  - TypeVar syntax: type X = ... (new PEP 695)
  - distutils removed — breaks very old packages
  - urllib3 2.x required for modern SSL

Python 3.10+ minimum recommended:
  - match/case statements
  - union types: X | Y instead of Union[X, Y]
  - Better error messages

EOL (stop using, loudly warn):
  - 3.8: EOL Oct 2024
  - 3.9: EOL Oct 2025 (nearly EOL)
```

### Django Compatibility
```
Django 5.x (current):
  - Python: 3.10+ required
  - Removed: CSRF_COOKIE_MASKED, some deprecated fields

Django 4.2 LTS:
  - Python: 3.8 - 3.12
  - Support until April 2026

Django 4.x → 5.x traps:
  - DATABASE['default']['CONN_MAX_AGE'] behavior change
  - `django.utils.timezone.utc` removed → use datetime.timezone.utc

Common Django traps:
  → INSTALLED_APPS order matters for template inheritance
  → Migration conflicts: `python manage.py migrate --run-syncdb` won't fix merge conflicts
     Fix: `python manage.py makemigrations --merge`
  → SECRET_KEY in production: never the default. Always from environment.
```

### FastAPI + Pydantic
```
Pydantic v2 (current) vs v1:
  BREAKING v1→v2:
  - `from pydantic import BaseModel` → same, but validators changed
  - `@validator` removed → use `@field_validator`
  - `.dict()` → `.model_dump()`
  - `.json()` → `.model_dump_json()`
  - `orm_mode = True` → `model_config = ConfigDict(from_attributes=True)`
  - Root validators: `@root_validator` → `@model_validator`

FastAPI with Pydantic v2:
  - FastAPI 0.100+ required for full Pydantic v2 support
  - Older FastAPI + Pydantic v2 = silent validation errors

Common FastAPI traps:
  → Async endpoint but sync DB call = blocks event loop. Use async ORM (SQLAlchemy async) or run_in_executor
  → Dependency injection with async: async def dep() works fine; don't mix
  → CORS: CORSMiddleware must be before other middleware
```

---

## 3. Mobile (React Native / Expo)

### React Native Version Compatibility
```
RN 0.76+ (New Architecture default):
  - Fabric renderer and Turbo Modules enabled by default
  - Many older libs incompatible: check https://reactnative.directory
  - Metro: bundler config changed
  ⚠️  If upgrading to 0.76: audit ALL native modules for New Arch support

RN 0.74-0.75:
  - Bridgeless mode opt-in
  - Yoga 3.0 (layout engine) — some flexbox behavior changes

Expo SDK 52 (RN 0.76):
  - EAS Build required for custom native code
  - expo-modules-core: 2.x
  - All first-party expo packages updated for New Arch

Common RN traps:
  → Metro cache corruption: `npx expo start --clear` or `watchman watch-del-all`
  → "Unable to resolve module X": check metro.config.js resolver, clear cache
  → iOS simulator vs device differences: push notifications, camera, biometrics = device only
  → Android gradle version must match RN version (check build.gradle comments)
```

### React Native Reanimated
```
Reanimated 3.x (current):
  - Requires: react-native ≥ 0.68
  - Requires: `react-native-reanimated/plugin` as LAST babel plugin
  - Worklet functions: must be pure (no closures over non-serializable values)

Reanimated 2 → 3 traps:
  - `useAnimatedScrollHandler` API changed
  - `runOnJS` and `runOnUI` still work
  - Web support improved but still needs config

⚠️  Common crash: "ReanimatedError: Tried to synchronously call a non-worklet function"
  Fix: wrap function in runOnJS(myFn)(args) when calling from worklet
```

### Flutter Compatibility
```
Flutter 3.24+ / Dart 3.5+:
  - Dart: null safety required (has been for years now)
  - flutter_riverpod: 2.x (vs 1.x = completely different API)
  - go_router: 14.x
  - freezed: 2.x (code gen required: dart run build_runner build)

Common Flutter traps:
  → pub cache corrupted: flutter clean && flutter pub get
  → "Null check operator on null value": unwrapping nullable without check
  → build_runner out of sync: always run after model changes
  → iOS Podfile.lock conflict: cd ios && pod install --repo-update
```

---

## 4. Java / Kotlin / Android

### Gradle / AGP Compatibility
```
AGP (Android Gradle Plugin) 8.x:
  - Gradle: 8.x required
  - Java: 17+ required for build tools (not necessarily for app)
  - Kotlin: 1.9+ recommended

AGP 7.x → 8.x breaking:
  - Build config fields handling changed
  - Namespace required in build.gradle (replaces manifest package attribute)

Common Android traps:
  → "Duplicate class kotlin.collections..." = kotlin-stdlib conflict. Add BOM.
  → R8/ProGuard stripping classes in release. Add keep rules.
  → "API level X requires compileSdkVersion Y" → update compileSdkVersion
  → Manifest merger conflicts: add tools:replace="android:X" or tools:node="replace"
```

---

## 5. Go / Rust

### Go Module Traps
```
Go 1.21+:
  - toolchain directive in go.mod
  - log/slog in standard library

Common Go traps:
  → GOPATH vs Go modules: `go mod init` if no go.mod present
  → Circular imports: Go doesn't allow them. Extract shared code to separate package.
  → Interface satisfaction: if method has pointer receiver, only *T satisfies interface, not T
  → Context deadline vs timeout: always pass ctx through call chain, don't create new ctx in handlers
```

### Rust Crate Compatibility
```
Editions: 2015, 2018, 2021 — specify in Cargo.toml
  - Edition 2021: default for new projects, use it

Common Rust traps:
  → Async in Rust requires a runtime (tokio, async-std). Don't mix runtimes.
  → "cannot borrow as mutable because it is also borrowed as immutable"
     → Restructure to end immutable borrow before mutable borrow
  → Feature flags: many crates have optional features. Check Cargo.toml features = [...]
  → Cross-compilation: linker errors = need correct cross-compilation toolchain installed
```

---

## 6. Infrastructure / DevOps

### Docker Traps
```
Docker Compose v2 (current):
  - Command: `docker compose` (space, not hyphen)
  - `docker-compose` v1 EOL July 2023
  - healthcheck: condition: service_healthy syntax changed

Dockerfile best practices (violations cause bugs):
  → COPY . . before npm install = cache miss on every code change
     Fix: COPY package*.json . first, RUN npm ci, then COPY . .
  → Not using .dockerignore = bloated context, leaks .env files
  → Running as root = security risk + permission issues
  → Not pinning base image tags = random breaks (use node:22-alpine not node:latest)
  → Multi-stage builds: COPY --from=builder wrong path = silent missing files
```

### CI/CD Common Failures
```
GitHub Actions:
  → "Resource not accessible by integration": GITHUB_TOKEN permissions
     Fix: add permissions: to workflow or job
  → Cache invalidation: actions/cache key must include lockfile hash
     key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
  → Environment secrets vs repository secrets: different scopes
  → Concurrency group: cancel in-progress to avoid queue buildup

Vercel / Netlify:
  → Build command != local build: check NEXT_PUBLIC_ env vars are set in dashboard
  → Function timeout: default 10s Vercel Hobby, 60s Pro
  → "Module not found" in build: check if dep is in devDependencies vs dependencies
     (build tools need to be in dependencies for serverless functions)
```
