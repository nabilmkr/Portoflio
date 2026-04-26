# Debugging Playbooks by Domain

## Table of Contents
1. [Next.js / React SSR](#nextjs)
2. [React Native / Expo](#react-native)
3. [Node.js / Express / Fastify](#nodejs)
4. [Python / Django / FastAPI](#python)
5. [Infrastructure / Docker / CI-CD](#infra)
6. [Database / ORM / Prisma](#database)
7. [iOS / Swift / Xcode](#ios)
8. [Android / Kotlin / Gradle](#android)
9. [Systems (Rust / Go / C++)](#systems)
10. [TypeScript Compiler](#typescript)

---

## Next.js {#nextjs}

### Build Failures
```
Error: Build optimization failed
  1. Check for dynamic imports without ssr: false on client-only code
  2. Check for process.env access at module level (not inside function)
  3. Run: next build --debug for verbose output

"Module not found: Can't resolve X"
  1. Is it installed? (check package.json)
  2. Is it a server-only package imported in client component? Add "use client" or move import
  3. Path alias configured in tsconfig.json + next.config.js (both needed)

Static export errors:
  → next export requires: output: 'export' in next.config.js
  → Dynamic routes need generateStaticParams()
  → Image optimization must be disabled: unoptimized: true
```

### Runtime Errors
```
Hydration mismatch checklist:
  □ Date formatting (server vs client timezone)
  □ Math.random() or crypto.randomUUID() at render time
  □ typeof window !== 'undefined' conditional rendering
  □ Browser extensions injecting DOM elements
  □ CSS-in-JS class name mismatch
  Fix: Wrap problematic code in useEffect, or use suppressHydrationWarning (last resort)

"cookies() / headers() should be awaited" (Next.js 15)
  → Next 15 made cookies(), headers(), params async
  → Fix: const cookieStore = await cookies()

API Route vs Server Action confusion:
  → API Routes: app/api/*/route.ts — export GET, POST, etc.
  → Server Actions: "use server" directive, called from client components
  → Don't mix: calling an API route URL from a Server Action is wrong pattern
```

### Performance
```
Slow builds:
  → Enable Turbopack: next dev --turbo (dev only as of Next 15)
  → Analyze bundle: @next/bundle-analyzer
  → Check for large dependencies imported in Server Components

Slow page loads:
  → Use React DevTools Profiler
  → Check Suspense boundaries — are you waterfalling requests?
  → Use parallel data fetching: const [a, b] = await Promise.all([fetchA(), fetchB()])
```

---

## React Native / Expo {#react-native}

### Metro Bundler Issues
```
"Unable to resolve module X from Y"
  1. Clear metro cache: npx expo start --clear
  2. Delete node_modules + reinstall
  3. Check metro.config.js resolver.extraNodeModules
  4. For monorepos: add watchFolders to metro.config.js

"React Native version mismatch"
  → Run: npx react-native doctor
  → Check: node_modules/react-native/package.json version vs package.json

Infinite bundling loop:
  → Circular dependency. Use: npx madge --circular src/
  → Deferred import inside the circle: const X = require('./x') inside function
```

### Native Module Crashes
```
"null is not an object (evaluating 'X.Y')"
  → Native module not linked. For Expo: ensure module is in expo plugins config
  → For bare RN: run pod install (iOS) or gradle sync (Android)

"TurboModuleRegistry.getEnforcing failed: X"
  → New Architecture: module not compatible. Check react-native.directory for New Arch status
  → Disable new arch in app.json if module doesn't support it:
    "newArchEnabled": false

iOS specific crash on device (not simulator):
  → Check for simulator-only APIs (push notifications, NFC, some camera features)
  → Provisioning profile mismatch in Xcode
  → Check device iOS version vs deployment target
```

### Expo-specific
```
"SDK mismatch" in Expo Go:
  → Your app SDK != Expo Go SDK. Use EAS Build or match versions.
  → expo upgrade to align versions

EAS Build failures:
  → Check eas.json build profile env vars
  → iOS: Certificates provisioned? Run: eas credentials
  → Android: Keystore configured? Run: eas credentials
  → Check build logs at expo.dev/accounts/[account]/builds

OTA Updates not applying:
  → Native code changed? OTA only updates JS bundle. Need new build.
  → Check Updates.checkForUpdateAsync() return value
  → runtimeVersion mismatch between build and update
```

### Performance
```
Laggy animations:
  → Not using react-native-reanimated? Switch from Animated API.
  → JS thread blocked? Profile with Flipper or React DevTools
  → Heavy component re-renders? Add React.memo and check useMemo/useCallback

FlatList performance:
  → Use FlashList from @shopify/flash-list
  → Add getItemLayout if item heights are fixed
  → Add removeClippedSubviews={true}
  → Move renderItem outside component or wrap in useCallback
  → keyExtractor must return stable unique string (never index for dynamic lists)
```

---

## Node.js / Express / Fastify {#nodejs}

### Common Crashes
```
"Cannot find module X" (runtime, not build time)
  → Not in dependencies (is it in devDependencies only?)
  → node_modules deleted/not installed
  → ES module: .js extension required in import path for ESM projects

"Error: listen EADDRINUSE :::3000"
  → Port already in use. Kill: lsof -ti:3000 | xargs kill -9
  → Or change port in config

Memory leaks:
  → Common sources: unclosed DB connections, event listener accumulation, large object caches
  → Detect: node --inspect → Chrome DevTools → Memory tab → take heap snapshot
  → Fix: close connections in finally blocks, use removeEventListener, implement LRU cache
```

### Async/Await Pitfalls
```
Unhandled promise rejection:
  → In Express: async handlers must catch errors explicitly or use express-async-errors wrapper
  → Pattern: router.get('/', asyncHandler(async (req, res) => { ... }))
  → Node 15+: unhandled rejections crash the process (good! don't suppress)

Callback vs Promise mixing:
  → util.promisify() to convert callback APIs
  → Never do: new Promise((resolve) => { someCallback(() => resolve()) }) without reject

Event loop blocking:
  → CPU-intensive work blocks all requests. Use: worker_threads or child_process
  → Signs: setTimeout fires late, request timeouts under load
  → Detect: clinic.js doctor, 0x flame graph
```

---

## Python / Django / FastAPI {#python}

### Environment Issues (most common category)
```
"ModuleNotFoundError" when module clearly installed:
  1. Which python? Run: which python && python --version
  2. Is venv activated? Check prompt prefix or: echo $VIRTUAL_ENV
  3. Installed in wrong env? pip install X → which pip
  4. In Docker: did you copy requirements.txt before RUN pip install?
  
Fix workflow:
  python -m venv venv
  source venv/bin/activate  (Linux/Mac) | venv\Scripts\activate (Windows)
  pip install -r requirements.txt
```

### Django Specific
```
"No module named 'myapp'" despite being in project:
  → INSTALLED_APPS missing the app, OR
  → Running manage.py from wrong directory

Migration errors:
  "Table already exists" → fake the migration: manage.py migrate --fake appname 0001
  "Column does not exist" → migration not applied: manage.py migrate
  Merge conflict → manage.py makemigrations --merge

QuerySet lazy evaluation trap:
  → qs = MyModel.objects.all()  ← not evaluated yet
  → qs.filter(x=1)  ← still not evaluated, returns new qs
  → list(qs) or iterating = evaluates
  → N+1 query: use select_related (FK) and prefetch_related (M2M)
  → Detect N+1: django-debug-toolbar or django-silk
```

### FastAPI / Pydantic
```
Validation error 422 in production but not locally:
  → Request body doesn't match Pydantic model
  → Check: response.json() for detail field — it lists exactly which fields failed
  → Common: int vs str, missing required field, wrong date format

Async database deadlock:
  → Using sync SQLAlchemy in async FastAPI route
  → Fix: use SQLAlchemy async engine + AsyncSession
  → Or: run_in_executor for sync DB calls (less ideal)
```

---

## Infrastructure / Docker / CI-CD {#infra}

### Docker Debugging
```
Container exits immediately:
  → CMD/ENTRYPOINT process crashes. Check: docker logs <container>
  → If process needs foreground: don't use daemon mode in Docker
  → Fix: docker run -it image_name /bin/sh to inspect manually

"exec /app/start.sh: no such file or directory"
  → File doesn't exist OR wrong line endings (CRLF vs LF on Windows)
  → Fix: dos2unix start.sh, or in Dockerfile: RUN sed -i 's/\r//' start.sh

Container networking issues:
  → Service A can't reach Service B:
    - Same docker-compose file? Use service name as hostname (not localhost)
    - Different compose files? Must be on same network
    - Check: docker network ls, docker network inspect
  → "Connection refused" from container to host: use host.docker.internal (Mac/Win)

Build cache invalidation:
  → Place in Dockerfile from least-changing to most-changing:
    1. Base image
    2. System packages (apt-get)
    3. Dependency files (package.json, requirements.txt)
    4. Dependency install (npm ci, pip install)
    5. Source code COPY
    6. Build command
```

### Kubernetes
```
Pod CrashLoopBackOff:
  kubectl logs <pod> --previous  ← previous container logs
  kubectl describe pod <pod>  ← events section is most useful
  Common causes: missing env var, bad secret reference, OOM killed, bad liveness probe

OOMKilled:
  → Container exceeded memory limit
  → Fix: increase resources.limits.memory OR fix memory leak
  → Check: kubectl top pod

ImagePullBackOff:
  → Wrong image name/tag OR registry credentials missing
  → Fix: kubectl create secret docker-registry regcred ...
  → Or: check if image exists: docker pull image:tag

Service not reachable:
  → Check selector matches pod labels exactly (case sensitive)
  → kubectl get endpoints <service> — if empty, selector doesn't match
  → Check if pod is Running and Ready
```

### GitHub Actions
```
Failing with permissions error:
  → Add to workflow:
    permissions:
      contents: read
      packages: write  (for GHCR)
      id-token: write  (for OIDC)

Slow workflows:
  → Cache dependencies:
    - name: Cache node modules
      uses: actions/cache@v4
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

Secrets not available in PR from fork:
  → Expected behavior for security. Use environment protection rules.
  → Or: use pull_request_target (with caution — security implications)
```

---

## Database / ORM / Prisma {#database}

### PostgreSQL
```
"too many connections":
  → App opening connections without pooling
  → Fix: add PgBouncer, or configure pool size in ORM
  → Check: SELECT count(*) FROM pg_stat_activity;
  → Kill idle: SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle'

Slow queries:
  → EXPLAIN ANALYZE <query>  ← your best friend
  → "Seq Scan" on large table = missing index
  → "Nested Loop" on large tables = join order issue
  → Add index: CREATE INDEX CONCURRENTLY idx_name ON table(column);
  → CONCURRENTLY = no table lock

"could not serialize access due to concurrent update" (serializable isolation):
  → Expected with SERIALIZABLE. Implement retry logic.
  → Or downgrade to REPEATABLE READ if serialization not critical
```

### Prisma
```
"PrismaClientKnownRequestError: The table main.X does not exist"
  → Migrations not applied. Run: npx prisma migrate deploy (prod) or migrate dev (dev)

"Error: P1001: Can't reach database server"
  → DATABASE_URL wrong, DB not running, or network issue
  → Test: psql $DATABASE_URL

Schema drift:
  → DB differs from Prisma schema. Run: npx prisma migrate diff
  → In dev: npx prisma db push (destructive, dev only)
  → In prod: NEVER db push, only migrate deploy

N+1 in Prisma:
  → Detected: prisma.$on('query') logger shows repeated queries
  → Fix: include related models: prisma.user.findMany({ include: { posts: true } })
  → Or: prisma.$transaction for batching
```

---

## iOS / Swift / Xcode {#ios}

### Build Failures
```
"No such module X":
  1. Pod not installed: cd ios && pod install
  2. Clean build folder: Cmd+Shift+K
  3. Wrong target: check Build Phases > Link Binary with Libraries
  4. Swift Package version conflict: File > Packages > Resolve Package Versions

"Signing certificate" errors:
  → Xcode > Preferences > Accounts > Download Manual Profiles
  → Or: Automatically manage signing checked + right Team selected

Simulator vs Device differences:
  → Architecture: Simulator = x86_64/arm64 macOS, Device = arm64 iOS
  → Some frameworks only work on device (NFC, Push, Bluetooth)
  → Test: Product > Destination > switch to physical device
```

### Swift Concurrency
```
"Task cancelled" unexpectedly:
  → Task was cancelled before completion. Always check: try Task.checkCancellation()
  → Parent task cancelled? Child tasks auto-cancel.

"Actor isolation" error:
  → Accessing @MainActor property from background task
  → Fix: await MainActor.run { ... } or mark function @MainActor

"Data race" in Swift 6:
  → Swift 6 strict concurrency makes data races compile errors
  → Fix: use Sendable, actors, or @unchecked Sendable (last resort)
```

---

## Android / Kotlin / Gradle {#android}

### Build Failures
```
"Execution failed for task ':app:mergeDebugResources'"
  → Duplicate resource names. Check res/ folders for conflicts.
  → Or: a library has resource that conflicts with yours. Use resConfigs.

"Manifest merger failed":
  → Two manifests declare same attribute differently
  → Fix: add to your manifest: tools:replace="android:X" on conflicting element

"Duplicate class kotlin.X" / "Duplicate class androidx.X":
  → Dependency version conflict. Use BOM:
    implementation(platform("org.jetbrains.kotlin:kotlin-bom:X.Y.Z"))
  → Or: force resolution: configurations.all { resolutionStrategy.force "groupId:artifactId:version" }

Gradle sync never finishes:
  → Proxy settings blocking downloads: check gradle.properties
  → Clear: ~/.gradle/caches/
  → Check: File > Invalidate Caches / Restart
```

### Kotlin Coroutines
```
"Job was cancelled" / "CancellationException":
  → Expected when coroutine scope is cancelled. Don't catch CancellationException and continue.
  → Always rethrow: catch (e: CancellationException) { throw e }

"NetworkOnMainThreadException":
  → Network call on main thread. Move to Dispatchers.IO
  → viewModelScope.launch(Dispatchers.IO) { ... }
  → Or: withContext(Dispatchers.IO) { ... } inside coroutine

StateFlow vs LiveData update not showing:
  → Collecting in wrong lifecycle state. Use repeatOnLifecycle(Lifecycle.State.STARTED)
  → flowWithLifecycle() extension as alternative
```

---

## Systems (Rust / Go / C++) {#systems}

### Rust
```
Borrow checker walkthrough:
  "cannot borrow X as mutable more than once at a time"
  → Two &mut borrows in same scope. Common with HashMap + insert:
    let val = map.get(&key).cloned();  // clone to end borrow
    if val.is_none() { map.insert(key, new_val); }

  "cannot move out of X which is behind a shared reference"
  → Clone the value: let owned = reference.clone();
  → Or restructure to avoid move

Lifetime errors:
  → "lifetime 'a outlives 'b": structure holding reference outlives reference source
  → Often: return owned types (String not &str) from functions
  → Add lifetime annotations methodically using compiler hints

Async Rust:
  → "future cannot be sent between threads safely": type in future is not Send
  → Common: std::sync::Mutex (use tokio::sync::Mutex in async)
  → Or: restructure to drop non-Send types before await points
```

### Go
```
Race conditions (use -race flag):
  go test -race ./...
  go run -race main.go
  → Fix: protect shared state with sync.Mutex or use channels

Goroutine leak:
  → Goroutine waiting on channel that will never receive
  → Fix: always use context.Context for cancellation:
    go func() {
      select {
      case result := <-ch:
        // handle
      case <-ctx.Done():
        return
      }
    }()

Error handling:
  → "if err != nil" everywhere is correct Go. Don't "simplify" with panic.
  → Wrap errors with context: fmt.Errorf("doing X: %w", err)
  → Unwrap: errors.Is(err, target), errors.As(err, &target)
```

---

## TypeScript Compiler {#typescript}

### Common TS Errors
```
"Object is possibly null/undefined":
  → Optional chaining: obj?.prop
  → Non-null assertion (only when certain): obj!.prop
  → Type guard: if (obj !== null) { ... }
  → Never just cast: (obj as SomeType).prop — this hides bugs

"Property X does not exist on type Y":
  → Type is wrong. Don't cast to any.
  → Check: what type is this actually? Hover in VSCode.
  → Narrow the type: use type guards, discriminated unions, or typeof checks

"Type 'X' is not assignable to type 'Y'":
  → Check the full type of both sides. Usually an optional field missing.
  → Partial<T> if object might be incomplete.
  → Omit<T, 'field'> to exclude specific fields.
  → Never: as any — this propagates type unsafety.

ESM/CJS module resolution errors:
  "has no exported member X" from .d.ts:
  → Check: is this package ESM-only? Update moduleResolution in tsconfig.
  → "node16" or "bundler" for modern projects.
  → "node" = legacy, may not see ESM exports correctly.

Declaration files (.d.ts):
  "Could not find a declaration file for module X":
  → Install @types/X if available
  → If no types: create src/types/X.d.ts with: declare module 'X' { export function ... }
  → Or add to tsconfig: "noImplicitAny": false (last resort)
```

### tsconfig.json Best Practices
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",  // for Vite/modern; use "node16" for Node ESM
    "strict": true,                  // ALWAYS. Never turn off strict mode.
    "noUncheckedIndexedAccess": true, // catches arr[0] possibly undefined
    "exactOptionalPropertyTypes": true, // prevents undefined assignment to optional
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,            // skip type checking of .d.ts in node_modules
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
