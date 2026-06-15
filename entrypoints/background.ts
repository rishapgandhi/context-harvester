import { v4 as uuid } from 'uuid';
import { addSnippet, getSnippets } from '@/shared/storage';
import { countTokens } from '@/shared/token-counter';
import type { Snippet, SnippetTag } from '@/shared/types';

export default defineBackground(() => {
  // Create context menu on install
  browser.contextMenus.create({
    id: 'add-to-context',
    title: 'Add to Context',
    contexts: ['selection'],
  });

  // Handle context menu click
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'add-to-context' && info.selectionText) {
      const snippet: Snippet = {
        id: uuid(),
        content: info.selectionText,
        sourceUrl: tab?.url || '',
        sourceTitle: tab?.title || 'Unknown',
        timestamp: Date.now(),
        tag: detectTag(info.selectionText),
        tokenCount: countTokens(info.selectionText),
        order: (await getSnippets()).length,
      };
      await addSnippet(snippet);
    }
  });

  // Handle keyboard shortcut
  browser.commands.onCommand.addListener(async (command) => {
    if (command === 'add-to-context') {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        browser.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' });
      }
    }
  });

  // Listen for selection from content script
  browser.runtime.onMessage.addListener(async (msg, sender) => {
    if (msg.type === 'SELECTION_RESULT' && msg.text) {
      const snippet: Snippet = {
        id: uuid(),
        content: msg.text,
        sourceUrl: sender.tab?.url || '',
        sourceTitle: sender.tab?.title || 'Unknown',
        timestamp: Date.now(),
        tag: detectTag(msg.text),
        tokenCount: countTokens(msg.text),
        order: (await getSnippets()).length,
      };
      await addSnippet(snippet);
    }
  });
});

function detectTag(text: string): SnippetTag {
  if (/```|function |const |=>|import /.test(text)) return 'code';
  if (/error|Error|exception|stack trace/i.test(text)) return 'error';
  return 'docs';
}
