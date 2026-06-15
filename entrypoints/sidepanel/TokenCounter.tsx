import React from 'react';
import type { ModelId } from '@/shared/types';

interface Props {
  total: number;
  limit: number;
  model: ModelId;
  onModelChange: (m: ModelId) => void;
}

export default function TokenCounter({ total, limit, model, onModelChange }: Props) {
  const pct = Math.min((total / limit) * 100, 100);
  const color = pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-harvest-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <select value={model} onChange={(e) => onModelChange(e.target.value as ModelId)} className="bg-gray-800 border border-gray-700 rounded px-1 text-xs">
          <option value="gpt-4">GPT-4 (128k)</option>
          <option value="claude">Claude (200k)</option>
          <option value="gemini">Gemini (1M)</option>
        </select>
        <span>{total.toLocaleString()} / {limit.toLocaleString()} tokens</span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
