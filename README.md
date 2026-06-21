# Context Harvester

> Multi-tab LLM context builder — collect, organize, and export content from multiple browser tabs as structured, token-aware prompts.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Install-blue?logo=googlechrome)](https://chromewebstore.google.com/detail/context-harvester/jkcccdoifdagjiboeikoeapceaccbfna)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox-Install-orange?logo=firefox)](https://addons.mozilla.org/en-US/firefox/addon/context-harvester/)

## Install

| Browser | Link |
|---------|------|
| Chrome / Edge | [Install from Chrome Web Store](https://chromewebstore.google.com/detail/context-harvester/jkcccdoifdagjiboeikoeapceaccbfna) |
| Firefox | [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/context-harvester/) |

## The Problem

Developers using AI assistants spend too much time manually gathering context from 5+ tabs — docs, Stack Overflow, GitHub issues, API references — before composing a prompt.

## Features

- **Multi-tab snippet collection** — Right-click or `Alt+C` to capture selected text with source attribution
- **Token-aware** — Real-time token counter with model selector (GPT-4 128k, Claude 200k, Gemini 1M)
- **Drag-to-reorder** — Organize context in the order that matters
- **Smart tagging** — Auto-detects `code`, `docs`, `error`, `discussion`, `reference`
- **Multiple export formats** — Markdown, structured XML prompt, or JSON
- **Cross-browser** — Chrome + Firefox support via WXT framework

## Quick Start

```bash
git clone https://github.com/rishapgandhi/context-harvester
cd context-harvester
npm install
npm run dev          # Chrome dev mode
npm run dev:firefox  # Firefox dev mode
```

## Build

```bash
npm run build          # Chrome production
npm run build:firefox  # Firefox production
npm run zip            # Package for Chrome Web Store
```

## Architecture

```
entrypoints/
├── background.ts         # Service worker: context menu, keyboard shortcuts
├── content.ts            # Content script: selection capture
├── popup/                # Quick-access popup with stats
└── sidepanel/            # Main UI: snippet cards, token counter, export
shared/
├── types.ts              # TypeScript interfaces
├── storage.ts            # Browser storage abstraction
├── token-counter.ts      # Token estimation (gpt-tokenizer)
└── export-formats.ts     # Markdown/Prompt/JSON formatters
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [WXT](https://wxt.dev/) — cross-browser extension framework |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Drag & Drop | @dnd-kit |
| Token Counting | gpt-tokenizer |
| Testing | Vitest |
| Build | Vite (via WXT) |

## Usage

1. Browse any page → select text → right-click → **"Add to Context"**
2. Or use `Alt+C` keyboard shortcut
3. Open the side panel to see all collected snippets
4. Drag to reorder, tag, or delete snippets
5. Export as Markdown, structured prompt, or JSON
6. Paste into your AI assistant

## Contributing

Issues and PRs welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## License

MIT © [Rishap Gandhi](https://github.com/rishapgandhi)
