---
name: run-portfolio
description: Build, run, and drive portfolio. Use when asked to start portfolio, run tests, build it, take UI screenshots, or interact with project case studies.
---

Vite React portfolio. Start dev server. Drive browser with Playwright Node one-liner. Commands run from project root.

## Setup

```powershell
npm install
npx playwright install chromium
```

## Build

```powershell
npm run build
```

## Run (agent path)

Start Vite in separate PowerShell process. Default dev server uses port `5173`.

```powershell
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev -- --host=127.0.0.1 --port=5173" -WorkingDirectory "$PWD"
(Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:5173").StatusCode
```

Expected response: `200`.

Drive page. Saves full-page screenshot to `run-screenshot.png`.

```powershell
node -e "const { chromium } = require('playwright'); (async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:1000}}); await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'}); console.log('title='+await p.title()); await p.screenshot({path:'run-screenshot.png',fullPage:true}); await b.close(); })().catch(e=>{console.error(e);process.exit(1)})"
```

Drive first project case study. Checks nine rendered sections. Saves screenshot to `run-case-study.png`.

```powershell
node -e "const { chromium }=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await p.getByRole('button',{name:'Open details for Gap Sense'}).click();const d=p.getByRole('dialog');await d.waitFor();console.log(JSON.stringify({title:await d.getByRole('heading',{name:'Gap Sense'}).textContent(),sections:await d.getByRole('heading',{level:3}).allTextContents()}));await p.screenshot({path:'run-case-study.png',fullPage:true});await d.getByRole('button',{name:'Close case study'}).click();await d.waitFor({state:'detached'});await b.close()})().catch(e=>{console.error(e);process.exit(1)})"
```

Screenshots: `run-screenshot.png`, `run-case-study.png` in project root.

## Gotchas

- `npm run dev -- --host 127.0.0.1 --port 4173` fails under Vite 8 with `CACError: Unused args: \`4173\``. Use equals syntax: `--host=127.0.0.1 --port=5173`.
- Project cards expose case studies as `article[role="button"]`, not nested buttons. Target accessible name `Open details for Gap Sense`.
