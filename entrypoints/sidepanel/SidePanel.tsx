import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { getSnippets, saveSnippets, getTargetModel, setTargetModel, snippetsKey } from '@/shared/storage';
import { exportSnippets } from '@/shared/export-formats';
import type { Snippet, ModelId, ExportFormat } from '@/shared/types';
import { MODEL_LIMITS } from '@/shared/types';
import SnippetCard from './SnippetCard';
import TokenCounter from './TokenCounter';

export default function SidePanel() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [model, setModel] = useState<ModelId>('claude');

  useEffect(() => {
    getSnippets().then(setSnippets);
    getTargetModel().then(setModel);
    // Watch for storage changes
    const unwatch = snippetsKey.watch((newVal) => { if (newVal) setSnippets(newVal); });
    return () => { unwatch(); };
  }, []);

  const totalTokens = snippets.reduce((sum, s) => sum + s.tokenCount, 0);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIdx = snippets.findIndex((s) => s.id === active.id);
      const newIdx = snippets.findIndex((s) => s.id === over.id);
      const reordered = arrayMove(snippets, oldIdx, newIdx).map((s, i) => ({ ...s, order: i }));
      setSnippets(reordered);
      saveSnippets(reordered);
    }
  };

  const handleDelete = (id: string) => {
    const updated = snippets.filter((s) => s.id !== id);
    setSnippets(updated);
    saveSnippets(updated);
  };

  const handleExport = (format: ExportFormat) => {
    const output = exportSnippets(snippets, { format, includeAttribution: true, includeTimestamps: false });
    navigator.clipboard.writeText(output);
  };

  const handleModelChange = (m: ModelId) => {
    setModel(m);
    setTargetModel(m);
  };

  const handleClearAll = () => {
    setSnippets([]);
    saveSnippets([]);
  };

  return (
    <div className="flex flex-col h-screen p-3 gap-3">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-harvest-500">Context Harvester</h1>
        <span className="text-xs text-gray-400">{snippets.length} snippets</span>
      </header>

      <TokenCounter total={totalTokens} limit={MODEL_LIMITS[model]} model={model} onModelChange={handleModelChange} />

      <div className="flex gap-1">
        {(['markdown', 'prompt', 'json'] as ExportFormat[]).map((f) => (
          <button key={f} onClick={() => handleExport(f)} className="flex-1 px-2 py-1 text-xs bg-gray-700 hover:bg-harvest-700 rounded transition">
            {f}
          </button>
        ))}
        <button onClick={handleClearAll} className="px-2 py-1 text-xs bg-red-900 hover:bg-red-700 rounded transition">Clear</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={snippets.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {snippets.map((s) => (
              <SnippetCard key={s.id} snippet={s} onDelete={handleDelete} />
            ))}
          </SortableContext>
        </DndContext>
        {snippets.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-xs">Select text on any page and right-click → "Add to Context"<br/>or use <kbd className="bg-gray-700 px-1 rounded">Alt+C</kbd></p>
        )}
      </div>
    </div>
  );
}
