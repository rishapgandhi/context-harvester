export interface Snippet {
  id: string;
  content: string;
  sourceUrl: string;
  sourceTitle: string;
  timestamp: number;
  tag: SnippetTag;
  tokenCount: number;
  order: number;
}

export type SnippetTag = 'code' | 'docs' | 'error' | 'discussion' | 'reference';

export interface ContextCollection {
  id: string;
  name: string;
  snippets: Snippet[];
  totalTokens: number;
  targetModel: ModelId;
  createdAt: number;
}

export type ModelId = 'gpt-4' | 'claude' | 'gemini';

export const MODEL_LIMITS: Record<ModelId, number> = {
  'gpt-4': 128000,
  claude: 200000,
  gemini: 1000000,
};

export type ExportFormat = 'markdown' | 'prompt' | 'json';

export interface ExportConfig {
  format: ExportFormat;
  includeAttribution: boolean;
  includeTimestamps: boolean;
}
