import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  vite: () => ({ plugins: [react()] }),
  manifest: {
    name: 'Context Harvester',
    description: 'Multi-tab LLM context builder — collect, organize, and export content from multiple browser tabs as structured, token-aware prompts.',
    permissions: ['contextMenus', 'storage', 'activeTab', 'sidePanel'],
    commands: {
      'add-to-context': {
        suggested_key: { default: 'Alt+C' },
        description: 'Add selected text to context',
      },
    },
  },
});
