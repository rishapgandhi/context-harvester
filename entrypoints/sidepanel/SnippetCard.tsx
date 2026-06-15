import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Snippet } from '@/shared/types';

const TAG_COLORS: Record<string, string> = {
  code: 'bg-blue-900 text-blue-300',
  docs: 'bg-green-900 text-green-300',
  error: 'bg-red-900 text-red-300',
  discussion: 'bg-yellow-900 text-yellow-300',
  reference: 'bg-purple-900 text-purple-300',
};

export default function SnippetCard({ snippet, onDelete }: { snippet: Snippet; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: snippet.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-800 rounded p-2 border border-gray-700 group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-gray-300">⠿</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${TAG_COLORS[snippet.tag] || 'bg-gray-700'}`}>{snippet.tag}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span>{snippet.tokenCount} tok</span>
          <button onClick={() => onDelete(snippet.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition">✕</button>
        </div>
      </div>
      <p className="text-xs text-gray-300 line-clamp-3 whitespace-pre-wrap">{snippet.content}</p>
      <p className="text-[10px] text-gray-600 mt-1 truncate">{snippet.sourceTitle}</p>
    </div>
  );
}
