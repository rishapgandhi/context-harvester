import React, { useEffect, useState } from 'react';
import { getSnippets } from '@/shared/storage';
import { MODEL_LIMITS } from '@/shared/types';
import type { Snippet } from '@/shared/types';

export default function Popup() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  useEffect(() => { getSnippets().then(setSnippets); }, []);

  const totalTokens = snippets.reduce((sum, s) => sum + s.tokenCount, 0);

  return (
    <div className="w-64 p-4 space-y-3">
      <h1 className="text-base font-bold text-harvest-500">Context Harvester</h1>
      <div className="text-xs text-gray-400 space-y-1">
        <p><span className="text-white font-medium">{snippets.length}</span> snippets collected</p>
        <p><span className="text-white font-medium">{totalTokens.toLocaleString()}</span> tokens</p>
      </div>
      <div className="border-t border-gray-700 pt-2 text-[10px] text-gray-500 space-y-1">
        <p><kbd className="bg-gray-700 px-1 rounded">Alt+C</kbd> Add selection</p>
        <p>Right-click → "Add to Context"</p>
        <p>Open side panel for full view</p>
      </div>
    </div>
  );
}
