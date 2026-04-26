# Error Pattern Quick Reference

## Table of Contents
1. [JavaScript Runtime Errors](#javascript)
2. [React & React Hooks](#react)
3. [Python](#python)
4. [Go](#go)
5. [Rust](#rust)
6. [SQL & Databases](#sql)
7. [HTTP & Network](#network)
8. [Shell & CLI Errors](#shell)
9. [Git Errors](#git)
10. [Memory & Performance Signals](#performance)

---

## JavaScript Runtime Errors {#javascript}

```
TypeError: Cannot read properties of undefined (reading 'X')
  Cause: Accessing .X on undefined. The object/array upstream is undefined.
  Debug: console.log the object immediately before the line that errors.
  Fix:   Optional chaining obj?.X, or ensure data is loaded before accessing.
  
TypeError: Cannot read properties of null (reading 'X')
  Cause: Accessing .X on null (different from undefined).
  Fix:   Null check or optional chaining. Ask: why is this null here?

TypeError: X is not a function
  Cause: X is null/undefined/a non-function type. Wrong import, or variable shadowing.
  Debug: console.log(typeof X) right before call.
  Fix:   Check import, check variable name collision.

ReferenceError: X is not defined
  Cause: Variable used before declaration, or outside its scope.
  Fix:   Hoist declaration, check for typo in variable name, check import.

TypeError: Cannot set properties of undefined
  Cause: Trying to assign to a property of undefined: obj.x = 1 where obj is undefined.
  Fix:   Initialize obj first, or use obj = obj ?? {}

SyntaxError: Unexpected token '<'
  Cause (in browser/bundler): Server returned HTML (error page) instead of JS/JSON.
  Fix:   Check network tab. Server probably returned a 404/500 HTML page.

SyntaxError: Unexpected end of JSON input / JSON.parse error
  Cause: String passed to JSON.parse is not valid JSON — empty string, HTML, or partial.
  Fix:   Log the raw string before parsing. Check the API response.

RangeError: Maximum call stack size exceeded
  Cause: Infinite recursion.
  Fix:   Add base case. Log depth. Use iteration if recursion depth is large.

UnhandledPromiseRejection
  Cause: await in async function threw, no try/catch. Or .then() without .catch().
  Fix:   Add try/catch around awaits. Global handler: process.on('unhandledRejection')

CORS error (Access-Control-Allow-Origin)
  Cause: Browser blocked request. Server doesn't include CORS headers.
  Fix:   Server-side change (add CORS headers). Not a frontend fix.
  Note:  If you see CORS in production: check that API URL is correct first.
```

---

## React & React Hooks {#react}

```
Warning: Each child in a list should have a unique "key" prop
  Cause: Rendering array without stable key.
  Fix:   key={item.id} — use database ID, not array index.
  Why:   React needs keys to track element identity across re-renders.

Error: Rendered more hooks than during previous render
  Cause: Hooks called conditionally or inside loops.
  Rule:  Hooks must ALWAYS be called in same order, every render.
  Fix:   Move conditional logic inside the hook, not around it.

Warning: Can't perform a React state update on an unmounted component
  Cause: setState called after component unmounted (async operation completed).
  Fix:   Cleanup in useEffect return function. Cancel async ops or check mounted flag.

Warning: Maximum update depth exceeded
  Cause: setState inside render, or useEffect missing deps array (runs every render).
  Fix:   Check useEffect deps. Never call setState unconditionally in render.

Warning: React Hook useEffect has missing dependencies
  Cause: ESLint rule catching potential stale closure.
  Fix:   Add missing dep. If dep changes too often: useCallback, useMemo, or useRef.
  Never: Just add // eslint-disable — that hides bugs.

Hydration failed / Text content did not match
  Cause: Server and client rendered different HTML.
  Fix:   Find the conditional render that differs by environment.
  Common culprits: Math.random(), Date.now(), window checks, browser extensions.

act(...) warning in tests
  Cause: State update happening outside act() in test.
  Fix:   Wrap user interactions: await act(async () => { fireEvent.click(btn) })
  Or:    Use @testing-library/react's userEvent which wraps in act automatically.
```

---

## Python {#python}

```
IndentationError: unexpected indent / expected an indented block
  Cause: Mixed tabs and spaces, or wrong indentation level.
  Fix:   Use only spaces (PEP 8: 4 spaces). Run: python -m py_compile file.py

AttributeError: 'NoneType' object has no attribute 'X'
  Cause: A function returned None unexpectedly. obj.method() returned None.
  Debug: Print obj before accessing .X.
  Fix:   Add None check. Fix the function that returned None.

AttributeError: module 'X' has no attribute 'Y'
  Cause: Wrong module version, deprecated API, or naming collision (your file shadows stdlib).
  Check: import X; print(X.__file__)  ← is it the right module?
  Fix:   Check version, check for name collision with your own files.

KeyError: 'X'
  Cause: dict['X'] where key 'X' doesn't exist.
  Fix:   dict.get('X') for safe access, or dict.get('X', default_value).

IndexError: list index out of range
  Cause: Accessing list[n] where n >= len(list) or list is empty.
  Fix:   Check len(list) > n before accessing, or handle empty case.

RecursionError: maximum recursion depth exceeded
  Cause: Infinite recursion (missing or wrong base case).
  Fix:   Add/fix base case. sys.setrecursionlimit only as last resort.

StopIteration raised inside generator
  Cause (Python 3.7+): Raising StopIteration inside generator is RuntimeError.
  Fix:   Use return instead of raising StopIteration.

ImportError: cannot import name 'X' from 'Y'
  Cause: X doesn't exist in Y (wrong name, wrong version, circular import).
  Check: dir(module) to see what's available.
  Fix:   Verify API of the installed version. Check for circular imports.

PicklingError / can't pickle X
  Cause: Trying to serialize unpicklable object (lambda, local function, file handle).
  Fix:   Use module-level named functions, not lambdas. Close file handles before pickling.

UnicodeDecodeError / UnicodeEncodeError
  Cause: Byte string decoded with wrong encoding.
  Fix:   open(file, encoding='utf-8') or open(file, encoding='latin-1').
  Debug: Try errors='replace' to see where it fails.
```

---

## Go {#go}

```
panic: runtime error: index out of range [N] with length M
  Cause: Slice access with index >= len(slice).
  Fix:   Check len(slice) > N before accessing. Or bounds-check your loop.

panic: runtime error: invalid memory address or nil pointer dereference
  Cause: Dereferencing nil pointer. Function returned nil where non-nil expected.
  Fix:   Check for nil before dereferencing: if ptr != nil { ... }

panic: interface conversion: interface {} is nil, not X
  Cause: Type asserting nil interface.
  Fix:   Use comma-ok: val, ok := iface.(X) — check ok before using val.

goroutine N [chan receive]: (deadlock)
  Cause: All goroutines stuck waiting on channels. Deadlock.
  Fix:   Ensure every channel send has a corresponding receive (or use select with default).

fatal error: concurrent map read and map write
  Cause: Map accessed from multiple goroutines without sync.
  Fix:   Use sync.RWMutex or sync.Map for concurrent map access.

imported and not used / declared but not used
  Cause: Go disallows unused imports and variables (compile error).
  Fix:   Remove unused import, or use _ for blank identifier.

cannot use X (variable of type Y) as type Z
  Cause: Type mismatch. Interface not satisfied, or wrong concrete type.
  Fix:   Check if all interface methods are implemented. Check pointer vs value receiver.

build constraints mismatch / cannot load: no Go files
  Cause: Build tags exclude all files, or wrong OS/GOARCH.
  Fix:   Check //go:build constraints. Run: GOOS=linux go build ./...
```

---

## Rust {#rust}

```
error[E0382]: borrow of moved value: `X`
  Cause: Value moved into function/binding, then used again.
  Fix:   Clone before move: x.clone(). Or use &x to borrow instead.

error[E0502]: cannot borrow `X` as mutable because it is also borrowed as immutable
  Cause: Immutable borrow still in scope when mutable borrow attempted.
  Fix:   End immutable borrow before mutable. Often: restructure to clone the needed value.

error[E0597]: `X` does not live long enough
  Cause: Reference outlives the data it refers to.
  Fix:   Return owned types (String not &str). Use 'static or restructure ownership.

error[E0277]: the trait bound `X: Y` is not satisfied
  Cause: Type X doesn't implement trait Y. Often: not Send/Sync for async, missing Clone.
  Fix:   Implement the trait, add #[derive(Clone)], or constrain the type differently.

error[E0308]: mismatched types: expected `X`, found `Y`
  Cause: Common with Option/Result not handled. Or wrong enum variant.
  Fix:   Unwrap/match Result or Option. Check if ? operator needed.

warning: unused Result that must be used
  Cause: Ignoring a Result return (might be an error).
  Fix:   Handle with match/if let/?, or explicitly ignore with let _ = ...

thread 'main' panicked at 'called `Option::unwrap()` on a `None` value'
  Cause: .unwrap() on None. 
  Fix:   Use .expect("message") for better error. Or handle with if let/match.

error: linker `cc` not found / linker error
  Cause: C toolchain not installed.
  Fix:   Ubuntu: sudo apt install build-essential. Mac: xcode-select --install.
```

---

## SQL & Databases {#sql}

```
ERROR: relation "X" does not exist
  Cause: Table doesn't exist, wrong schema, or migration not run.
  Fix:   Check: \dt in psql. Run migrations. Check search_path/schema.

ERROR: column "X" of relation "Y" does not exist
  Cause: Migration adding column not applied, or column name typo.
  Fix:   Run migration. Check column name with: \d table_name

ERROR: duplicate key value violates unique constraint "X"
  Cause: INSERT/UPDATE violates unique constraint.
  Fix:   Use INSERT ... ON CONFLICT DO UPDATE. Or check before inserting.

ERROR: deadlock detected
  Cause: Two transactions hold locks each other needs.
  Fix:   Ensure consistent lock ordering. Use shorter transactions.
  Fix:   Implement retry logic with exponential backoff for deadlocks.

ERROR: canceling statement due to conflict with recovery (replica)
  Cause: Read replica: query conflicting with WAL replay.
  Fix:   Set hot_standby_feedback = on. Or increase recovery_min_apply_delay.

ERROR: too many connections
  Cause: Connection pool exhausted or no pooling.
  Fix:   Add PgBouncer. Reduce pool size per app instance. Close connections.

EXPLAIN ANALYZE shows Seq Scan on large table
  Cause: Missing index, or query planner chooses seq scan (small table or bad stats).
  Fix:   CREATE INDEX CONCURRENTLY. Run ANALYZE to update statistics.
  Check: Is the index being used? EXPLAIN (ANALYZE, BUFFERS) shows index usage.

SQLITE: database is locked
  Cause: Multiple writers or long-running reader with WAL mode off.
  Fix:   Enable WAL mode: PRAGMA journal_mode=WAL. Reduce concurrent writes.
```

---

## HTTP & Network {#network}

```
400 Bad Request
  Cause: Client sent malformed request. Check request body, headers, content-type.
  Debug: Log the raw request body server-side.

401 Unauthorized
  Cause: Missing or invalid authentication token.
  Fix:   Check: token present? expired? correct format? Bearer vs Basic?

403 Forbidden
  Cause: Authenticated but not authorized.
  Fix:   Check user permissions/roles for this resource.

404 Not Found
  Cause: Route doesn't exist, or resource doesn't exist.
  Debug: Check exact URL being called. Check route registration.

422 Unprocessable Entity
  Cause: Request understood but validation failed (FastAPI/Rails standard).
  Fix:   Check response body — it tells you exactly which fields failed.

429 Too Many Requests
  Cause: Rate limited.
  Fix:   Add retry with exponential backoff. Check rate limit headers (Retry-After).

502 Bad Gateway
  Cause: Upstream server (your app) crashed or not running.
  Fix:   Check app logs. Is the process running? Port binding correct?

503 Service Unavailable
  Cause: Server overloaded or in maintenance. Or health check failing.
  Fix:   Check app memory/CPU. Check health check endpoint.

SSL/TLS certificate error
  "certificate verify failed": cert expired, self-signed, or wrong hostname.
  Fix (server): Renew cert with certbot. Fix hostname in cert SAN.
  Fix (client dev): Only if you own the server: disable verification (dev only).
  Never: Disable SSL verification in production.

ECONNREFUSED
  Cause: Nothing listening on that port.
  Fix:   Is the server running? Correct port? Firewall blocking?

ETIMEDOUT
  Cause: Server took too long to respond. Network issue or slow server.
  Fix:   Check server load. Increase client timeout. Add retry logic.
```

---

## Shell & CLI Errors {#shell}

```
command not found: X
  Cause: Not installed, or not in PATH.
  Fix:   which X to check. Add to PATH in ~/.bashrc or ~/.zshrc.

Permission denied (chmod/file access)
  Cause: Wrong file permissions.
  Fix:   chmod +x script.sh. Check ownership with ls -la.

No such file or directory
  Cause: Typo in path, or directory doesn't exist yet.
  Fix:   pwd to check current dir. ls to see what exists. mkdir -p to create dirs.

EACCES / EPERM (npm/node)
  Cause: npm trying to install to system directory.
  Fix:   Use nvm to manage Node. Never sudo npm install -g.

-bash: ./script.sh: /bin/bash^M: bad interpreter
  Cause: Windows line endings (CRLF) in shell script.
  Fix:   dos2unix script.sh or sed -i 's/\r//' script.sh

Argument list too long
  Cause: Too many arguments to command (usually: cp dir/* dest with huge dir).
  Fix:   Use find and xargs: find src -name "*.txt" | xargs cp -t dest/
```

---

## Git Errors {#git}

```
error: Your local changes to the following files would be overwritten by merge
  Fix:   git stash, then git pull, then git stash pop.

CONFLICT (content): Merge conflict in X
  Fix:   Open file, resolve <<<<<< markers manually, then git add X && git commit.

error: failed to push some refs to origin
  Cause: Remote has commits you don't have.
  Fix:   git pull --rebase origin main, then push again.
  Never: git push --force on shared branches.

fatal: refusing to merge unrelated histories
  Cause: Two repos with no common commit being merged.
  Fix:   git pull origin main --allow-unrelated-histories

detached HEAD state
  Cause: Checked out a commit directly, not a branch.
  Fix:   git checkout -b new-branch to save work. Or git checkout main to discard.

fatal: pathspec 'X' did not match any files
  Cause: File doesn't exist, or wrong path.
  Fix:   git status to see tracked files. Check for typos.
```

---

## Memory & Performance Signals {#performance}

```
JavaScript Heap Out of Memory (Node.js)
  Cause: Memory leak or legitimately large data.
  Fix:   node --max-old-space-size=4096 script.js (increase limit as workaround)
  Find:  Use --inspect + Chrome DevTools > Memory > heap snapshot
  Common leaks: global state accumulation, unclosed streams, event listeners

Python MemoryError
  Cause: Object too large, or memory leak.
  Fix:   Use generators instead of lists for large datasets.
  Tool:  memory_profiler: @profile decorator shows per-line memory usage.

Go OOM / large heap
  Cause: Slice/map growing unbounded.
  Tool:  pprof: go tool pprof http://localhost:6060/debug/pprof/heap
  Fix:   Implement LRU cache, add capacity limits.

Rust stack overflow (not heap)
  Cause: Deep recursion.
  Fix:   Increase stack: thread::Builder::new().stack_size(8 * 1024 * 1024).spawn(...)
  Or:    Convert recursion to iteration with explicit stack (Vec).

CPU spike without obvious cause:
  JS: console.time()/timeEnd() to locate. Chrome Performance tab for waterfall.
  Python: cProfile: python -m cProfile -s cumulative script.py
  Go: pprof CPU: go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
  Rust: cargo flamegraph or perf on Linux.

Event loop lag (Node.js):
  Cause: Synchronous CPU work blocking event loop.
  Detect: --inspect + async_hooks. Or clinic.js doctor.
  Fix:   Move CPU work to worker_threads. Break work into chunks with setImmediate.
```
